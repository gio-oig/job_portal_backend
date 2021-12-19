import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt from "express-jwt";
import nodeJwt from "jsonwebtoken";
import { ExtendedError } from "../public/models/ErrorClass";
import dotenv from "dotenv";
dotenv.config();

export const authorize = (roles: string[] = []) => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    //@ts-ignore
    jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
    // auth,
    // authorize based on user role
    (req: Request, res: Response, next: NextFunction) => {
      console.log(req.user);
      if (roles.length && req.user) {
        // allowed for all users and still get user id in request object
        if (roles[0] === "ALL") {
          return next();
        }
        // @ts-ignore
        if (!roles.includes(req.user?.role)) {
          // user's role is not authorized
          return next(new ExtendedError("Unauthorized", 401));
        }
      }

      // authentication and authorization successful
      next();
    },
  ];
};

function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.get("Authorization");
  console.log("am innnnnnn");
  if (!authHeader) {
    throw new ExtendedError("no token presented");
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    // @ts-expect-error
    decodedToken = nodeJwt.verify(token, process.env.SECRET);
  } catch (err) {
    throw new ExtendedError("idk error");
  }

  if (!decodedToken) {
    throw new ExtendedError("inv token");
  }

  // @ts-expect-error
  req.sub = +decodedToken.sub;
  // @ts-expect-error
  req.role = decodedToken.role;
  next();
}
