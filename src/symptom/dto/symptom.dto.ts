import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { SymptomEntity } from '../entity/symptom.entity';

export class SymptomDto extends PartialType(
  OmitType(SymptomEntity, ['createdAt', 'deletedAt', 'updatedAt']),
) {}

export class ModifySymptomDto extends PartialType(
  OmitType(SymptomEntity, ['createdAt', 'deletedAt', 'updatedAt']),
) {}

export class ReturnSymptomDto extends PartialType(SymptomEntity) {
  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  id: string;
}
