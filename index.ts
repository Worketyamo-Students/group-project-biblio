import express from "express";
import { configDotenv } from "dotenv";
import chalk from "chalk";
import morgan from "morgan";
import bodyParser from "body-parser";
configDotenv();
const app = express();
const port = process.env.PORT;
app.use(morgan("dev"));
app.use(bodyParser);
app.listen(port, (err) => {
  if (err) throw err;
  console.log(chalk.bgBlue(`http://localhost:${port}`));
});
