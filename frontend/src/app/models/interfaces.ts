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
