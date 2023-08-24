import { OmitType, PartialType } from '@nestjs/swagger';
import { PatientRecord } from '../entity/patientRecord.entity';

export class PatientRecordDto extends PartialType(
  OmitType(PatientRecord, ['createdAt', 'updatedAt', 'deletedAt', 'id']),
) {}
