import mysql from "mysql2/promise";
var connection = mysql.createConnection({
  host: "172.17.0.1",
  port: 3307,
  user: "root",
  password: "root",
  database: "f1",
});

export default connection;
