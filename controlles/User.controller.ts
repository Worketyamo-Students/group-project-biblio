import { Request, Response } from "express";
import { User } from "../generated/prisma";
import schema from "../utils/validator";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
const UserController = {
  userSignUp: async (req: Request, res: Response) => {
    try {
      const { name, email, password }: User = req.body;
      const { error } = schema.validate({ name, email, password });
      if (error) {
        res.status(401).json({ msg: error.message });
      } else {
        const emailCheck = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (emailCheck) {
          res.status(401).json({
            msg: "user email exist",
          });
        } else {
          const pasEncrypted = `${bcrypt.hash(password, 10)}`;
          const user = await prisma.user.create({
            data: {
              name,
              email,
              password: pasEncrypted,
            },
          });
          res.status(201).json({
            msg: "user created",
            data: user,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ msg: "server error try latter" });
    }
  },
  userLogin: async () => {},
  userUpdate: async () => {},
  userDelete: async () => {},
  userLogout: async () => {},
  userProfile: async () => {},
};

export default UserController;
