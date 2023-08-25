import { Injectable, NotFoundException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
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

  async getAll(
    id: string,
    all: boolean | undefined,
    take: number | undefined,
    page: number | undefined,
  ) {
    const foundPatients = await this.patientRepository.find({
      relations: [
        'records',
        'doctor',
        'records.symptoms',
        'prescriptions',
        'prescriptions.medication',
      ],
      where: { ...(all && { doctorId: id }) },
      take,
      skip: page && take * (page - 1),
    });

    return foundPatients;
  }
}
