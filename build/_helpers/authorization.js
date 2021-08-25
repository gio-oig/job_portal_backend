"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const express_jwt_1 = __importDefault(require("express-jwt"));
// declare namespace Express {
//   export interface Request {
//     user: string;
//   }
// }
const authorize = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === "string") {
        roles = [roles];
    }
    return [
        //@ts-ignore
        express_jwt_1.default({ secret: process.env.SECRET, algorithms: ["HS256"] }),
        // authorize based on user role
        (req, res, next) => {
            var _a;
            console.log("in");
            console.log(req.user);
            if (roles.length && req.user) {
                // @ts-ignore
                if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
                    // user's role is not authorized
                    return res.status(401).json({ message: "Unauthorized" });
                }
            }
            // authentication and authorization successful
            next();
        },
    ];
};
exports.authorize = authorize;
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
