import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ApiException } from 'src/decorators/apiException.decorator';
import { AuthGuard } from 'src/decorators/authGuard.decorator';
import { convertStringTimeToSeconds } from 'src/helpers/helpers';
import { DoctorService } from './doctor.service';
import { DoctorWithJWT } from './dto/doctorJWT.dto';
import { DoctorSignInDto } from './dto/signIn.dto';
import { DoctorSignUpDto } from './dto/signUp.dto';
import { DoctorEntity } from './entity/doctor.entity';
import { Doctor } from 'src/decorators/doctor.decorator';
import { DoctorPayload } from 'src/types/types';
import { DoctorModifyDto } from './dto/doctorModify.dto';

@ApiTags('doctors')
@ApiException(() => UnauthorizedException)
@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Log in, receive tokens' })
  @ApiResponse({
    status: 200,
    type: DoctorWithJWT,
  })
  @ApiException(() => NotFoundException, {
    description: 'Invalid login or password',
  })
  async signIn(
    @Body() doctorDto: DoctorSignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { tokens, foundDoctor } = await this.doctorService.signIn(doctorDto);
    const expireSeconds = convertStringTimeToSeconds(
      this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
    );

    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge: expireSeconds * 1000,
      httpOnly: true,
      // secure: true,
      expires: new Date(+new Date() + expireSeconds * 1000),
    });

    return { ...foundDoctor, accessToken: tokens.accessToken };
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new doctor' })
  @ApiResponse({ status: 201, type: DoctorWithJWT })
  @ApiException(() => ConflictException, {
    description: 'Login already used',
  })
  async signUp(
    @Body() doctorDto: DoctorSignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { tokens, saved } = await this.doctorService.signUp(doctorDto);
    const expireSeconds = convertStringTimeToSeconds(
      this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
    );

    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge: expireSeconds * 1000,
      httpOnly: true,
      // secure: true
      expires: new Date(+new Date() + expireSeconds * 1000),
    });

    return { ...saved, accessToken: tokens.accessToken };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor info' })
  @ApiResponse({ status: 200, type: DoctorEntity })
  @ApiException(() => NotFoundException, { description: 'id not found' })
  @ApiBearerAuth()
  @AuthGuard()
  async getDoctor(@Param('id') id: string) {
    return this.doctorService.getDoctor(id);
  }

  @Put('self')
  @ApiOperation({ summary: 'Update self' })
  @ApiResponse({ status: 200, type: DoctorEntity })
  @ApiBearerAuth()
  @AuthGuard()
  async modifySelf(
    @Doctor() doctor: DoctorPayload,
    @Body() doctorDto: DoctorModifyDto,
  ) {
    return this.doctorService.update(doctor.id, doctorDto);
  }
}
