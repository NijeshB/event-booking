import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: "Nijesh",
//       email: "nijesh.cse92@gmail.com",
//       password: "Nijesh@134",
//       mobile: "9944388505",
//     },
//   });
//   console.log(user);
// }

// main()
//   .catch((e) => {
//     logger.error(e.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

export default prismaClient;
