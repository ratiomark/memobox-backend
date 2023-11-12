import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { join } from 'path';
const prisma = new PrismaClient();
interface DataEntry {
  constName: string;
  data: any[];
}
const defaultFileName = 'staticDataFromDb.ts';

async function createFileWithData(
  dataEntries: DataEntry[],
  fileName: string = defaultFileName,
  path: string = __dirname,
): Promise<void> {
  // Формирование содержимого файла
  let fileContent = '/* cSpell:disable */\n';
  dataEntries.forEach((entry) => {
    const dataString = entry.data
      .map((item) => JSON.stringify(item, null, 2))
      .join(',\n    ');
    fileContent += `export const ${entry.constName} = [\n    ${dataString}\n];\n\n`;
  });

  // Полный путь к файлу
  const fullPath = join(path, fileName);

  // Запись файла
  try {
    await writeFile(fullPath, fileContent);
    console.log(`Файл ${fullPath} успешно создан.`);
  } catch (err) {
    console.error('Ошибка при записи файла:', err);
  }
}
// const roles = await prisma.role.findMany({
//   select: prismaExclude('Role', ['id']),
// });
async function getSeedDataFromDb() {
  const roles = await prisma.role.findMany();
  const statuses = await prisma.status.findMany();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    },
  });
  const shelves = await prisma.shelf.findMany();
  const boxes = await prisma.box.findMany();
  const cards = await prisma.card.findMany();
  return [
    { constName: 'roles', data: roles },
    { constName: 'statuses', data: statuses },
    { constName: 'users', data: users },
    { constName: 'shelves', data: shelves },
    { constName: 'boxes', data: boxes },
    { constName: 'cards', data: cards },
  ];
}

async function main() {
  try {
    const data = await getSeedDataFromDb();
    await createFileWithData(data, defaultFileName, 'prisma/mock-data');
    await prisma.$disconnect();
  } catch (e) {
    await prisma.$disconnect();
    return e;
  }
}
main().catch((e) => {
  console.error(e);
});
