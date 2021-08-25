"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const ErrorClass_1 = require("../public/models/ErrorClass");
const UserClass_1 = require("../public/models/UserClass");
const User_1 = require("../repository/user/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SeekerClass_1 = require("../public/models/SeekerClass");
class UserService {
    async createSeekerProfile(userId, firstName, lastName) {
        let createdSeekerProfile;
        const seekerInstance = new SeekerClass_1.SeekerProfile(userId, firstName, lastName);
        createdSeekerProfile = await User_1.userRepo.createSeekerProfile(seekerInstance);
        return {
            message: "seeker profile created successfully",
            data: createdSeekerProfile,
        };
    }
    async signUp(email, password, role) {
        const userInstance = new UserClass_1.User(email, password, role);
        await userInstance.hashPassword();
        console.log("userInstance");
        console.log(userInstance);
        const resp = await User_1.userRepo.createNewUser(userInstance);
        return { message: "user created succesfully", data: resp };
    }
    async logIn(email, password) {
        const user = (await User_1.userRepo.findUserByEmail(email));
        if (!user) {
            throw new ErrorClass_1.ExtendedError("User does not exists");
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            throw new ErrorClass_1.ExtendedError("Invalid password", 500, {
                password: "Invalid password",
            });
        }
        const TOKEN = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role }, 
        //@ts-ignore
        process.env.SECRET, {
            expiresIn: "1h",
        });
        return {
            message: "success",
            data: user,
            token: TOKEN,
        };
    }
}
exports.userService = new UserService();
