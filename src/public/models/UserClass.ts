import bcrypt from "bcryptjs";
import { Role } from "../../constants/interfaces";

export class User {
  private bcrypt = bcrypt;

  constructor(
    public email: string,
    public password: string,
    public role: Role
  ) {}

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
