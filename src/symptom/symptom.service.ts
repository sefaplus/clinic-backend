import { Injectable, NotFoundException } from '@nestjs/common';
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

  async save(symptomDto: SymptomDto, id?: string) {
    return this.symptomRepository.save({ id, ...symptomDto });
  }

  async getAll() {
    return this.symptomRepository.find();
  }

  async delete(id: string) {
    const foundSymptom = await this.symptomRepository.findOneBy({ id });
    if (!foundSymptom) {
      throw new NotFoundException('Symptom not found');
    }

    await foundSymptom.softRemove();

    return true;
  }
}
