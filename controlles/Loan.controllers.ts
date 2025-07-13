import { Loan } from "../generated/prisma";
import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { title } from "process";

interface LoanRequest {
    userId: string;
    booksIds: string[];
    back: string;
}

const LoanController = {

    loanCreate: async (req: Request, res: Response) => {
        try {
            const { userId, booksIds, back }: LoanRequest = req.body;

            if (!userId || !booksIds || !back || !Array.isArray(booksIds)) { 
                res.status(400).json({ msg: "all fields are required" });
            }

            // check if user exist
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                return res.status(400).json({ msg: "user does not exist" });
            }

            // check if books exist
            const books = await prisma.books.findMany({
                where: { id: { in: booksIds } }, 
            })
            // check if all books exist
            if (books.length !== booksIds.length) {
                return res.status(400).json({ msg: "one or some books does not exist" });
            }

            // check if all books are not already loaned
            const alreadyLoanedBooks = books.filter(book => book.loanId !== null);
            if (alreadyLoanedBooks.length > 0) {
                return res.status(400).json({ 
                    msg: "one or some books are already loaned",
                    books: alreadyLoanedBooks.map(book => ({ id: book.id, title: book.title }))});
            }

            const loan = await prisma.loan.create({
                data: {
                    userId,
                    back,
                    book: {
                        connect: booksIds.map((id: string) => ({ id })),                    }
                },
                include: { book: true, User: true }
            });

            res.status(201).json({ msg: "loan created", data: loan });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },

    loanList: async (req: Request, res: Response) => { 
        try {
            const loans = await prisma.loan.findMany({
                include: { book: true, User: true }
            });
            if (!loans) res.status(400).json({ msg: "Emprunt non trouvé" });
            res.status(200).json({ msg: "Liste d'emprunts", data: loans });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },

    loanProfile: async (req: Request, res: Response) => { 
        try {
            const { LoanId } = req.params;
            const profile = await prisma.loan.findUnique({
                where: {
                    id: LoanId,
                },
                include: { book: true, User: true }
            });
            if (!profile) res.status(400).json({ msg: "Emprunt non trouvé" });
            res.status(200).json({ msg: "Details de l'emprunt", data: profile });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },

    loanUpdate: async (req: Request, res: Response) => { 
        try {
            const { LoanId } = req.params;
            const { booksIds, back }: LoanRequest = req.body;

            if (!booksIds || !back || !Array.isArray(booksIds)) {
                res.status(400).json({ msg: "all fields are required" });
            }

            // check if loan exist
            const loan = await prisma.loan.findUnique({
                where: { id: LoanId },
                include: { book: true },
            })

            if (!loan) {
                return res.status(400).json({ msg: "loan does not exist" });
            }

            const books = await prisma.books.findMany({
                where: { id: { in: booksIds } },
            })

            if (books.length !== booksIds.length) {
                return res.status(400).json({ msg: "one or some books does not exist" });
            }

            // check if all books are not already loaned
            const alreadyLoanedBooks = books.filter(
                (book) => book.loanId !== null && book.loanId !== LoanId
            )

            // check if all books are not already loaned
            if (alreadyLoanedBooks.length > 0) {
                return res.status(400).json({
                    msg: "one or some books are already loaned",
                    books: alreadyLoanedBooks.map((book) => ({
                        id: book.id,
                        title: book.title,
                    })),
                })
            }

            const updatedLoan = await prisma.loan.update({
                where: { id: LoanId },
                data: {
                    back,
                    book: {
                        set: [], // remove all books
                        connect: booksIds.map((id: string) => ({ id })), // add new books
                    },
                },
                include: { book: true, User: true }
            });

            res.status(201).json({ msg: "loan updated", data: loan });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },

    loanDelete: async (req: Request, res: Response) => { 
        try {
            const { LoanId } = req.params;

            const loan = await prisma.loan.findUnique({
                where: { id: LoanId },
                include: { book: true },
            })

            if (!loan) {
                return res.status(400).json({ msg: "loan does not exist" });
            }

            // update book loanId
            if (loan.book && loan.book.length > 0) {
                await prisma.books.updateMany({
                    where: { 
                        id: {
                            in: loan.book.map((book) => book.id),
                        },
                    },
                    data: {
                        loanId: null,
                    }
                })
            }

            const profile = await prisma.loan.delete({
                where: {
                    id: LoanId,
                },
            });
            
            if (!profile) res.status(400).json({ msg: "Emprunt non trouvé" });
            res.status(200).json({ msg: "Emprunt supprimé" });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },
};

export default LoanController;