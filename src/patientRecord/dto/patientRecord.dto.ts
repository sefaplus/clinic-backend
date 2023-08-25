import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { DoctorEntity } from 'src/doctor/entity/doctor.entity';
import { PatientDtoResponse } from 'src/patient/dto/patient.dto';
import { PatientEntity } from 'src/patient/entity/patient.entity';
import { SymptomEntity } from 'src/symptom/entity/symptom.entity';
import { PatientRecord } from '../entity/patientRecord.entity';

export class PatientRecordDto extends PartialType(
  OmitType(PatientRecord, [
    'createdAt',
    'updatedAt',
    'deletedAt',
    'id',
    'patient',
    'symptoms',
  ]),
) {
  @ApiProperty({ example: ['id'] })
  symptoms: string[];
}

export class ReturnPatientRecordDto extends PartialType(
  OmitType(PatientRecord, ['symptoms', 'doctor']),
) {
  @ApiProperty({ type: PartialType(SymptomEntity), isArray: true })
  symptoms: SymptomEntity[];

  @ApiProperty({ type: PatientDtoResponse })
  patient: PatientEntity;

  @ApiProperty({ type: DoctorEntity })
  doctor: DoctorEntity;
}

export class ModifyPatientRecordDto extends PartialType(
  OmitType(PatientRecord, [
    'createdAt',
    'updatedAt',
    'deletedAt',
    'patient',
    'patientId',
    'doctorId',
    'symptoms',
    'id',
  ]),
) {
  @ApiProperty({ example: ['id'] })
  symptoms: string[];
}
