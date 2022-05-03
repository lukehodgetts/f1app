import mongoose, { Document } from "mongoose";

interface Constructor extends Document {
  constructorId: number;
  constructorRef: string;
  name: string;
  nationality: string;
  url: string;
}

const constructorSchema = new mongoose.Schema({
  constructorId: {
    type: Number,
    required: true,
  },
  constructorRef: {
    type: String,
    required: true,
  },
  name: {
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
constructorSchema.index({ name: "text" });

export default mongoose.model<Constructor>(
  "Constructor",
  constructorSchema,
  "constructors"
);
