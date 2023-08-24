import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patientRecord.controller';
import { PatientEntity } from 'src/patient/entity/patient.entity';
import { PatientRecord } from './entity/patientRecord.entity';
import { PatientRecordsService } from './patientRecord.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity, PatientRecord])],
  controllers: [PatientController],
  providers: [PatientRecordsService],
})
export class PatientRecordsModule {}
