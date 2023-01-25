import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ModulSeeder = async () => {
  await prisma.appModul.deleteMany();
  const data = [
    { code: "SETTING", name: "Setting", order: 99, pattern: "/setting" },
    { code: "KARYAWAN", name: "Karyawan", order: 1, pattern: "/karyawan" },
  ];
  await prisma.appModul.createMany({ data: data });
};

export default ModulSeeder;
