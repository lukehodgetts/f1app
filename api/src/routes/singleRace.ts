import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import Race from "../models/race";
import Result from "../models/result";
import Circuit from "../models/circuit";
const router = Router({ mergeParams: true });

interface Params {
  year: string;
  name: string;
}

//get all
router.get("/singleRace", async (req, res) => {
  const params = req.params as Params;
  const race = await Race.findOne({
    year: params.year,
    name: params.name,
  }).populate("circuit");

  if (!race) return res.status(404).send("race not found");

  const results = await Result.find({ race: race.id })
    .populate("driver")
    .populate("team")
    .populate("status");

  const response = {
    ...race.toObject(),
    results: results
      .filter((result) => race._id.equals(result.race))
      .map((result) => ({
        ...result.toObject(),
        position: result.position || 100,
      }))
      .sort((a, b) => {
        return a.position - b.position;
      }),
  };

  res.send(response);
});

export default router;
