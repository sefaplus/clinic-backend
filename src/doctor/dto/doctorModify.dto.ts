import { OmitType } from '@nestjs/swagger';
import { DoctorEntity } from '../entity/doctor.entity';

export class DoctorModifyDto extends OmitType(DoctorEntity, [
  'createdAt',
  'deletedAt',
  'updatedAt',
  'id',
  'imageId',
  'login',
]) {}
