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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedicationDto, ModifyMedicationDto } from './dto/medication.dto';
import { MedicationEntity } from './entity/medication.entity';
import { MedicationService } from './medication.service';

@ApiTags('medication')
@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a medication' })
  @ApiResponse({ status: 201, type: MedicationEntity })
  async createMedication(@Body() dto: MedicationDto) {
    return this.medicationService.save(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifies a medication' })
  @ApiResponse({ status: 201, type: ModifyMedicationDto })
  async modifyMedication(@Body() dto: MedicationDto, @Param('id') id: string) {
    return this.medicationService.save(dto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a patient record' })
  @ApiResponse({ status: 410, type: Boolean })
  async deletePatient(@Param('id') id: string) {
    this.medicationService.delete(id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Gets all medication list from the system' })
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
  @ApiResponse({ status: 200, type: MedicationEntity, isArray: true })
  async getAll(@Query('take') take?: string, @Query('page') page?: string) {
    return this.medicationService.getAll(
      take && Number(take),
      page && Number(page),
    );
  }
}
