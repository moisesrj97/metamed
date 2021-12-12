import { Module } from '@nestjs/common';
import { MealGroupService } from './meal-group.service';
import { MealGroupController } from './meal-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from '../patient/patient.schema';
import {
  Professional,
  ProfessionalSchema,
} from '../professional/professional.schema';
import { MealGroup, MealGroupSchema } from './mealGroup.schema';
import { MealService } from '../meal/meal.service';
import { Meal, MealSchema } from '../meal/meal.schema';

@Module({
  controllers: [MealGroupController],
  providers: [MealGroupService, MealService],
  imports: [
    MongooseModule.forFeature([
      { name: Professional.name, schema: ProfessionalSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: MealGroup.name, schema: MealGroupSchema },
      { name: Meal.name, schema: MealSchema },
    ]),
  ],
})
export class MealGroupModule {}
