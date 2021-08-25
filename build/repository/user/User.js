"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const client_1 = require("@prisma/client");
const ErrorClass_1 = require("../../public/models/ErrorClass");
class UserRepo {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewUser(userObj) {
        try {
            const existingUser = await this.prisma.userAccount.findUnique({
                where: { email: userObj.email },
            });
            // console.log("checkIfUserExists");
            if (existingUser) {
                throw new ErrorClass_1.ExtendedError("User Already exists");
            }
            console.log(userObj);
            const createdUser = await this.prisma.userAccount.create({
                data: userObj.getProperties(),
            });
            // throw new Error("debugging");
            return createdUser;
        }
        catch (error) {
            throw new ErrorClass_1.ExtendedError(error.message);
        }
    }
    async findUserByEmail(email) {
        const existingUser = await this.prisma.userAccount.findUnique({
            where: { email: email },
        });
        return existingUser;
    }
    async createSeekerProfile(seeker) {
        // console.log(seeker);
        try {
            const seekerProfile = await this.prisma.seekerProfile.create({
                data: {
                    first_name: seeker.firstName,
                    last_name: seeker.lastName,
                    user_account_id: seeker.userId,
                },
            });
            return seekerProfile;
        }
        catch (error) {
            console.log(error.message);
            throw new ErrorClass_1.ExtendedError("Unable to create seeker profile, please try again later.");
        }
    }
}
exports.userRepo = new UserRepo(new client_1.PrismaClient({ log: ["query", "info"] }));
