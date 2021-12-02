import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import validateJwt from '../../helpers/validateJwt';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}
  async update(id: string, token: string) {
    try {
      validateJwt(token);
    } catch (e) {
      throw new Error('You are not authorized to perform this action');
    }

    return await this.messageModel.findByIdAndUpdate(id, {
      $set: { read: true },
    });
  }
}
