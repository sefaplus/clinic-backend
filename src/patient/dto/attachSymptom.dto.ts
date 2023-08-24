import { ApiProperty } from '@nestjs/swagger';

export class AttachSymptomDto {
  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  patientId: string;
  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  symptomId: string;
}
