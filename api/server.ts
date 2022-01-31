require("dotenv").config();

import express from "express";
import mongoose from "mongoose";

const app = express();
mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.on("open", () => console.log("connected to database"));

app.listen(3000, () => console.log("Server Started"));
