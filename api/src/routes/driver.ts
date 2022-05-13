import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
const router = Router();

import Driver from "../models/driver";
import ResultModel, { Result } from "../models/result";
import { Race } from "../models/race";

//get all
router.get("/", async (req, res) => {
  const query = req.query;
  const driver = await Driver.findOne({ driverRef: query.ref });
  if (!driver) return res.status(404).send("driver not found");
  const results = await ResultModel.find({ driver: driver._id })
    .populate<{ race: Race }>("race")
    .populate("team")
    .populate("status")

  const years = results.reduce<{
    [key: string]: { results: any[] };
  }>((prev, curr) => {
    const date = new Date(curr.race.date);
    const year = date.getFullYear();
    if (prev[year]) {
      prev[year].results.push(curr);
      return prev;
    } else {
      prev[year] = { results: [curr] };
      return prev;
    }
  }, {});

  // const maxRounds = Math.max(
  //   ...Object.values(years).map((a) => a.results.length)
  // );

  const rounds = Array.from(
    Array(Math.max(...Object.values(years).map((a) => a.results.length))).keys()
  ).map((number) => number + 1);

  res.send({ driver, years, rounds });
});

export default router;
