import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  update(id: string, to: string, from: string, text: string) {
    return `This action add a message to ${to}, from ${from}, with text "${text}" to #${id} chat`;
  }
}
