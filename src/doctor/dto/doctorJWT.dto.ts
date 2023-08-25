import { ApiProperty, PartialType } from '@nestjs/swagger';
import { DoctorEntity } from '../entity/doctor.entity';

export class DoctorWithJWT extends PartialType(DoctorEntity) {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ example: 'IS SENT BACK IN COOKIES' })
  refreshToken: string;
}

export class JWTOnly {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ example: 'IS SENT BACK IN COOKIES' })
  refreshToken: string;
}
