require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import driver from "./routes/driver";
import constructor from "./routes/constructor";
import race from "./routes/race";
import season from "./routes/season";

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.on("open", () => console.log("connected to database"));

app.use(express.json());

// app.use("/constructorStanding", constructorStanding);
app.use("/:year", driver);
app.use("/:year", constructor);
app.use("/race", race);
app.use("/season", season);

app.listen(8080, () => console.log("Server Started"));
