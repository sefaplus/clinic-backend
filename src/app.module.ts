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
import { PatientRecord } from './patientRecord/entity/patientRecord.entity';
import { MedicationEntity } from './medication/entity/medication.entity';
import { MedicationModule } from './medication/medication.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { PrescriptionEntity } from './prescription/entity/prescription.entity';

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
        entities: [
          DoctorEntity,
          SymptomEntity,
          PatientEntity,
          PatientRecord,
          MedicationEntity,
          PrescriptionEntity,
        ],
        logging: true,
        synchronize: true,
      }),
    }),
    DoctorModule,
    PatientModule,
    SymptomModule,
    PatientRecordsModule,
    MedicationModule,
    PrescriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
