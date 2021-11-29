export class CreateProfessionalDto {
  name: string;
  surname: string;
  businessName: string;
  email: string;
  password: string;
  constructor(
    name: string,
    surname: string,
    businessName: string,
    email: string,
    password: string,
  ) {
    this.name = name;
    this.surname = surname;
    this.businessName = businessName;
    this.email = email;
    this.password = password;
  }
}
