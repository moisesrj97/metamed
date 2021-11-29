import * as mongoose from 'mongoose';
import { ExtraDataItem } from '../professional.schema';

export type patientArrayElement = {
  refData: mongoose.Types.ObjectId;
  extraData: [ExtraDataItem];
  chatRef: mongoose.Types.ObjectId;
  exerciseGroups: [mongoose.Types.ObjectId];
  mealGroups: [mongoose.Types.ObjectId];
  notes: [mongoose.Types.ObjectId];
};

export class Professional {
  role: string;
  profilePicture: string;
  name: string;
  surname: string;
  businessName: string;
  email: string;
  password: string;
  patients: patientArrayElement[];
  constructor(
    profilePicture: string,
    name: string,
    surname: string,
    businessName: string,
    email: string,
    password: string,
  ) {
    this.role = 'Professional';
    this.profilePicture = profilePicture;
    this.name = name;
    this.surname = surname;
    this.businessName = businessName;
    this.email = email;
    this.password = password;
    this.patients = [];
  }
}
