import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { DeleteNoteDto } from './dto/delete-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note, NoteDocument } from './note.schema';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(Note.name)
    private noteModel: Model<NoteDocument>,
  ) {}

  async create(createNoteDto: CreateNoteDto, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new Error(err);
    }

    if (decodedToken.role !== 'Professional') {
      throw new Error('Invalid token');
    }

    const { title, patient } = createNoteDto;

    const createdNote = await this.noteModel.create({
      author: decodedToken.id,
      title: title,
      extra: '',
    });
    try {
      const result = await this.professionalModel.findByIdAndUpdate(
        { _id: decodedToken.id },
        {
          $push: {
            'patients.$[elem].notes': createdNote._id,
          },
        },
        {
          arrayFilters: [{ 'elem.refData': patient }],
          new: true,
        },
      );

      return result;
    } catch (err) {
      throw new Error('Patient or professional not found');
    }
  }

  async getById(id: string, token: string) {
    try {
      validateJwt(token);
    } catch (e) {
      throw new Error('You are not authorized to perform this action');
    }

    return await this.noteModel.findById(id);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new Error('Invalid token');
    }

    if (decodedToken.role !== 'Professional') {
      throw new Error('Invalid token');
    }

    const { title, description } = updateNoteDto;

    const group = await this.noteModel.findOne({ _id: id });

    if (!group || group.author.toString() !== decodedToken.id) {
      throw new Error('Note not found');
    }

    return this.noteModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
        },
      },
      { new: true },
    );
  }

  async remove(id: string, deleteNoteDto: DeleteNoteDto, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new Error('Invalid token');
    }

    if (decodedToken.role !== 'Professional') {
      throw new Error('Invalid token');
    }

    const note = await this.noteModel.findOne({ _id: id });

    if (!note || note.author.toString() !== decodedToken.id) {
      throw new Error('Note not found');
    }

    const { patientId } = deleteNoteDto;

    await this.noteModel.findByIdAndDelete(id);

    return this.professionalModel.findByIdAndUpdate(
      { _id: decodedToken.id },
      {
        $pull: {
          'patients.$[elem].notes': id,
        },
      },
      {
        arrayFilters: [{ 'elem.refData': patientId }],
        new: true,
      },
    );
  }
}
