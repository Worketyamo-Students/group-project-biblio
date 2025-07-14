import express from "express";
import { configDotenv } from "dotenv";
import chalk from "chalk";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/Users.routes";
import bookRoutes from "./routes/Books.routes"; 
import loanRoutes from "./routes/Loan.routes";

configDotenv();

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/books", bookRoutes); 
app.use("/loans", loanRoutes);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(chalk.bgBlue(`http://localhost:${port}`));
});
