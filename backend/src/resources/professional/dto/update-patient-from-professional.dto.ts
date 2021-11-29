import { ExtraDataItem } from '../professional.schema';

export class UpdatePatientFromProfessionalDto {
  extraDataModified: ExtraDataItem[];
  constructor(extraDataModified: ExtraDataItem[]) {
    this.extraDataModified = extraDataModified;
  }
}
