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
      return new ConflictException('Should accept TOS');
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

    await this.doctorRepository.save({
      login: doctorDto.login,
      password: passwordHash,
    });
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
}
