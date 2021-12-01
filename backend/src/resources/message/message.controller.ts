import { Controller, Patch, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.messageService.update(id);
  }
}
