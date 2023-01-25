import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MasterCategorySeeder = async () => {
  await prisma.masterCategory.deleteMany();
};

export default MasterCategorySeeder;
