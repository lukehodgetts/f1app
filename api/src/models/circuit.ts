import mongoose, { Document } from "mongoose";

interface Circuit extends Document {
  circuitId: number;
  circuitRef: string;
  name: string;
  location: string;
  country: string;
  lat: string;
  lng: string;
  alt: string;
  url: string;
}

const circuitSchema = new mongoose.Schema({
    circuitId: {
    type: Number,
    required: true,
  },
  circuitRef: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Circuit>(
  "Circuit",
  circuitSchema,
  "circuits"
);
