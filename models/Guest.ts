import mongoose from 'mongoose';
import { IGuest } from '../types/types';

const GuestSchema = new mongoose.Schema<IGuest>({
  name: {
    type: String,
    required: true,
  },
  nameIsEditable: {
    type: Boolean,
    required: true,
  },
  rsvpd: {
    type: Boolean,
    required: true,
  },
  attending: {
    type: Boolean,
    required: true,
  },
  partnerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Guest',
  },
  allergies: {
    type: String,
    required: true,
  },
});

const Guest =
  mongoose.models.Guest || mongoose.model<IGuest>('Guest', GuestSchema);

export default Guest;
