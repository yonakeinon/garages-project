import mongoose, { Schema, Document } from 'mongoose';

export interface IGarage extends Document {
  full_name: string;
  address?: string;
  city?: string;
  phone?: string;
}

const GarageSchema: Schema = new Schema({
  full_name: { type: String, required: true },
  address: { type: String, required: false },
  city: { type: String, required: false },
  phone: { type: String, required: false },
});

export default mongoose.model<IGarage>('Garage', GarageSchema);
