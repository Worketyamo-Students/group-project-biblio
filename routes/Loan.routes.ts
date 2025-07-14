import { Router } from "express";
import LoanController from "../controlles/Loan.controllers";

const loanRoutes = Router();

loanRoutes.post("/create", LoanController.loanCreate);
loanRoutes.get("/", LoanController.loanList);
loanRoutes.get("/profile/:LoanId", LoanController.loanProfile);
loanRoutes.put("/update/:LoanId", LoanController.loanUpdate);
loanRoutes.delete("/delete/:LoanId", LoanController.loanDelete);

export default loanRoutes;