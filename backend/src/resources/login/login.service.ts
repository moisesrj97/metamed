import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient, PatientDocument } from '../patient/patient.schema';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import validateJwt from '../../helpers/validateJwt';
import { Model } from 'mongoose';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
  ) {}

  loginWithToken(token: string) {
    return validateJwt(token);
  }

  async loginWithoutToken(role: string, email: string, password: string) {
    let user: ProfessionalDocument | PatientDocument;

    if (role === 'Professional') {
      user = await this.professionalModel.findOne({
        email,
      });
    } else {
      user = await this.patientModel.findOne({
        email,
      });
    }

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    if (await bcrypt.compare(password, user.password)) {
      return jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        process.env.JWT_SECRET,
      );
    } else {
      throw new UnauthorizedException('Incorrect email or password');
    }
  }
}
