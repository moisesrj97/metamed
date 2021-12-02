import { PartialType } from '@nestjs/mapped-types';
import { CreateMealGroupDto } from './create-meal-group.dto';

export class UpdateMealGroupDto extends PartialType(CreateMealGroupDto) {}
