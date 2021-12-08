import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isProfessional } from '../../helpers/isProfessional';
import { isAuthor } from '../../helpers/isAuthor';
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

    isProfessional(decodedToken);

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
      throw new NotFoundException('Patient or professional not found');
    }
  }

  async getById(id: string, token: string) {
    try {
      validateJwt(token);
    } catch (e) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    return await this.noteModel.findById(id);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(decodedToken);
    await isAuthor(decodedToken, id, this.noteModel);

    const { title, description } = updateNoteDto;

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

  async remove(id: string, patientId: string, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(decodedToken);
    await isAuthor(decodedToken, id, this.noteModel);

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
