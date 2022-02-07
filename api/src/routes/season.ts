import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import axios from "axios";
import mongoose from "mongoose";
import Season from "../models/season";
const router = Router();

//get all
router.get("/", async (req, res) => {
  // const seasons = await axios.get(`${process.env.DATABASE_URL}/seasons`, {
  //   params: {
  //     limit: 73,
  //   },
  // });

  const seasons = await Season.find().sort({ year: 'desc' });
  res.send(seasons);
});

export default router;
