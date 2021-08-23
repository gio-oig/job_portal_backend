import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
  { email: "example1@gmail.com", name: "mike", password: "hashed password" },
  { email: "example2@gmail.com", name: "jack", password: "hashed password" },
  { email: "example3@gmail.com", name: "nia", password: "hashed password" },
  { email: "example4@gmail.com", name: "jull", password: "hashed password" },
  { email: "example5@gmail.com", name: "niko", password: "hashed password" },
];

async function seed() {
  await prisma.userAccount.create({
    data: {
      email: "saba@gmail.com",
      role: "USER",
      password: "hashed password",
      SeekerProfile: {
        create: { first_name: "saba", last_name: "ninidze" },
      },
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
export default seed;
