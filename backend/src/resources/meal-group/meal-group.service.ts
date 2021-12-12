import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isAuthor } from '../../helpers/isAuthor';
import { isProfessional } from '../../helpers/isProfessional';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import { MealService } from '../meal/meal.service';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';
import { CreateMealGroupDto } from './dto/create-meal-group.dto';
import { UpdateMealGroupDto } from './dto/update-meal-group.dto';
import { MealGroup, MealGroupDocument } from './mealGroup.schema';

@Injectable()
export class MealGroupService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(MealGroup.name)
    private mealGroupModel: Model<MealGroupDocument>,
    private mealService: MealService,
  ) {}

  async create(createMealGroupDto: CreateMealGroupDto, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new Error(err);
    }

    isProfessional(decodedToken);

    const { name, patient } = createMealGroupDto;

    const createdGroup = await this.mealGroupModel.create({
      author: decodedToken.id,
      name: name,
      extra: '',
      meals: [],
    });
    try {
      return await this.professionalModel.findByIdAndUpdate(
        { _id: decodedToken.id },
        {
          $push: {
            'patients.$[elem].mealGroups': createdGroup._id,
          },
        },
        {
          arrayFilters: [{ 'elem.refData': patient }],
          new: true,
        },
      );
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

    return await this.mealGroupModel.findById(id).populate('meals');
  }

  async update(
    id: string,
    updateMealGroupDto: UpdateMealGroupDto,
    token: string,
  ) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(decodedToken);
    await isAuthor(decodedToken, id, this.mealGroupModel);

    const { name, extra } = updateMealGroupDto;

    return this.mealGroupModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          extra: extra,
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
    await isAuthor(decodedToken, id, this.mealGroupModel);

    const groupToRemove = await this.mealGroupModel.findById(id);

    for (let i = 0; i < groupToRemove.meals.length; i++) {
      this.mealService.remove(token, groupToRemove.meals[i].toString(), id);
    }

    await this.mealGroupModel.findByIdAndDelete(id);

    return this.professionalModel.findByIdAndUpdate(
      { _id: decodedToken.id },
      {
        $pull: {
          'patients.$[elem].mealGroups': id,
        },
      },
      {
        arrayFilters: [{ 'elem.refData': patientId }],
        new: true,
      },
    );
  }
}
