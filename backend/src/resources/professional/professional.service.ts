import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { ProfessionalEntity } from './entities/professional.entity';
import { Professional, ProfessionalDocument } from './professional.schema';
import { S3ImageService } from 'src/services/s3-image-service/s3-image-service.service';
import { Patient, PatientDocument } from '../patient/patient.schema';
import { Chat, ChatDocument } from '../chat/chat.schema';
import { ChatEntity } from '../chat/entities/chat.entity';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    private s3ImageService: S3ImageService,
  ) {}

  async create(
    name: string,
    email: string,
    password: string,
    surname: string,
    businessName: string,
    file: any,
  ) {
    const url = await this.s3ImageService.uploadFile(file);
    const hash = await bcrypt.hash(password, 10);
    console.log(url, hash);

    const result = await this.professionalModel.create(
      new ProfessionalEntity(url, name, surname, businessName, email, hash),
    );

    return result;
  }

  async findOne(id: string) {
    return await this.professionalModel.findById(id).populate({
      path: 'patients',
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
  }

  async update(
    id: string,
    name: string,
    surname: string,
    businessName: string,
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
    const result = await this.professionalModel.findByIdAndUpdate(
      { _id: id },
      { $set: { name, surname, businessName } },
      { new: true },
    );

    return result;
  }

  async addPatientToProfessional(id: string, patientId: string) {
    const newChat = await this.chatModel.create(
      new ChatEntity(
        new mongoose.Types.ObjectId(id),
        new mongoose.Types.ObjectId(patientId),
      ),
    );

    const newPatientToProfessional = {
      refData: patientId,
      extraData: [],
      chatRef: newChat._id,
      exerciseGroups: [],
      mealGroups: [],
      notes: [],
    };

    const newProfessionalToPatient = {
      refData: id,
      chatRef: newChat._id,
    };

    await this.patientModel.findByIdAndUpdate(
      { _id: patientId },
      { $push: { professionals: newProfessionalToPatient } },
    );

    const result = await this.professionalModel.findByIdAndUpdate(
      { _id: id },
      { $push: { patients: newPatientToProfessional } },
      { new: true },
    );

    return result;
  }
}
