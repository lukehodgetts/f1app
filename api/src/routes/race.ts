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
}

//get all
router.get("/race", async (req, res) => {
  const circuit = await Circuit.findOne({});

  const params = req.params as Params;
  const races = await Race.find({ year: params.year })
    .sort({ round: "asc" })
    .populate("circuit");
  const raceIds = races.map(({ _id }) => _id);

  const results = await Result.find({ race: { $in: raceIds } })
    .populate("driver")
    .populate("team")
    .populate("status");

  const response = races.map((race) => {
    return {
      ...race.toObject(),
      results: results
        .filter((result) => race._id.equals(result.race) && result.position)
        .sort((a, b) => {
          return a.position - b.position;
        }),
    };
  });

  res.send(response);
});

export default router;
