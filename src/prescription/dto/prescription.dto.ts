import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { PrescriptionEntity } from '../entity/prescription.entity';
import { MedicationEntity } from 'src/medication/entity/medication.entity';
import { MedicationDto } from 'src/medication/dto/medication.dto';
import { PatientEntity } from 'src/patient/entity/patient.entity';

export class PrescriptionDto {
  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  medicationId: string;

  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  patientId: string;
}

export class ReturnPrescriptionDto extends PrescriptionEntity {
  @ApiProperty({ type: PatientEntity })
  patient: PatientEntity;

  @ApiProperty({ type: MedicationEntity })
  medication: MedicationEntity;
}
