import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { PatientEntity } from '../entity/patient.entity';

export class PatientDto extends PartialType(
  OmitType(PatientEntity, ['createdAt', 'createdAt', 'deletedAt']),
) {}

export class PatientDtoResponse extends PatientDto {
  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  id: string;
}
