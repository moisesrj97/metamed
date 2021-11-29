import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';

@Module({
  controllers: [ProfessionalController],
  providers: [ProfessionalService]
})
export class ProfessionalModule {}
