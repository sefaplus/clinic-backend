import { ApiProperty } from '@nestjs/swagger';
import { PatientEntity } from 'src/patient/entity/patient.entity';
import { SharedBaseEntity } from 'src/shared/entity/sharedBase.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SymptomSeverity } from '../types/enums';
import { PatientRecord } from 'src/patientRecord/entity/patientRecord.entity';

@Entity()
export class SymptomEntity extends SharedBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ type: 'enum', enum: SymptomSeverity })
  @ApiProperty({ enum: SymptomSeverity })
  severity: SymptomSeverity;

  @ManyToMany(() => PatientRecord, (p) => p.id)
  symptoms: PatientRecord[];
}
