"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User {
    constructor(email, password, role) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.bcrypt = bcryptjs_1.default;
    }
    async hashPassword() {
        console.log("hashing password");
        const salt = await this.bcrypt.genSalt();
        const hashedPassword = await this.bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }
    getProperties() {
        return {
            email: this.email,
            password: this.password,
            role: this.role,
        };
    }
}
exports.User = User;
