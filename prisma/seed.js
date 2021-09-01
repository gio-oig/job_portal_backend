import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

// interface user {
//   email: string;
//   role: Role;
//   password: string;
//   SeekerProfile?: { first_name: string; last_name: string };
//   Company?: { company_name: string; company_description: string };
// }

async function main() {
  const users = [
    {
      email: "saba@gmail.com",
      role: "USER",
      password: "saba",
      SeekerProfile: {
        first_name: "saba",
        last_name: "zeikidze",
      },
    },
    {
      email: "giorgi@gmail.com",
      role: "USER",
      password: "giorgi",
      SeekerProfile: {
        first_name: "giorgi",
        last_name: "ninidze",
      },
    },
    {
      email: "makoLove@gmail.com",
      role: "HR",
      password: "mako",
      Company: {
        company_name: "kusuna",
        company_description: "creating and spreading love",
      },
    },
  ];
  const locations = ["Tbilisi", "Senaki", "Kutaisi", "Batumi"];
  const categories = ["Security", "Information Technology", "Engineering"];

  for (let location of locations) {
    await prisma.jobLocation.create({
      data: {
        city: location,
      },
    });
  }

  for (let categorie of categories) {
    await prisma.category.create({
      data: {
        name: categorie,
      },
    });
  }

  for (let user of users) {
    if (user.role === "HR" && user.Company) {
      await prisma.userAccount.create({
        data: {
          email: "dedasheni@gmail.com",
          role: user.role,
          password: user.password,
          Company: {
            create: {
              company_name: user.Company.company_name,
              company_description: user.Company.company_description,
            },
          },
        },
      });
    } else if (user.role === "USER" && user.SeekerProfile) {
      await prisma.userAccount.create({
        data: {
          email: user.email,
          role: user.role,
          password: user.password,
          SeekerProfile: {
            create: {
              first_name: user.SeekerProfile.first_name,
              last_name: user.SeekerProfile.last_name,
            },
          },
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
