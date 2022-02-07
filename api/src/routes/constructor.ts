import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import axios from "axios";
const router = Router({ mergeParams: true });

interface Params {
  year: string;
}

//get all
router.get("/constructor", async (req, res) => {
  const params = req.params as Params;
  const constructor = await axios.get(
    `http://ergast.com/api/f1/${params.year}/constructorStandings.json`
  );
  const data = {
    ...constructor.data.MRData.StandingsTable.StandingsLists[0],
    type: "Constructor",
  };
  res.send(data);
});

export default router;
