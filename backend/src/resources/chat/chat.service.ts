import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import { Message, MessageDocument } from '../message/message.schema';
import { Chat, ChatDocument } from './chat.schema';
import { NewMessageDto } from './dto/newMessage.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}
  async update(id: string, newMessageDto: NewMessageDto, token: string) {
    let response: JwtInterface;
    try {
      response = validateJwt(token);
    } catch (e) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const { text, to } = newMessageDto;

    const newMessage = await this.messageModel.create({
      from: response.id,
      to: to,
      text: text,
      fromRole: response.role,
      toRole: response.role === 'Professional' ? 'Patient' : 'Professional',
    });

    await this.chatModel.findByIdAndUpdate(
      id,
      {
        $push: {
          messages: newMessage,
        },
      },
      { new: true },
    );

    return newMessage;
  }
}
