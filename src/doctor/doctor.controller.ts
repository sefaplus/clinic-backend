import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiException } from 'src/decorators/apiException.decorator';
import { convertStringTimeToSeconds } from 'src/helpers/helpers';
import { DoctorService } from './doctor.service';
import { DoctorWithJWT } from './dto/doctorJWT.dto';
import { DoctorSignInDto } from './dto/signIn.dto';
import { DoctorSignUpDto } from './dto/signUp.dto';

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-in')
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
    console.log(expireSeconds);
    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge: expireSeconds * 1000,
      httpOnly: true,
      // secure: true
      expires: new Date(+new Date() + expireSeconds * 1000),
    });

    return { ...foundDoctor, accessToken: tokens.accessToken };
  }

  @Post('sign-up')
  @ApiResponse({ status: 200, type: DoctorWithJWT })
  @ApiException(() => ConflictException, {
    description: 'Login already used',
  })
  async signUp(@Body() doctorDto: DoctorSignUpDto) {
    return this.doctorService.signUp(doctorDto);
  }
}
