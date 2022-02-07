import mongoose, { Document } from "mongoose";

interface Season extends Document {
  constructorId: number;
  constructorRef: string;
  name: string;
  nationality: string;
  url: string;
}

const seasonSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Season>("Season", seasonSchema, "seasons");
