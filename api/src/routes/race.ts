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
  const results = await axios.get(
    `http://ergast.com/api/f1/${req.body.year}/${req.body.round}/results.json`
  );
  res.send(results.data);
});

export default router;
