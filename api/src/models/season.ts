import mongoose, { Document } from "mongoose";

interface Season extends Document {
  year: number;
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
