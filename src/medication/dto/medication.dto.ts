import { OmitType, PartialType } from '@nestjs/swagger';
import { MedicationEntity } from '../entity/medication.entity';

export class MedicationDto extends PartialType(
  OmitType(MedicationEntity, ['createdAt', 'deletedAt', 'updatedAt', 'id']),
) {}

export class ModifyMedicationDto extends PartialType(
  OmitType(MedicationEntity, ['createdAt', 'deletedAt', 'updatedAt']),
) {}
