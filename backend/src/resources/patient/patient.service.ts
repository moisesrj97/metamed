import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3ImageService } from 'src/services/s3-image-service/s3-image-service.service';
import { Patient, PatientDocument } from './patient.schema';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { PatientEntity } from './entities/patient.entity';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';

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
    name: string,
    email: string,
    password: string,
    surname: string,
    gender: string,
    birthDate: string,
    file: any,
  ) {
    const url = await this.s3ImageService.uploadFile(file);
    const hash = await bcrypt.hash(password, 10);
    console.log(url, hash);

    const result = await this.patientModel.create(
      new PatientEntity(url, name, surname, gender, birthDate, email, hash),
    );

    return result;
  }

  async findOne(id: string) {
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
      password,
      role,
      email,
      gender,
      birthDate,
      professionals: resolvedMappedPopulatedData,
    };
  }

  async update(
    id: string,
    name: string,
    surname: string,
    gender: string,
    birthDate: string,
    profilePicture: string,
    file?: any,
  ) {
    if (file) {
      const response = await this.s3ImageService.updateFile(
        file,
        profilePicture,
      );
      console.log({ response });
    }
    const result = await this.patientModel.findByIdAndUpdate(
      { _id: id },
      { $set: { name, surname, gender, birthDate } },
      { new: true },
    );

    return result;
  }
}
