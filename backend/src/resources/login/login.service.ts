import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from '../patient/patient.schema';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import validateJwt from '../../helpers/validateJwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
  ) {}

  loginProfessionalWithToken(token: string) {
    return validateJwt(token);
  }

  async loginProfessionalWithoutToken(email: string, password: string) {
    const professional = await this.professionalModel.findOne({
      email,
    });

    if (!professional) {
      throw new Error('Incorrect email or password');
    }

    if (await bcrypt.compare(password, professional.password)) {
      return jwt.sign(
        {
          id: professional._id,
          email: professional.email,
          name: professional.name,
          role: professional.role,
        },
        process.env.JWT_SECRET,
      );
    } else {
      throw new Error('Incorrect email or password');
    }
  }

  loginPatientWithToken(token: string) {
    return validateJwt(token);
  }

  async loginPatientWithoutToken(email: string, password: string) {
    const patient = await this.patientModel.findOne({
      email,
    });

    if (!patient) {
      throw new Error('Incorrect email or password');
    }

    if (await bcrypt.compare(password, patient.password)) {
      return jwt.sign(
        {
          id: patient._id,
          email: patient.email,
          name: patient.name,
          role: patient.role,
        },
        process.env.JWT_SECRET,
      );
    } else {
      throw new Error('Incorrect email or password');
    }
  }
}
