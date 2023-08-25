import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/decorators/authGuard.decorator';
import { Doctor } from 'src/decorators/doctor.decorator';
import { DoctorPayload } from 'src/types/types';
import { AttachSymptomDto } from './dto/attachSymptom.dto';
import { PatientDto, PatientDtoResponse } from './dto/patient.dto';
import { PatientService } from './patient.service';

@ApiTags('patients')
@ApiBearerAuth()
@AuthGuard()
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a patient attached to doctor' })
  @ApiResponse({ status: 201, type: PatientDtoResponse })
  async createPatient(@Body() patientDto: PatientDto) {
    return this.patientService.createPatient(patientDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates patient info' })
  @ApiResponse({ status: 204, type: PatientDtoResponse })
  async updatePatient(@Body() patientDto: PatientDto, @Param('id') id: string) {
    return this.patientService.updatePatient(id, patientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a patient' })
  @ApiResponse({ status: 410, type: Boolean })
  async deletePatient(@Param('id') id: string) {
    this.patientService.deletePatient(id);
  }

  @Get('all')
  @ApiOperation({
    summary: 'Lists patients that are assigned to a doctor',
    description:
      'Lists patients to currently attached doctor (thru jwt). Can instead return global. Paginated',
  })
  @ApiQuery({
    name: 'all',
    description:
      'Should return all patients that are in the system (Including to not currently attached doctor)?',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'take',
    description: 'Amount per page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page (>0!)',
    required: false,
    type: Number,
  })
  @ApiResponse({ status: 200, type: PatientDtoResponse, isArray: true })
  async getPatientList(
    @Doctor() doctor: DoctorPayload,
    @Query('all') all?: boolean,
    @Query('take') take?: number,
    @Query('page') page?: number,
  ) {
    return this.patientService.getAll(
      doctor.id,
      all,
      take && Number(take),
      page && Number(page),
    );
  }
}
