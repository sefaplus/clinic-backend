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
import {
  ModifyPatientRecordDto,
  PatientRecordDto,
  ReturnPatientRecordDto,
} from './dto/patientRecord.dto';
import { PatientRecord } from './entity/patientRecord.entity';
import { PatientRecordsService } from './patientRecord.service';
import { Doctor } from 'src/decorators/doctor.decorator';
import { DoctorPayload } from 'src/types/types';

@ApiTags('records')
@ApiBearerAuth()
@AuthGuard()
@Controller('records')
export class PatientController {
  constructor(private readonly recordsService: PatientRecordsService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a record attached to patient for a given date&time',
  })
  @ApiResponse({ status: 201, type: ReturnPatientRecordDto })
  async createPatient(
    @Body() recordDto: PatientRecordDto,
    @Doctor() doctor: DoctorPayload,
  ) {
    return this.recordsService.createRecord(doctor, recordDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Modifies a record attached to patient for a given date&time',
  })
  @ApiResponse({ status: 201, type: ReturnPatientRecordDto })
  async modifyRecord(
    @Body() patientDto: ModifyPatientRecordDto,
    @Param(':id') id: string,
  ) {
    return this.recordsService.modifyRecord(id, patientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a patient record' })
  @ApiResponse({ status: 410, type: Boolean })
  async deletePatient(@Param('id') id: string) {
    this.recordsService.delete(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get record data' })
  @ApiResponse({ status: 200, type: ReturnPatientRecordDto })
  async getRecordInfo(@Param('id') recordId: string) {
    return this.recordsService.getRecordInfo(recordId);
  }

  @Get('for/:patientId')
  @ApiOperation({ summary: 'Get record data for a patient' })
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
  @ApiResponse({ status: 200, type: ReturnPatientRecordDto })
  async getRecordInfoForPatient(
    @Param('patientId') patientId: string,
    @Query('take') take?: string,
    @Query('page') page?: string,
  ) {
    return this.recordsService.getRecordInfoForPatient(
      patientId,
      take && Number(take),
      page && Number(page),
    );
  }
}
