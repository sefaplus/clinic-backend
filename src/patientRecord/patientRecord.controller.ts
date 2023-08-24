import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/decorators/authGuard.decorator';
import { PatientRecordDto } from './dto/patientRecord.dto';
import { PatientRecord } from './entity/patientRecord.entity';
import { PatientRecordsService } from './patientRecord.service';

@ApiTags('records')
@ApiBearerAuth()
@AuthGuard()
@Controller('records')
export class PatientController {
  constructor(private readonly recordsService: PatientRecordsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a patient attached to doctor' })
  @ApiResponse({ status: 201, type: PatientRecord })
  async createPatient(@Body() patientDto: PatientRecordDto) {
    return this.recordsService.createRecord(patientDto);
  }
}
