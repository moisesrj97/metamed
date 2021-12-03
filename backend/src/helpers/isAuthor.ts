import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtInterface } from './validateJwt';

export async function isAuthor(
  decodedToken: JwtInterface,
  modelId: string,
  model: Model<any>,
) {
  const modelQuery = await model.findOne({ _id: modelId });

  if (!modelQuery || modelQuery.author.toString() !== decodedToken.id) {
    throw new NotFoundException('Element not found');
  }
}
