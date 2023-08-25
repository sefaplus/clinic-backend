import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { DoctorSignInDto } from './dto/signIn.dto';
import { DoctorSignUpDto } from './dto/signUp.dto';
import { DoctorEntity } from './entity/doctor.entity';
import { DoctorModifyDto } from './dto/doctorModify.dto';
import { DoctorPayload } from 'src/types/types';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {}
  async signUp(doctorDto: DoctorSignUpDto) {
    if (!doctorDto.TOSAgreed) {
      throw new ConflictException('Should accept TOS');
    }
    const foundDoctor = await this.doctorRepository.findOne({
      where: { login: doctorDto.login },
    });

    if (foundDoctor) {
      throw new ConflictException('Login already used');
    }

    const passwordHash = await bcrypt.hash(
      doctorDto.password,
      this.config.getOrThrow('BCRYPT_SALT'),
    );

    const { password, ...saved } = await this.doctorRepository.save({
      ...doctorDto,
      password: passwordHash,
    });
    const tokens = await this.authService.generate({ id: saved.id });

    return { tokens, saved };
  }

  async signIn(doctorDto: DoctorSignInDto) {
    const { password: passwordHash, ...foundDoctor } =
      await this.doctorRepository.findOne({
        where: { login: doctorDto.login },
      });

    const passwordMatch = await bcrypt.compare(
      doctorDto.password,
      passwordHash,
    );

    if (!passwordMatch) {
      throw new NotFoundException('Invalid login or password');
    }

    const tokens = await this.authService.generate({ id: foundDoctor.id });
    return { tokens, foundDoctor };
  }

  async getDoctor(id: string) {
    const { password, ...foundDoctor } = await this.doctorRepository.findOne({
      where: { id },
    });

    if (!foundDoctor) {
      throw new NotFoundException('id missing in the database');
    }

    return foundDoctor;
  }

  async update(id: string, doctorDto: DoctorModifyDto) {
    return this.doctorRepository.save({ id, ...doctorDto });
  }

  async refresh(refreshToken: string) {
    const doc: DoctorPayload = await this.authService.verify(refreshToken);

    const tokens = await this.authService.generate({ id: doc.id });

    return tokens;
  }
}
