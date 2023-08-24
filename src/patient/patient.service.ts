import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PatientEntity } from './entity/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientDto } from './dto/patient.dto';
import { AttachSymptomDto } from './dto/attachSymptom.dto';
import { SymptomEntity } from 'src/symptom/entity/symptom.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(SymptomEntity)
    private readonly symptomRepository: Repository<SymptomEntity>,
  ) {}

  async createPatient(patientDto: PatientDto) {
    return this.patientRepository.save(patientDto);
  }

  async updatePatient(id: string, patientDto: PatientDto) {
    return this.patientRepository.save({ id, ...patientDto });
  }

  async deletePatient(id: string) {
    const foundPatient = await this.patientRepository.findOneBy({ id });

    await foundPatient.softRemove();

    return true;
  }

  async getAll(id: string, all: boolean) {
    const foundPatients = await this.patientRepository.find({
      relations: ['symptoms'],
      ...(all && { where: { doctorId: id } }),
    });

    return foundPatients;
  }

  async attachSymptom(dto: AttachSymptomDto) {
    const foundPatient = await this.patientRepository.findOneBy({
      id: dto.patientId,
    });
    if (!foundPatient) {
      throw new NotFoundException('Patient not found');
    }
    const foundSymptom = await this.symptomRepository.findOneBy({
      id: dto.symptomId,
    });
    if (!foundSymptom) {
      throw new NotFoundException('Patient not found');
    }

    foundPatient.symptoms = [...(foundPatient?.symptoms ?? []), foundSymptom];

    await foundPatient.save();

    return true;
  }
}
