import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import Constructor from "../models/constructor";
import Driver from "../models/driver";
import Race from "../models/race";

const router = Router();

//get all
router.get("/", async (req, res) => {
  const query = req.query;
  if (typeof query.search !== "string") return res.status(500);

  const search = new RegExp(query.search, "i");

  const constructorResults = await Constructor.aggregate([
    {
      $addFields: {
        type: "constructor",
      },
    },
    {
      $match: { name: search },
    },
    {
      $project: { _id: 1, name: 1, ref: "$constructorRef", type: 1 },
    },
  ]);
  const raceResults = await Race.aggregate([
    {
      $addFields: {
        type: "gp",
      },
    },
    {
      $match: { name: search },
    },
    {
      $project: { _id: 1, name: 1, type: 1 },
    },
    {
      $group: { _id: "$name", doc: { $first: "$$ROOT" } },
    },
    {
      $replaceRoot: { newRoot: "$doc" },
    },
  ]);
  const driverResults = await Driver.aggregate([
    {
      $addFields: {
        name: { $concat: ["$forename", " ", "$surname"] },
        type: "driver",
      },
    },
    {
      $match: { name: search },
    },
    {
      $project: { _id: 1, name: 1, ref: "$driverRef", type: 1 },
    },
  ]);

  res.send([...constructorResults, ...raceResults, ...driverResults]);
});

export default router;
