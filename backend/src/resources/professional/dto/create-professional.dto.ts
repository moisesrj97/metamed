export class CreateProfessionalDto {
  profilePicture: string;
  name: string;
  surname: string;
  businessName: string;
  email: string;
  password: string;
  constructor(
    profilePicture: string,
    name: string,
    surname: string,
    businessName: string,
    email: string,
    password: string,
  ) {
    this.profilePicture = profilePicture;
    this.name = name;
    this.surname = surname;
    this.businessName = businessName;
    this.email = email;
    this.password = password;
  }
}
