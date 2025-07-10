import { Router } from "express";
import BookController from "../controlles/Book.controller";
import validationMiddleware from "../middleware/validate";

const bookRoutes = Router();

bookRoutes.get("/", 
    validationMiddleware.userValidation, 
    BookController.bookList
);
bookRoutes.get(
    "/profile/:BookId",
    validationMiddleware.userValidation,
    BookController.bookProfile
);
bookRoutes.put(
    "/update/:BookId",
    validationMiddleware.userValidation,
    BookController.bookUpdate
);
bookRoutes.delete(
    "/delete/:BookId",
    validationMiddleware.userValidation,
    BookController.bookDelete
);

export default bookRoutes;