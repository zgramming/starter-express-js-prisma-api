import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MasterDataSeeder = async () => {
  await prisma.masterData.deleteMany();
};

export default MasterDataSeeder;
