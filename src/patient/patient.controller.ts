import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Get('list')
  @ApiOperation({ summary: 'Lists patients that are assigned to a  doctor' })
  @ApiQuery({
    name: 'all',
    description: 'Should return all patients?',
    required: false,
    type: Boolean,
  })
  async getPatientList(
    @Doctor() doctor: DoctorPayload,
    @Query('all') all?: boolean,
  ) {
    return this.patientService.getAll(doctor.id, all);
  }
}
