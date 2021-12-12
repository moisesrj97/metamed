import { Injectable, UnauthorizedException } from '@nestjs/common';
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
import { isProfessional } from '../../helpers/isProfessional';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import { Message, MessageDocument } from '../message/message.schema';
import {
  ExerciseGroup,
  ExerciseGroupDocument,
} from '../exercise-group/exerciseGroup.schema';
import { MealGroup, MealGroupDocument } from '../meal-group/mealGroup.schema';
import { Note, NoteDocument } from '../note/note.schema';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    @InjectModel(ExerciseGroup.name)
    private exerciseGroupModel: Model<ExerciseGroupDocument>,
    @InjectModel(MealGroup.name)
    private mealGroupModel: Model<MealGroupDocument>,
    @InjectModel(Note.name)
    private noteModel: Model<NoteDocument>,
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

    return await this.professionalModel.create(
      new ProfessionalEntity(url, name, surname, businessName, email, hash),
    );
  }

  async findOne(id: string, token: string): Promise<ProfessionalDocument> {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
    isProfessional(decodedToken);
    if (id !== decodedToken.id) {
      throw new UnauthorizedException('Invalid token');
    }

    const result = await this.professionalModel.findById(id).populate({
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

    result.password = '';

    return result;
  }

  async update(
    id: string,
    updateProfessionalDto: updateProfessionalDto,
    token: string,
    file?: any,
  ): Promise<ProfessionalDocument> {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(decodedToken);

    if (id !== decodedToken.id) {
      throw new UnauthorizedException('Invalid token');
    }

    const { businessName, surname, name, profilePicture } =
      updateProfessionalDto;
    if (file) {
      await this.s3ImageService.updateFile(file, profilePicture);
    }
    return await this.professionalModel
      .findByIdAndUpdate(
        { _id: id },
        { $set: { name, surname, businessName } },
        { new: true },
      )
      .populate({
        path: 'patients',
        populate: 'refData',
      });
  }

  async addPatientToProfessional(
    id: string,
    patientId: string,
    token: string,
  ): Promise<ProfessionalDocument> {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(decodedToken);

    if (id !== decodedToken.id) {
      throw new UnauthorizedException('Invalid token');
    }

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

    return await this.professionalModel
      .findByIdAndUpdate(
        { _id: id },
        { $push: { patients: newPatientToProfessional } },
        { new: true },
      )
      .populate({
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

  async updatePatientFromProfessional(
    id: string,
    patientId: string,
    allExtraDataUpdated: ExtraDataItem[],
    token: string,
  ): Promise<ProfessionalDocument> {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(decodedToken);

    if (id !== decodedToken.id) {
      throw new UnauthorizedException('Invalid token');
    }

    return await this.professionalModel
      .findByIdAndUpdate(
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
      )
      .populate({
        path: 'patients',
        populate: 'refData',
      });
  }

  async removePatientFromProfessional(
    id: string,
    patientId: string,
    token: string,
  ): Promise<ProfessionalDocument> {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(decodedToken);

    if (id !== decodedToken.id) {
      throw new UnauthorizedException('Invalid token');
    }

    const professional = await (
      await this.professionalModel.findById(id)
    ).populate({
      path: 'patients',
      populate: {
        path: 'refData',
        select: ['name', 'surname', 'profilePicture'],
      },
    });

    const chat = await this.chatModel
      .findById(
        professional.patients.find(
          (patient) => patient.refData._id.toString() === patientId,
        ).chatRef,
      )
      .populate('messages');

    for (let i = 0; i < chat.messages.length; i++) {
      await this.messageModel.findByIdAndDelete(chat.messages[i]._id);
    }

    await this.chatModel.findByIdAndDelete(
      professional.patients.find(
        (patient) => patient.refData._id.toString() === patientId,
      ).chatRef,
    );

    const patientBeingRemoved = professional.patients.find(
      (patient) => patient.refData._id.toString() === patientId,
    );

    for (let i = 0; i < patientBeingRemoved.exerciseGroups.length; i++) {
      await this.exerciseGroupModel.findByIdAndDelete(
        patientBeingRemoved.exerciseGroups[i],
      );
    }

    for (let i = 0; i < patientBeingRemoved.mealGroups.length; i++) {
      await this.mealGroupModel.findByIdAndDelete(
        patientBeingRemoved.mealGroups[i],
      );
    }

    for (let i = 0; i < patientBeingRemoved.notes.length; i++) {
      await this.noteModel.findByIdAndDelete(patientBeingRemoved.notes[i]);
    }

    const result = await this.professionalModel
      .findByIdAndUpdate(
        { _id: id },
        {
          $pull: {
            patients: { refData: patientId },
          },
        },
        { new: true },
      )
      .populate({
        path: 'patients',
        populate: 'refData',
      });

    await this.patientModel.findByIdAndUpdate(
      { _id: patientId },
      { $pull: { professionals: { refData: id } } },
    );

    return result;
  }
}
