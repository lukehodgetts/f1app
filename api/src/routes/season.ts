import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import axios from "axios";
const router = Router();

//get all
router.get("/", async (req, res) => {
  const seasons = await axios.get("http://ergast.com/api/f1/seasons.json", {
    params: {
      limit: 73,
    },
  });
  res.send(seasons.data);
});

export default router;
