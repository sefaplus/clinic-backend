import {
  ApiOperation,
  ApiProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { PatientEntity } from '../entity/patient.entity';
import { DoctorEntity } from 'src/doctor/entity/doctor.entity';
import { ReturnPatientRecordDto } from 'src/patientRecord/dto/patientRecord.dto';
import { MedicationEntity } from 'src/medication/entity/medication.entity';
import { PrescriptionEntity } from 'src/prescription/entity/prescription.entity';

export class PatientDto extends PartialType(
  OmitType(PatientEntity, ['createdAt', 'createdAt', 'deletedAt']),
) {}

export class PatientDtoResponse extends PartialType(
  OmitType(PatientDto, ['records', 'prescriptions']),
) {
  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  id: string;

  @ApiProperty({
    type: DoctorEntity,
    nullable: true,
  })
  doctor: DoctorEntity;

  @ApiProperty({
    type: ReturnPatientRecordDto,
    isArray: true,
  })
  records: DoctorEntity;

  @ApiProperty({
    type: PrescriptionEntity,
    isArray: true,
  })
  prescriptions: PrescriptionEntity[];
}
