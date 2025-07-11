import loanController from "../controlles/loan.controller"
import {Router} from "express"

const loanRoutes=Router()

loanRoutes.post("/loan",loanController.createLoan)
loanRoutes.get("/loan/:loanId",loanController.getLoan)
loanRoutes.get("/loan",loanController.getOneLoan)
loanRoutes.put("/loan/:loanId",loanController.updateLoan)
loanRoutes.delete("/loan:loanId",loanController.deleteLoan)


export default loanRoutes