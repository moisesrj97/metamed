import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('to') to: string,
    @Body('from') from: string,
    @Body('text') text: string,
  ) {
    return this.chatService.update(id, to, from, text);
  }
}
