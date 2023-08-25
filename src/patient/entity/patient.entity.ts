import { ApiProperty } from '@nestjs/swagger';
import { DoctorEntity } from 'src/doctor/entity/doctor.entity';
import { PatientRecord } from 'src/patientRecord/entity/patientRecord.entity';
import { PrescriptionEntity } from 'src/prescription/entity/prescription.entity';
import { SharedBaseEntity } from 'src/shared/entity/sharedBase.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PatientEntity extends SharedBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ example: 'Sefa' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Fox' })
  lastName: string;

  @Column()
  @ApiProperty({ example: 21 })
  age: number;

  @Column()
  @ApiProperty({
    example: `308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104`,
  })
  livingAddress: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: `e7fb4d74-4246-11ee-be56-0242ac120002`,
  })
  doctorId: string;

  @ManyToOne(() => DoctorEntity, (d) => d.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'doctorId' })
  doctor: DoctorEntity;

  @OneToMany(() => PatientRecord, (pr) => pr.patient)
  records: [];

  @OneToMany(() => PrescriptionEntity, (p) => p.patient)
  prescriptions: [];
}
