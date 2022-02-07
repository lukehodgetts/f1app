import Race from "../models/race";
import Circuit from "../models/circuit";

import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";
import mysql from "mysql2/promise";
const router = Router({ mergeParams: true });

//get all
router.get("/alldata", async (req, res) => {
  var connection = await mysql.createConnection({
    host: process.env.MYSQL_ADDRESS,
    port: 3307,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "f1",
  });

  const circuits = await Circuit.find();

  const [rows, fields] = await connection.execute(
    "select * from races order by date desc limit 2000"
  );

  //@ts-ignore
  const newData = rows.map((row) => {
    return {
      ...row,
      //@ts-ignore
      circuit: circuits.find((circuit) => circuit.circuitId === row.circuitId)
        ._id,
      circuitId: undefined,
    };
  });

  console.log(newData);

  // await Race.insertMany(newData)

  res.send("test");
});

export default router;
