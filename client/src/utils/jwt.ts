import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = ({ token }: { token: string }) => {
  return new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, function (err, decoded) {
      if (err) {
        reject(err);
      }
      resolve(decoded as JwtPayload);
    });
  });
};
