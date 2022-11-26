import express from "express";
import bodyParser from 'body-parser'

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/healthcheck", (req, res) => {
  res.send("Hello, world!")
})

app.listen(port, async () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
