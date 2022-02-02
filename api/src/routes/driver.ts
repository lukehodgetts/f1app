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
router.get("/driver", async (req, res) => {
  const params = req.params as Params;
  const driver = await axios.get(
    `http://ergast.com/api/f1/${params.year}/driverStandings.json`
  );
  const data = { ...driver.data, type: "Driver" };
  res.send(data);
});

export default router;
