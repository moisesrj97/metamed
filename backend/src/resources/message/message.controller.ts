import { Controller, Patch, Param, Headers } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Patch(':id')
  update(@Headers('authorization') token: string, @Param('id') id: string) {
    return this.messageService.update(id, token);
  }
}
