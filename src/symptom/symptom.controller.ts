import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { ApiException } from 'src/decorators/apiException.decorator';
import { AuthGuard } from 'src/decorators/authGuard.decorator';
import { ReturnSymptomDto, SymptomDto } from './dto/symptom.dto';
import { SymptomService } from './symptom.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SymptomEntity } from './entity/symptom.entity';

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
    return this.symptomService.create(symptomDto);
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
