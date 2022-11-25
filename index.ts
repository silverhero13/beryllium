import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});