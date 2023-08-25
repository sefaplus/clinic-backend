import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicationEntity } from 'src/medication/entity/medication.entity';
import { PatientEntity } from 'src/patient/entity/patient.entity';
import { Repository } from 'typeorm';
import { PrescriptionEntity } from './entity/prescription.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(MedicationEntity)
    private readonly medicationRepository: Repository<MedicationEntity>,
    @InjectRepository(PrescriptionEntity)
    private readonly prescriptionRepository: Repository<PrescriptionEntity>,
  ) {}

  async prescribe(medicationId: string, patientId: string) {
    const [foundPatient, foundMedication] = await Promise.all([
      this.patientRepository.findOne({
        where: { id: patientId },
        relations: ['prescriptions'],
      }),

      this.medicationRepository.findOneBy({
        id: medicationId,
      }),
    ]);
    if (!foundPatient) {
      throw new NotFoundException('Patient not found');
    }
    if (!foundMedication) {
      throw new NotFoundException('Medication not found');
    }

    return await this.prescriptionRepository.save({
      patient: foundPatient,
      medication: foundMedication,
    });
  }
}
