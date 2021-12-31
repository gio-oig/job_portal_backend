import { UserAccount } from "@prisma/client";

export type LoginResponse = {
  user: UserAccount;
  token: string;
};
