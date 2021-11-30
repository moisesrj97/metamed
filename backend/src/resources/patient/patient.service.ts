import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3ImageService } from 'src/services/s3-image-service/s3-image-service.service';
import { Patient, PatientDocument } from './patient.schema';
import * as bcrypt from 'bcrypt';
import { PatientEntity } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
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
    return await this.patientModel.findById(id).populate(
      {
        path: 'professionals',
        populate: {
          path: 'refData',
          select: ['name', 'surname', 'profilePicture'],
        },
      },
      {
        path: 'chatRef',
        populate: {
          path: 'messages',
        },
      },
    );
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
