import { ApiProperty } from '@nestjs/swagger';
import { MedicationDto } from 'src/medication/dto/medication.dto';
import { MedicationEntity } from 'src/medication/entity/medication.entity';
import { PatientEntity } from 'src/patient/entity/patient.entity';
import { SharedBaseEntity } from 'src/shared/entity/sharedBase.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PrescriptionEntity extends SharedBaseEntity {
  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  @Column()
  patientId: string;

  @ManyToOne(() => PatientEntity, (p) => p.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patientId' })
  patient: PatientEntity;

  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  @Column()
  medicationId: string;

  @ApiProperty({ type: MedicationEntity })
  @ManyToOne(() => MedicationEntity, (m) => m.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'medicationId' })
  medication: MedicationEntity;
}
