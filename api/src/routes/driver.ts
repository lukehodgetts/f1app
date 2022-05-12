import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
const router = Router();

import Driver from "../models/driver";
import Result from "../models/result";

//get all
router.get("/", async (req, res) => {
  const query = req.query;
  const driver = await Driver.findOne({ driverRef: query.ref });
  if (!driver) return res.status(404).send("driver not found");
  const results = await Result.find({ driver: driver._id })
    .populate("race")
    .populate("team");
  res.send({ driver, results });
});

export default router;
