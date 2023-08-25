import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicationEntity } from './entity/medication.entity';
import { Repository } from 'typeorm';
import { MedicationDto } from './dto/medication.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(MedicationEntity)
    private readonly medicationRepository: Repository<MedicationEntity>,
  ) {}

  async save(dto: MedicationDto, id?: string) {
    return this.medicationRepository.save({ id, ...dto });
  }

  async delete(id: string) {
    const found = await this.medicationRepository.findOneBy({ id });
    if (found) {
      throw new NotFoundException('Medication not found');
    }

    await found.softRemove();

    return true;
  }

  async getAll(take?: number, page?: number) {
    return await this.medicationRepository.find({
      take,
      skip: page && take * (page - 1),
    });
  }
}
