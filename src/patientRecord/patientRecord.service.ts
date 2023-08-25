import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from 'src/patient/entity/patient.entity';
import { SymptomEntity } from 'src/symptom/entity/symptom.entity';
import { DoctorPayload } from 'src/types/types';
import { In, Repository } from 'typeorm';
import {
  ModifyPatientRecordDto,
  PatientRecordDto,
} from './dto/patientRecord.dto';
import { PatientRecord } from './entity/patientRecord.entity';

@Injectable()
export class PatientRecordsService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(PatientRecord)
    private readonly patientRecordRepository: Repository<PatientRecord>,
    @InjectRepository(SymptomEntity)
    private readonly symptomRepository: Repository<SymptomEntity>,
  ) {}

  async createRecord(doctor: DoctorPayload, dto: PatientRecordDto) {
    const foundPatient = await this.patientRepository.findOneBy({
      id: dto.patientId,
    });
    if (!foundPatient) {
      throw new NotFoundException('Patient not found');
    }
    const symptoms = await this.symptomRepository.find({
      where: { id: In(dto.symptoms) },
    });

    if (symptoms.length != dto.symptoms.length) {
      const notFound = [];

      dto.symptoms.forEach((symptom) => {
        const found = symptoms.find((s) => s.id === symptom);
        if (!found) {
          notFound.push(symptom);
        }
      });

      throw new NotFoundException(
        `Symptom ids not found: ['${notFound.join("', '")}']`,
      );
    }

    const record = await this.patientRecordRepository.save({
      doctorId: doctor.id,
      ...dto,
      symptoms,
    });

    return this.patientRecordRepository.findOne({
      where: { id: record.id },
      relations: ['patient', 'doctor', 'symptoms'],
    });
  }

  async modifyRecord(dto: ModifyPatientRecordDto) {
    const foundRecord = await this.patientRecordRepository.findOneBy({
      id: dto.id,
    });

    if (!foundRecord) {
      throw new NotFoundException('Record not found');
    }
    const symptoms = await this.symptomRepository.find({
      where: { id: In(dto.symptoms) },
    });

    if (symptoms.length != dto.symptoms.length) {
      const notFound = [];

      dto.symptoms.forEach((symptom) => {
        const found = symptoms.find((s) => s.id === symptom);
        if (!found) {
          notFound.push(symptom);
        }
      });

      throw new NotFoundException(
        `Symptom ids not found: ['${notFound.join("', '")}']`,
      );
    }

    const record = await this.patientRecordRepository.save({
      ...dto,
      symptoms,
    });

    return this.patientRecordRepository.findOne({
      where: { id: record.id },
      relations: ['patient', 'doctor', 'symptoms'],
    });
  }

  async getRecordInfo(id: string) {
    const foundRecord = await this.patientRecordRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor', 'symptoms'],
    });

    if (!foundRecord) {
      throw new NotFoundException('record not found');
    }
  }

  async delete(id: string) {
    const foundRecord = await this.patientRecordRepository.findOneBy({ id });
    if (!foundRecord) {
      throw new NotFoundException('Symptom not found');
    }

    await foundRecord.softRemove();

    return true;
  }
}
