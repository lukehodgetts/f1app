import Race from "../models/race";
import Driver from "../models/driver";
import Constructor from "../models/constructor";
import Status from "../models/status";
import Result from "../models/result";

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

  const races = await Race.find();
  const drivers = await Driver.find();
  const constructors = await Constructor.find();
  const statuses = await Status.find();

  const [rows, fields] = await connection.execute(
    "select * from results limit 30000"
  );

  //@ts-ignore
  const newData = rows.map((row) => {
    return {
      number: row.number,
      grid: row.grid,
      position: row.position,
      positionText: row.positionText,
      positionOrder: row.positionOrder,
      points: row.points,
      laps: row.laps,
      time: row.time,
      milliseconds: row.milliseconds,
      fastestLap: row.fastestLap,
      rank: row.rank,
      fastestLapTime: row.fastestLapTime,
      fastestLapSpeed: row.fastestLapSpeed,
      //@ts-ignore
      race: races.find((race) => race.raceId === row.raceId)._id,
      //@ts-ignore
      driver: drivers.find((driver) => driver.driverId === row.driverId)._id,
      //@ts-ignore
      team: constructors.find(
        (constructor) => constructor.constructorId === row.constructorId
      )._id,
      //@ts-ignore
      status: statuses.find((status) => status.statusId === row.statusId)._id,
    };
  });

  console.log(newData);

  await Result.insertMany(newData);

  res.send("test");
});

export default router;
