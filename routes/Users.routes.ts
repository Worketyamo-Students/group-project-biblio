import { Router } from "express";
import UserController from "../controlles/User.controller";
const userRoutes = Router();

userRoutes.post("/sigup", UserController.userSignUp);
userRoutes.post("/login", UserController.userLogin);
userRoutes.get("/profile", UserController.userProfile);
userRoutes.put("/update", UserController.userUpdate);
userRoutes.delete("/sigup", UserController.userDelete);

export default userRoutes;
