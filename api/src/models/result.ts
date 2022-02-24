import mongoose, { Document, Schema } from "mongoose";

interface Result extends Document {
  resultId: number;
  race: string;
  driver: string;
  constructor: string;
  number: number;
  grid: number;
  position: number;
  positionText: string;
  positionOrder: number;
  points: number;
  laps: number;
  time: string;
  milliseconds: string;
  fastestLap: string;
  rank: number;
  fastestLapTime: string;
  fastestLapSpeed: string;
  status: string;
}

const resultSchema = new mongoose.Schema({
  race: {
    type: Schema.Types.ObjectId,
    ref: "Race",
    required: true,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Constructor",
    required: true,
  },
  number: {
    type: Number,
    required: false,
  },
  grid: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
    required: false,
  },
  positionText: {
    type: String,
    required: true,
  },
  positionOrder: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  laps: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  milliseconds: {
    type: Number,
    required: false,
  },
  fastestLap: {
    type: Number,
    required: false,
  },
  rank: {
    type: Number,
    required: false,
  },
  fastestLapTime: {
    type: String,
    required: false,
  },
  fastestLapSpeed: {
    type: String,
    required: false,
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: "Status",
    required: true,
  },
});

export default mongoose.model<Result>("Result", resultSchema, "results");