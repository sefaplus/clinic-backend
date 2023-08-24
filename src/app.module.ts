import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { DoctorEntity } from './doctor/entity/doctor.entity';
import { PatientEntity } from './patient/entity/patient.entity';
import { PatientModule } from './patient/patient.module';
import { SymptomModule } from './symptom/symptom.module';
import { SymptomEntity } from './symptom/entity/symptom.entity';
import { PatientRecordsModule } from './patientRecord/patientRecord.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DB'),
        port: +configService.getOrThrow('DB_PORT'),
        entities: [DoctorEntity, PatientEntity, SymptomEntity],
        logging: true,
        synchronize: true,
      }),
    }),
    DoctorModule,
    PatientModule,
    SymptomModule,
    PatientRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
