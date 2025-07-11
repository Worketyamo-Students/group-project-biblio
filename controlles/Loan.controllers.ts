import { Loan } from "../generated/prisma";
import { Request, Response } from "express";
import prisma from "../utils/prisma";

interface LoanRequest {
    userId: string;
    booksIds: string[];
    back: string;
}

const LoanController = {

    loanCreate: async (req: Request, res: Response) => {
        try {
            const { userId, booksIds, back }: LoanRequest = req.body;

            if (!userId || !booksIds || !back) {
                res.status(400).json({ msg: "all fields are required" });
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

            if (!booksIds || !back) {
                res.status(400).json({ msg: "all fields are required" });
            }

            const loan = await prisma.loan.update({
                where: {
                    id: LoanId,
                },
                data: {
                    back,
                    book: {
                        connect: booksIds.map((id: string) => ({ id })),                    }
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
            const profile = await prisma.loan.delete({
                where: {
                    id: LoanId,
                },
            });
            if (!profile) res.status(400).json({ msg: "Emprunt non найд" });
            res.status(200).json({ msg: "Emprunt supprimé" });
        } catch (error) {
            res.status(500).json({ msg: "server error try latter" });
        }
    },
};

export default LoanController;