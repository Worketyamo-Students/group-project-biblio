import { Router } from "express";
import BookController from "../controlles/Books.controllers";

const bookRoutes = Router();

bookRoutes.post("/create", BookController.bookCreate);
bookRoutes.get("/", BookController.bookList);
bookRoutes.get("/:BookId", BookController.bookProfile);
bookRoutes.put("/update/:BookId", BookController.bookUpdate);
bookRoutes.delete("/delete/:BookId", BookController.bookDelete);

export default bookRoutes;
