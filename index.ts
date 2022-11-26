import express from "express";
import bodyParser from "body-parser";
import mysql, { Connection } from "mysql2/promise";

const app = express();
const port = 3000;

let connection: Connection;

app.use(bodyParser.json());

app.get("/healthcheck", (req, res) => {
  res.send("Hello, world!");
});

app.get("/users", async (req, res) => {
  const result = await connection.query("SELECT * FROM users");
  const users = result[0];

  res.send(users);
});

app.post("/users", async (req, res) => {
  const request_body = req.body;

  const user_first_name = request_body.first_name;
  const user_last_name = request_body.last_name;
  const user_age = request_body.age;
  const user_sex = request_body.sex;
  const user_is_employed = request_body.is_employed;

  connection.query(
    "INSERT INTO users (first_name, last_name, age, sex, is_employed) VALUES (?, ?, ?, ?, ?);",
    [user_first_name, user_last_name, user_age, user_sex, user_is_employed]
  );

  res.status(201).send();
});

app.listen(port, async () => {
  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password@123",
    database: "cc_106",
    port: 3306,
  });

  connection.connect();

  console.log(`[server]: Server is running at https://localhost:${port}`);
});
