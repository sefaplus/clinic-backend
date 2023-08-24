import { ApiProperty, PartialType } from '@nestjs/swagger';
import { DoctorEntity } from '../entity/doctor.entity';

export class DoctorWithJWT extends PartialType(DoctorEntity) {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ example: 'COMES IN FORM A COOKIE' })
  refreshToken: string;
}
