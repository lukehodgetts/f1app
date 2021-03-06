import mongoose, { Document, Schema } from "mongoose";

export interface Race extends Document {
  raceId: number;
  year: string;
  round: number;
  circuit: string;
  name: string;
  date: string;
  time: string;
  url: string;
}

const raceSchema = new mongoose.Schema({
  raceId: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    index: true,
  },
  round: {
    type: Number,
    required: false,
  },
  circuit: {
    type: Schema.Types.ObjectId,
    ref: "Circuit",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
});
raceSchema.index({ name: "text" });

export default mongoose.model<Race>("Race", raceSchema, "races");
