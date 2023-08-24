import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SymptomEntity } from './entity/symptom.entity';
import { Repository } from 'typeorm';
import { SymptomDto } from './dto/symptom.dto';

@Injectable()
export class SymptomService {
  constructor(
    @InjectRepository(SymptomEntity)
    private readonly symptomRepository: Repository<SymptomEntity>,
  ) {}

  async create(symptomDto: SymptomDto) {
    return this.symptomRepository.save(symptomDto);
  }

  async getAll() {
    return this.symptomRepository.find();
  }
}
