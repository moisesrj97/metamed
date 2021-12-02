import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meal, MealSchema } from './meal.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [MealController],
  providers: [MealService],
  imports: [
    MongooseModule.forFeature([{ name: Meal.name, schema: MealSchema }]),
  ],
})
export class MealModule {}
