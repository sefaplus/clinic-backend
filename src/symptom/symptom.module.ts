import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomEntity } from './entity/symptom.entity';
import { SymptomController } from './symptom.controller';
import { SymptomService } from './symptom.service';

@Module({
  imports: [TypeOrmModule.forFeature([SymptomEntity])],
  controllers: [SymptomController],
  providers: [SymptomService],
})
export class SymptomModule {}
