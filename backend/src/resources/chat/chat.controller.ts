import { Controller, Body, Patch, Param, Headers } from '@nestjs/common';
import { ChatService } from './chat.service';
import { NewMessageDto } from './dto/newMessage.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() newMessageDto: NewMessageDto,
    @Headers('authorization') token: string,
  ) {
    return this.chatService.update(id, newMessageDto, token);
  }
}
