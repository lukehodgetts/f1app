import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import { Circuit } from "../models/circuit";
const router = Router();

import Race from "../models/race";

//get all
router.get("/", async (req, res) => {
  const query = req.query;
  const races = await Race.find({ name: query.ref }).populate<{
    circuit: Circuit;
  }>("circuit", "name country location url");
  const name = races[0].circuit.name;
  res.send({ name, races });
});

export default router;
