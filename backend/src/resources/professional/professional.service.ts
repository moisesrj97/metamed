import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import { ProfessionalEntity } from './entities/professional.entity';
import {
  ExtraDataItem,
  Professional,
  ProfessionalDocument,
} from './professional.schema';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import { Patient, PatientDocument } from '../patient/patient.schema';
import { Chat, ChatDocument } from '../chat/chat.schema';
import { ChatEntity } from '../chat/entities/chat.entity';
import CreateProfessionalDto from './dto/createProfessional.dto';
import updateProfessionalDto from './dto/updateProfessional.dto';

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
    createProfessionalDto: CreateProfessionalDto,
    file: any,
  ): Promise<ProfessionalDocument> {
    const { businessName, name, password, surname, email } =
      createProfessionalDto;
    const url = await this.s3ImageService.uploadFile(file);
    const hash = bcrypt.hashSync(password, 10);

    const result = await this.professionalModel.create(
      new ProfessionalEntity(url, name, surname, businessName, email, hash),
    );

    return result;
  }

  async findOne(id: string): Promise<ProfessionalDocument> {
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
    updateProfessionalDto: updateProfessionalDto,
    file?: any,
  ): Promise<ProfessionalDocument> {
    const { businessName, surname, name, profilePicture } =
      updateProfessionalDto;
    if (file) {
      const response = await this.s3ImageService.updateFile(
        file,
        profilePicture,
      );
    }
    const result = await this.professionalModel.findByIdAndUpdate(
      { _id: id },
      { $set: { name, surname, businessName } },
      { new: true },
    );

    return result;
  }

  async addPatientToProfessional(
    id: string,
    patientId: string,
  ): Promise<ProfessionalDocument> {
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

  async updatePatientFromProfessional(
    id: string,
    patientId: string,
    allExtraDataUpdated: ExtraDataItem[],
  ): Promise<ProfessionalDocument> {
    const result = await this.professionalModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          'patients.$[elem].extraData': allExtraDataUpdated,
        },
      },
      {
        arrayFilters: [{ 'elem.refData': patientId }],
        new: true,
      },
    );

    return result;
  }

  async removePatientFromProfessional(
    id: string,
    patientId: string,
  ): Promise<ProfessionalDocument> {
    const result = await this.professionalModel.findByIdAndUpdate(
      { _id: id },
      {
        $pull: {
          patients: { refData: patientId },
        },
      },
      { new: true },
    );

    await this.patientModel.findByIdAndUpdate(
      { _id: patientId },
      { $pull: { professionals: { refData: id } } },
    );

    return result;
  }
}
