import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt from "express-jwt";

// declare namespace Express {
//   export interface Request {
//     user: string;
//   }
// }

export const authorize = (roles: string[] = []) => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    //@ts-ignore
    jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
    // authorize based on user role
    (req: Request, res: Response, next: NextFunction) => {
      console.log("in");
      console.log(req.user);
      if (roles.length && req.user) {
        // @ts-ignore
        if (!roles.includes(req.user?.role)) {
          // user's role is not authorized
          return res.status(401).json({ message: "Unauthorized" });
        }
      }

      // authentication and authorization successful
      next();
    },
  ];
};

// function (req, res, next) {
//   const authHeader = req.get('Authorization');

//   if (!authHeader) {
//     throw
//   }
//   const token = authHeader.split(' ')[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, secret);
//   } catch (err) {
//     throw
//   }

//   if (!decodedToken) {
//     throw new
//   }
//   req.sub = +decodedToken.sub;
//   req.role = decodedToken.role
//   next();
// }
