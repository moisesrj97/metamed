import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ProfessionalEntity } from './entities/professional.entity';
import { Professional, ProfessionalDocument } from './professional.schema';
import { S3ImageService } from 'src/services/s3-image-service/s3-image-service.service';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
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

    const result = await this.professionalModel.create(
      new ProfessionalEntity(url, name, surname, businessName, email, hash),
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
