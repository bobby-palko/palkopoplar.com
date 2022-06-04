import { ObjectId } from 'mongoose';

export interface RSVPForm {
  name: string;
}

export interface IGuest {
  name: string;
  nameIsEditable: boolean;
  rsvpd: boolean;
  attending: boolean;
  partnerId?: ObjectId;
  allergies: string;
}

export interface ResultData {
  success: boolean;
  message: string;
  party?: IGuest[];
}
