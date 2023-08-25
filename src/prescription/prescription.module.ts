import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationEntity } from 'src/medication/entity/medication.entity';
import { PatientEntity } from 'src/patient/entity/patient.entity';
import { PrescriptionEntity } from './entity/prescription.entity';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatientEntity,
      MedicationEntity,
      PrescriptionEntity,
    ]),
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})
export class PrescriptionModule {}
