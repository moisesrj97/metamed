import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { DeleteNoteDto } from './dto/delete-note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Headers('Authorization') token: string,
  ) {
    return this.noteService.create(createNoteDto, token);
  }

  @Get(':id')
  getById(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.noteService.getById(id, token);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Headers('Authorization') token: string,
  ) {
    return this.noteService.update(id, updateNoteDto, token);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() deleteNoteDto: DeleteNoteDto,
    @Headers('Authorization') token: string,
  ) {
    return this.noteService.remove(id, deleteNoteDto, token);
  }
}
