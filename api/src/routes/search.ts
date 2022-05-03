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
  const constructorResults = await Constructor.find({ name: search });
  const raceResults = await Race.find({ name: search });
  const driverResults = await Driver.aggregate([
    {
      $addFields: {
        fullName: { $concat: ["$forename", " ", "$surname"] },
      },
    },
    {
      $match: { fullName: search },
    },
  ]);

  res.send([...constructorResults, ...raceResults, ...driverResults]);
});

export default router;
