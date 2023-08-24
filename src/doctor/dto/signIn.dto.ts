import { OmitType } from '@nestjs/swagger';
import { DoctorSignUpDto } from './signUp.dto';

export class DoctorSignInDto extends OmitType(DoctorSignUpDto, [
  'TOSAgreed',
  'firstName',
  'lastName',
]) {}
