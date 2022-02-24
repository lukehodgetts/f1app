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
import season from "../models/season";
const router = Router();

interface Query {
  page: string;
}

//get all
router.get("/season", async (req, res) => {
  // @ts-ignore
  const query = req.query as Query;

  const seasons = await Season.find()
    .sort({ year: "desc" })
    .skip(parseInt(query.page) * 10)
    .limit(10);

  const count = await Season.count();
  res.send({seasons, count});
});

export default router;
