import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password123", 12);
  await prisma.user.create({
    data: {
      name: "Test User 2",
      email: "rbcarter2@yahoo.com",
      password,
      reviews: {
        create: {
          title: "Just lovely.",
          body: "Cured my illnesses rapidly and with great bedside manner.",
          rating: 4,
          doctorId: '64cd4fc9796be0af1421eae5'
        },
      },
    },
  })
  
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
