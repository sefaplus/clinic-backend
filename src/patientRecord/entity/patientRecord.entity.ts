import { ApiProperty } from '@nestjs/swagger';
import { DoctorEntity } from 'src/doctor/entity/doctor.entity';
import { PatientEntity } from 'src/patient/entity/patient.entity';
import { SharedBaseEntity } from 'src/shared/entity/sharedBase.entity';
import { SymptomEntity } from 'src/symptom/entity/symptom.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PatientRecord extends SharedBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'e7fb4d74-4246-11ee-be56-0242ac120002' })
  id: string;

  @Column({ type: 'float' })
  @ApiProperty({ example: 7.7 })
  wellbeing: number;

  @Column({ type: 'float' })
  @ApiProperty({ example: 6.9 })
  mood: number;

  @Column({ type: 'int' })
  @ApiProperty({ example: 90 })
  medicationAdherence: number;

  @Column()
  @ApiProperty({ type: Date })
  date: Date;

  @Column({ nullable: false })
  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  patientId: string;

  @ManyToOne(() => PatientEntity, (d) => d.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'patientId' })
  patient: PatientEntity;

  @Column({ nullable: false })
  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  doctorId: string;

  @ManyToOne(() => DoctorEntity, (d) => d.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'doctorId' })
  doctor: DoctorEntity;

  @ManyToMany(() => SymptomEntity, (s) => s.id, { cascade: true })
  @JoinTable()
  @ApiProperty({
    example: ['e7fb4d74-4246-11ee-be56-0242ac120002'],
    isArray: true,
    description: 'Symptoms array. Array of symptom ids',
  })
  symptoms: SymptomEntity[];
}
