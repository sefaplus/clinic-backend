import { ApiProperty } from '@nestjs/swagger';
import { SharedBaseEntity } from 'src/shared/entity/sharedBase.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DoctorEntity extends SharedBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'e7fb4d74-4246-11ee-be56-0242ac120002' })
  id: string;

  @Column()
  @ApiProperty({ example: 'doctor_login' })
  login: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'e7fb4d74-4246-11ee-be56-0242ac120002',
  })
  imageId: string;
}
