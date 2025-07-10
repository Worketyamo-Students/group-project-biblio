import { NextFunction, Response } from "express";
import { Request } from "../utils/types";
import { verifyToken } from "../utils/token";

const validationMiddleware = {
  userValidation: async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization?.split(" ")[0];
    try {
      if (!authorization) {
        res.status(403).json({
          msg: "user not authorise to perfome the action",
        });
      } else {
        const token = await verifyToken(authorization);
        req.user_id = token.data.id;
      }
    } catch (error) {
      res.status(403).json({
        msg: "invalid token",
      });
    }
    next();
  },
};

export default validationMiddleware;
