import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import { Patient, PatientDocument } from './patient.schema';
import * as bcrypt from 'bcryptjs';
import { PatientEntity } from './entities/patient.entity';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';
import CreatePatientDto from './dto/createPatient.dto';
import UpdatePatientDto from './dto/updatePatient.dto';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import { isPatient } from '../../helpers/isPatient';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    private s3ImageService: S3ImageService,
  ) {}

  async create(
    createPatientDto: CreatePatientDto,
    file: any,
  ): Promise<PatientDocument> {
    const { birthDate, name, surname, email, password, gender } =
      createPatientDto;
    const url = await this.s3ImageService.uploadFile(file);
    const hash = bcrypt.hashSync(password, 10);

    return await this.patientModel.create(
      new PatientEntity(url, name, surname, gender, birthDate, email, hash),
    );
  }

  async findOne(id: string, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    isPatient(decodedToken);

    if (id !== decodedToken.id) {
      throw new UnauthorizedException('Invalid token');
    }

    const populatedData = await this.patientModel.findById(id).populate({
      path: 'professionals',
      populate: [
        {
          path: 'refData',
          select: ['name', 'surname', 'profilePicture'],
        },
        {
          path: 'chatRef',
          populate: {
            path: 'messages',
          },
        },
      ],
    });

    const {
      _id,
      name,
      surname,
      profilePicture,
      password,
      role,
      email,
      gender,
      birthDate,
    } = populatedData;

    const mappedPopulatedData = populatedData.professionals.map(
      async (professional) => {
        const professionalDocument = await this.professionalModel
          .findById(professional.refData)
          .populate('patients');
        const { exerciseGroups, mealGroups, notes } =
          professionalDocument.patients.find(
            (patient) => patient.refData.toString() === id,
          );
        return {
          refData: professional.refData,
          chatRef: professional.chatRef,
          exerciseGroups,
          mealGroups,
          notes,
        };
      },
    );

    const resolvedMappedPopulatedData = await Promise.all(mappedPopulatedData);

    return {
      _id,
      name,
      surname,
      profilePicture,
      role,
      email,
      gender,
      birthDate,
      professionals: resolvedMappedPopulatedData,
    };
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
    token: string,
    file?: any,
  ): Promise<PatientDocument> {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    isPatient(decodedToken);

    if (id !== decodedToken.id) {
      throw new UnauthorizedException('Invalid token');
    }

    const { birthDate, gender, surname, name, profilePicture } =
      updatePatientDto;
    if (file) {
      await this.s3ImageService.updateFile(file, profilePicture);
    }
    return await this.patientModel.findByIdAndUpdate(
      { _id: id },
      { $set: { name, surname, gender, birthDate } },
      { new: true },
    );
  }
}
