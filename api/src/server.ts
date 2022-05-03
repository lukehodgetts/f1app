require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import year from "./routes/year";
import season from "./routes/season";
import search from "./routes/search";
import mysql from "./routes/mysql";

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.on("open", () => console.log("connected to database"));

app.use(express.json());

app.use("/:year", year);
app.use("/season", season);
app.use("/search", search);
app.use("/mysql", mysql);

app.listen(8080, () => console.log("Server Started"));
