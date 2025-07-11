import { Request } from "../utils/types";
import { Response } from "express";
import prisma from "../utils/prisma";
const loanController = {
  creatLoan: async (req: Request, res: Response) => {
    const { userId, back, bookId } = req.body;
    if (!userId || !back || !bookId) {
      res.status(401).json({ msg: "provie all field" });
    } else {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      const checkBook = await prisma.books.findUnique({
        where: {
          id: bookId,
        },
      });

      if (!user) {
        res.status(401).json({ msg: "User does not exist" });
      } else {
        if (!checkBook) {
          res.status(401).json({ msg: "book does not exist" });
        } else {
          if (!checkBook.loanId === null) {
            res.status(401).json({ msg: "book is not available" });
          } else {
            const loan = await prisma.loan.create({
              data: {
                userId,
                back,
              },
            });
            const book = await prisma.books.update({
              where: {
                id: bookId,
              },
              data: {
                loanId: loan.id,
              },
            });
            res.status(201).json({ msg: "loan created", data: loan });
          }
        }
      }
    }
  },
};

export default loanController;
