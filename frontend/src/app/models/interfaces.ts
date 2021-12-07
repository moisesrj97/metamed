export interface ExtraDataModel {
  key: string;
  value: string;
}

export interface RefDataModel {
  _id: string;
  name: string;
  surname: string;
  profilePicture: string;
}

export interface MessageModel {
  _id: string;
  from: string;
  to: string;
  text: string;
  fromRole: string;
  toRole: string;
  read: boolean;
}

export interface ChatRefModel {
  _id: string;
  patient: string;
  professional: string;
  messages: MessageModel[];
}

export interface PatientModel {
  refData: RefDataModel;
  extraData: ExtraDataModel[];
  chatRef: ChatRefModel;
  exerciseGroups: string[];
  mealGroups: string[];
  notes: string[];
}

export interface ProfessionalModel {
  refData: RefDataModel;
  chatRef: ChatRefModel;
  exerciseGroups: string[];
  mealGroups: string[];
  notes: string[];
}

export interface UpdateUserDataDto {
  name: string;
  surname: string;
  profilePicture: string;
  businessName?: string;
  gender?: string;
  birthDate?: string;
}

export interface UserStore {
  _id: string;
  name: string;
  surname: string;
  email: string;
  profilePicture: string;
  role: string;
  birthDate?: string;
  gender?: string;
  businessName?: string;
  patients?: PatientModel[];
  professionals?: ProfessionalModel[];
}

export interface JwtModel {
  id: string;
  role: string;
  name: string;
  email: string;
}

export interface ExerciseGroupModel {
  _id: string;
  extra: string;
  name: string;
  author: string;
  exercises: ExerciseModel[];
}

export interface ExerciseModel {
  _id: string;
  name: string;
  amount: string;
  image: string;
  author: string;
}

export interface MealGroupModel {
  _id: string;
  extra: string;
  name: string;
  author: string;
  meals: MealModel[];
}

export interface MealModel {
  _id: string;
  name: string;
  amount: string;
  author: string;
}

export interface NoteModel {
  _id: string;
  title: string;
  description: string;
  author: string;
}
