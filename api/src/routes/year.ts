import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import axios from "axios";

import Race from "../models/race";
import Result from "../models/result";
import Circuit from "../models/circuit";

const router = Router({ mergeParams: true });

interface BaseParams {
  year: string;
}

//get constructor
router.get("/constructor", async (req, res) => {
  const params = req.params as BaseParams;
  const constructor = await axios.get(
    `http://ergast.com/api/f1/${params.year}/constructorStandings.json`
  );
  const data = {
    ...constructor.data.MRData.StandingsTable.StandingsLists[0],
    type: "Constructor",
  };
  res.send(data);
});

//get driver
router.get("/driver", async (req, res) => {
  const params = req.params as BaseParams;
  const driver = await axios.get(
    `http://ergast.com/api/f1/${params.year}/driverStandings.json`
  );
  const data = {
    ...driver.data.MRData.StandingsTable.StandingsLists[0],
    type: "Driver",
  };
  res.send(data);
});

//get races
router.get("/race", async (req, res) => {
  const circuit = await Circuit.findOne({});

  const params = req.params as BaseParams;
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

interface SingleRaceParams extends BaseParams {
  name: string;
}

//get race
router.get("/:name/singleRace", async (req, res) => {
  const params = req.params as SingleRaceParams;
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
