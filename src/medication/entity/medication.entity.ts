import { ApiProperty } from '@nestjs/swagger';
import { PatientEntity } from 'src/patient/entity/patient.entity';
import { SharedBaseEntity } from 'src/shared/entity/sharedBase.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MedicationEntity extends SharedBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'e7fb4d74-4246-11ee-be56-0242ac120002' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Moxifloxacin' })
  name: string;

  @ManyToMany(() => PatientEntity, (p) => p.id)
  patients: PatientEntity[];
}
