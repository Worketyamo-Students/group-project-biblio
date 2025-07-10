import { Router } from "express";
import UserController from "../controlles/User.controller";
import validationMiddleware from "../middleware/validate";

const userRoutes = Router();

userRoutes.post("/signup", UserController.userSignUp);
userRoutes.post("/login", UserController.userLogin);
userRoutes.get(
  "/profile",
  validationMiddleware.userValidation,
  UserController.userProfile
);
userRoutes.put(
  "/update",
  validationMiddleware.userValidation,
  UserController.userUpdate
);
userRoutes.delete(
  "/delete",
  validationMiddleware.userValidation,
  UserController.userDelete
);

export default userRoutes;
