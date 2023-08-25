import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
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

  @Get(':id')
  @ApiResponse({ status: 200, type: ReturnPatientRecordDto })
  async getRecordInfo(@Param('id') recordId: string) {
    return this.recordsService.getRecordInfo(recordId);
  }

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

  @Put()
  @ApiOperation({
    summary: 'Modifies a record attached to patient for a given date&time',
  })
  @ApiResponse({ status: 201, type: ReturnPatientRecordDto })
  async modifyRecord(@Body() patientDto: ModifyPatientRecordDto) {
    return this.recordsService.modifyRecord(patientDto);
  }
}
