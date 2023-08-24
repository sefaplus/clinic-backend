import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class DoctorSignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'doctor' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0,
  })
  password: string;

  @ApiProperty()
  @IsBoolean()
  TOSAgreed: boolean;
}
