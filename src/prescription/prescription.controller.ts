import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiException } from 'src/decorators/apiException.decorator';
import { PrescriptionDto, ReturnPrescriptionDto } from './dto/prescription.dto';
import { PrescriptionService } from './prescription.service';

@ApiTags('prescriptions')
@Controller('prescriptions')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Prescribe medication to patient' })
  @ApiResponse({ status: 200, type: ReturnPrescriptionDto })
  @ApiException(() => NotFoundException)
  @ApiException(() => ConflictException)
  async prescribe(@Body() dto: PrescriptionDto) {
    return this.prescriptionService.prescribe(dto.medicationId, dto.patientId);
  }
}
