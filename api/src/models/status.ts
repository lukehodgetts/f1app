import mongoose, { Document } from "mongoose";

interface Status extends Document {
  statusId: number;
  status: string;
}

const statusSchema = new mongoose.Schema({
  statusId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Status>("Status", statusSchema, "statuses");
