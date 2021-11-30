import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
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

  async findOne(id: string) {
    return await this.professionalModel.findById(id);
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
      await this.s3ImageService.updateFile(file, profilePicture);
    }

    const result = await this.professionalModel.findByIdAndUpdate(
      { _id: id },
      { name, surname, businessName },
    );

    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} professional`;
  }
}
