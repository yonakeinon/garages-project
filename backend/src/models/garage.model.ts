import mongoose, { Schema, Document } from 'mongoose';

export interface IGarage extends Document {
  mispar_mosah: number;
  full_name: string;
  cod_sug_mosah?: number;
  sug_mosah?: string; 
  address?: string; 
  city?: string; 
  phone?: string; 
  mikud?: number; 
  cod_miktzoa?: number; 
  miktzoa?: string; 
  menahel_miktzoa?: string;
  rasham_havarot?: number;
}

const GarageSchema: Schema = new Schema({
  mispar_mosah: { type: Number, required: true },
  full_name: { type: String, required: true },
  cod_sug_mosah: { type: Number, required: false },
  sug_mosah: { type: String, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
  phone: { type: String, required: false },
  mikud: { type: Number, required: false },
  cod_miktzoa: { type: Number, required: false },
  miktzoa: { type: String, required: false },
  menahel_miktzoa: { type: String, required: false },
  rasham_havarot: { type: Number, required: false },
});

export default mongoose.model<IGarage>('Garage', GarageSchema);
