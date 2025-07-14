import { Response } from "express";
import { User } from "../generated/prisma";
import schema from "../utils/validator";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
import { Request } from "../utils/types";
import { acessToken, refreshToken } from "../utils/token";

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
          const pasEncrypted = `${await bcrypt.hash(password, 10)}`;
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
  userLogin: async (req: Request, res: Response) => {
    try {
      const { email, password }: User = req.body;
      const { error } = schema.validate({ email, password });
      if (error) {
        res.status(401).json({ msg: error.message });
      } else {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          res.status(401).json({
            msg: "user does not exist",
          });
        } else {
          const pasEncrypted = `${await bcrypt.compare(
            password,
            user.password
          )}`;
          if (!pasEncrypted) res.status(401).json({ msg: "wrong password" });
          const token = await acessToken(user.id);
          const refresh = await refreshToken(user.id);
          res.cookie("cookie-wyx", refresh);
          res.status(201).json({
            msg: `welcome back ${user.name}`,
            token: token,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ msg: "server error try latter" });
    }
  },
  userProfile: async (req: Request, res: Response) => {
    try {
      const id = req.user_id;
      console.log(id);
      const profile = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!profile) res.status(400).json({ msg: "user does not existe" });
      res.status(200).json({ msg: "user", data: profile });
    } catch (error) {
      res.status(500).json({ msg: "server error try latter" });
    }
  },
  userUpdate: async (req: Request, res: Response) => {
    const id = req.user_id;
    const { name, email, password }: User = req.body;
    try {
      const profile = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
        },
      });
      if (!profile) res.status(400).json({ msg: "user does not existe" });
      res.status(200).json({ msg: "user upated", data: profile });
    } catch (error) {
      res.status(500).json({ msg: "server error try latter" });
    }
  },
  userDelete: async (req: Request, res: Response) => {
    try {
      const id = req.user_id;
      console.log(id);
      const profile = await prisma.user.delete({
        where: {
          id,
        },
      });
      if (!profile) res.status(400).json({ msg: "user does not existe" });
      res.status(200).json({ msg: "user deleted" });
    } catch (error) {
      res.status(500).json({ msg: "server error try latter" });
    }
  },
  userLogout: async () => {},
};

export default UserController;
