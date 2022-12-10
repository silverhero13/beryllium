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

app.get("/menu", async (req, res) => {
  const result = await connection.query("SELECT * FROM menu");
  const menu = result[0];

  res.send(menu);
});

app.post("/menu", async (req, res) => {
  const { name, price, type } = req.body;

  if (!name || !price || !type) {
    res.status(400).send();
    return;
  }

  connection.query("INSERT INTO menu (name, price, type) VALUES (?, ?, ?)", [
    name,
    price,
    type,
  ]);

  res.status(201).send();
});

app.delete("/menu/:id", async (req, res) => {
  connection.query("DELETE FROM menu WHERE id=?", [req.params.id]);

  res.status(204).send();
});

app.patch("/menu/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, type } = req.body;

  connection.query("UPDATE menu SET name=?, price=?, type=? WHERE id=?", [
    name,
    price,
    type,
    id,
  ]);

  res.status(204).send();
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
