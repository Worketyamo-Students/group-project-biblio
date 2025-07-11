import { Router } from "express";
import loanController from "../controlles/Loan.controller";
const loanRouter = Router();
loanRouter.post("/create", loanController.creatLoan);
export default loanRouter;
