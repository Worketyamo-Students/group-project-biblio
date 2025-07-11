import { Router } from "express";
import LoanController from "../controlles/Loan.controllers";

const loanRoutes = Router();

loanRoutes.post("/create", /* validationMiddleware.userValidation, */ LoanController.loanCreate);
loanRoutes.get("/", /* validationMiddleware.userValidation, */ LoanController.loanList);
loanRoutes.get("/profile/:LoanId", /* validationMiddleware.userValidation, */ LoanController.loanProfile);
loanRoutes.put("/update/:LoanId", /* validationMiddleware.userValidation, */ LoanController.loanUpdate);
loanRoutes.delete("/delete/:LoanId", /* validationMiddleware.userValidation, */ LoanController.loanDelete);

export default loanRoutes;