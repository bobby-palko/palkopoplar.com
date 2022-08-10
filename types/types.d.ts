import { ObjectId } from 'mongoose';

export interface IGuest {
  _id: ObjectId;
  name: string;
  nameIsEditable: boolean;
  rsvpd: boolean;
  attending: boolean;
  partnerId?: ObjectId;
  allergies: string;
}

export interface ILogIn {
  password: string;
}

export interface ResultData {
  success: boolean;
  message: string;
  party?: IGuest[];
}

export interface RSVPSearchForm {
  name: string;
}

export interface RSVPSubmitForm {
  guests: IGuest[];
}
