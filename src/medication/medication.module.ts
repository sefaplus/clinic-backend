import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationEntity } from './entity/medication.entity';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicationEntity])],
  controllers: [MedicationController],
  providers: [MedicationService],
})
export class MedicationModule {}
