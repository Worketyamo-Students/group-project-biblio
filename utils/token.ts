import jwt from "jsonwebtoken";
const secret = `${process.env.JWT_SECRET}`;
const refreshSecret = `${process.env.JWT_R_SECRET}`;
export const acessToken = async (payload: string) => {
  const token = jwt.sign({ id: payload }, secret);
  return token;
};

export const refreshToken = async (payload: string) => {
  const token = jwt.sign(payload, refreshSecret);
  return token;
};

export const verifyToken = (payload: string): Promise<{ data: any }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(payload, secret, (err, decoded) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve({ data: decoded });
    });
  });
};
