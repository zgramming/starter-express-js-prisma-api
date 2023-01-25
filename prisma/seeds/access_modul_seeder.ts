import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AccessModulSeeder = async () => {
  await prisma.appAccessModul.deleteMany();
  const superadmin = await prisma.appGroupUser.findFirst({
    where: { code: "superadmin" },
  });

  const karyawan = await prisma.appGroupUser.findFirst({
    where: { code: "karyawan" },
  });

  const modul = await prisma.appModul.findMany();

  const dataSuperadmin = modul.map((val, index) => {
    return {
      app_group_user_id: superadmin?.id ?? 0,
      app_modul_id: val.id,
    };
  });

  const dataKaryawan = modul
    .filter((val) => val.code == "KARYAWAN")
    .map((val, index) => {
      return {
        app_group_user_id: karyawan?.id ?? 0,
        app_modul_id: val.id,
      };
    });

  await prisma.appAccessModul.createMany({
    data: [...dataSuperadmin, ...dataKaryawan],
  });
};

export default AccessModulSeeder;
