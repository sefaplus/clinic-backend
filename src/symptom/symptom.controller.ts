import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiException } from 'src/decorators/apiException.decorator';
import { AuthGuard } from 'src/decorators/authGuard.decorator';
import {
  ModifySymptomDto,
  ReturnSymptomDto,
  SymptomDto,
} from './dto/symptom.dto';
import { SymptomService } from './symptom.service';

@ApiTags('symptoms')
@ApiBearerAuth()
@Controller('symptoms')
@AuthGuard()
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a symptom of given name and severity' })
  @ApiResponse({
    status: 201,
    type: ReturnSymptomDto,
    description: 'Creates symptom',
  })
  @ApiException(() => ConflictException, { description: 'Already exists' })
  async createSymptom(@Body() symptomDto: SymptomDto) {
    return this.symptomService.save(symptomDto);
  }

  @Put()
  @ApiOperation({ summary: 'Creates a symptom of given name and severity' })
  @ApiResponse({
    status: 201,
    type: ReturnSymptomDto,
    description: 'Creates symptom',
  })
  async updateSymptom(@Body() symptomDto: ModifySymptomDto) {
    return this.symptomService.save(symptomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Creates a symptom of given name and severity' })
  @ApiResponse({
    status: 410,
    type: Boolean,
    description: 'Deletes.',
  })
  @ApiException(() => NotFoundException, { description: 'Symptom not found' })
  async delete(@Param('id') id: string) {
    return this.symptomService.delete(id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Returns all symptoms in the system' })
  @ApiResponse({
    status: 200,
    type: ReturnSymptomDto,
    isArray: true,
  })
  @ApiException(() => ConflictException, { description: 'Already exists' })
  async getAll() {
    return this.symptomService.getAll();
  }
}
