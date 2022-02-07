import mongoose, { Document } from "mongoose";

interface Driver extends Document {
  driverId: number;
  driverRef: string;
  number?: number;
  code?: string;
  forename: string;
  surname: string;
  dob: string;
  nationality: string;
  url: string;
}

const driverSchema = new mongoose.Schema({
  driverId: {
    type: Number,
    required: true,
  },
  driverRef: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  forename: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Driver>("Driver", driverSchema, "drivers");
