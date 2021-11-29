import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ProfessionalEntity } from './entities/professional.entity';
import { Professional, ProfessionalDocument } from './professional.schema';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
  ) {}
  async create(dto: CreateProfessionalDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const result = await this.professionalModel.create(
      new ProfessionalEntity(
        dto.profilePicture,
        dto.name,
        dto.surname,
        dto.businessName,
        dto.email,
        hash,
      ),
    );
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} professional`;
  }

  update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
    return `This action updates a #${id} professional`;
  }

  remove(id: number) {
    return `This action removes a #${id} professional`;
  }
}
