import express from "express";
import bodyParser from "body-parser";
import mysql, { Connection } from "mysql2/promise";

const app = express();
const port = 3000;

let connection: Connection

app.use(bodyParser.json());

app.get("/healthcheck", (req, res) => {
  res.send("Hello, world!");
});

app.get('/users', async (req, res) => {
  const result = await connection.query("SELECT * FROM users")
  const users = result[0]

  res.send(users)
})

app.listen(port, async () => {
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'cc_106',
    port: 3306,
  })

connection.connect()

  console.log(`[server]: Server is running at https://localhost:${port}`);
});
