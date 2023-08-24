import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SymptomEntity } from 'src/symptom/entity/symptom.entity';
import { PatientEntity } from 'src/patient/entity/patient.entity';
import { PatientRecord } from './entity/patientRecord.entity';
import { PatientRecordDto } from './dto/patientRecord.dto';

@Injectable()
export class PatientRecordsService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(PatientRecord)
    private readonly symptomRepository: Repository<SymptomEntity>,
  ) {}

  async createRecord(dto: PatientRecordDto) {}
}
