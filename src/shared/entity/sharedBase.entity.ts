import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SharedBaseEntity extends BaseEntity {
  @DeleteDateColumn()
  @ApiProperty()
  deletedAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}
