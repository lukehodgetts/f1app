import {
    NextFunction,
    RequestHandler,
    Router,
    Request,
    Response,
  } from "express";

  import Constructor from "../models/constructor";

  const router = Router();
  
  //get all
  router.get("/", async (req, res) => {
      const query = req.query
      const constructor = await Constructor.find({constructorRef: query.ref})
    res.send();
  });
  
  export default router;
  