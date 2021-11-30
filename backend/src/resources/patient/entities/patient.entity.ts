import * as mongoose from 'mongoose';

export type professionalArrayElement = {
  refData: mongoose.Types.ObjectId;
  chatRef: mongoose.Types.ObjectId;
};

export class PatientEntity {
  role: string;
  profilePicture: string;
  name: string;
  surname: string;
  gender: string;
  birthDate: string;
  email: string;
  password: string;
  professionals: professionalArrayElement[];
  constructor(
    profilePicture: string,
    name: string,
    surname: string,
    gender: string,
    birthDate: string,
    email: string,
    password: string,
  ) {
    this.role = 'Professional';
    this.profilePicture = profilePicture;
    this.name = name;
    this.surname = surname;
    this.birthDate = birthDate;
    this.gender = gender;
    this.email = email;
    this.password = password;
    this.professionals = [];
  }
}
