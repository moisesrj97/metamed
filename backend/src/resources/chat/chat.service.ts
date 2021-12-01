import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  update(id: number, to: string, from: string, text: string) {
    return `This action updates a #${id} chat`;
  }
}
