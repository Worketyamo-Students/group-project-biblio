import prisma from "../utils/prisma";
import { Request, Response } from "express";
import { Books } from "../generated/prisma";
import schema from "../utils/validator";
// import { acessToken, refreshToken } from "../utils/token";

const BookController = {

    bookCreate: async (req: Request, res: Response) => {
        try {
            const { title, author, description, year, isbn }: Books = req.body;

            if (!title || !author || !description || !year || !isbn) {
                res.status(400).json({ msg: "all fields are required" });
            }
          
            const book = await prisma.books.create({
                data: {
                    title,
                    author,
                    description,
                    year,
                    isbn,
                },
            });
            res.status(201).json({ msg: "book created", data: book });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },

    bookList: async (req: Request, res: Response) => {
        try {
            const books = await prisma.books.findMany();
            if (!books) res.status(400).json({ msg: "user does not existe" });
            res.status(200).json({ msg: "Books list", data: books });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },

    bookProfile: async (req: Request, res: Response) => {
        try {
            const id = req.params.BookId;
            console.log(id);
            const profile = await prisma.books.findUnique({
                where: {
                    id,
                },
            });
            if (!profile) res.status(400).json({ msg: "user does not existe" });
            res.status(200).json({ msg: "books profile", data: profile });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },

    bookUpdate: async (req: Request, res: Response) => {
        try {
            const id = req.params.BookId;
            console.log(id);
            const profile = await prisma.books.update({
                where: {
                    id,
                },
                data: {
                    ...req.body
                },
            });
            if (!profile) res.status(400).json({ msg: "user does not existe" });
            res.status(200).json({ msg: "book upated", data: profile });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },

    bookDelete: async (req: Request, res: Response) => {
        try {
            const id = req.params.BookId;
            console.log(id);
            const profile = await prisma.books.delete({
                where: {
                    id,
                },
            });
            if (!profile) res.status(400).json({ msg: "user does not existe" });
            res.status(200).json({ msg: "book deleted" });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },
}

export default BookController;