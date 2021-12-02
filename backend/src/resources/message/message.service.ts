import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  update(id: string) {
    return `This action toggle a #${id} status`;
  }
}
