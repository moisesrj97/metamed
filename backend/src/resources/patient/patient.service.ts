import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientService {
  create(body) {
    return 'This action adds a new patient';
  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: string) {
    return `This action returns a #${id} patient`;
  }

  update(id: string, body) {
    return `This action updates a #${id} patient`;
  }

  remove(id: string) {
    return `This action removes a #${id} patient`;
  }
}
