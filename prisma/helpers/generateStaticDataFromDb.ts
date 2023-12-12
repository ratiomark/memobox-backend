import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import {
  TEST_shelfId,
  TEST_cardsInNewBox,
  TEST_boxIdNewCards,
  TEST_boxesByShelfIdOrderIndex,
} from '../../test/utils/constants';
const prisma = new PrismaClient();
interface DataEntry {
  constName: string;
  data: any[];
}

const defaultFileName = 'staticDataFromDb.ts';
const saveFilePath = 'prisma/mock-data';

async function createFileWithData(
  dataEntries: DataEntry[] | string | any,
  fileName: string = defaultFileName,
  path: string = __dirname,
): Promise<void> {
  // Формирование содержимого файла
  let fileContent = '/* cSpell:disable */\n';
  dataEntries.forEach((entry) => {
    let dataString;

    if (Array.isArray(entry.data)) {
      // Обработка массива
      dataString = entry.data
        .map((item) => JSON.stringify(item, null, 2))
        .join(',\n    ');
      fileContent += `export const ${entry.constName} = [\n    ${dataString}\n];\n\n`;
    } else if (typeof entry.data === 'object') {
      // Обработка объекта
      dataString = JSON.stringify(entry.data, null, 2);
      fileContent += `export const ${entry.constName} = ${dataString};\n\n`;
    } else {
      // Обработка примитивных типов (например, строки)
      dataString = JSON.stringify(entry.data);
      fileContent += `export const ${entry.constName} = ${dataString};\n\n`;
    }
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
  const shelfIdToCheck = shelves[0].id;
  const boxIdNewCards = boxes.find(
    (box) => box.specialType === 'new' && box.shelfId === shelfIdToCheck,
  )?.id;
  const cardsInNewBox = cards.filter((card) => card.boxId === boxIdNewCards);
  const boxesByShelfId = await prisma.box.findMany({
    where: { shelfId: shelfIdToCheck },
    orderBy: { index: 'asc' },
  });
  // const boxId
  // boxIndexToIdObject[]
  return [
    { constName: 'roles', data: roles },
    { constName: 'statuses', data: statuses },
    { constName: 'users', data: users },
    { constName: 'shelves', data: shelves },
    { constName: 'boxes', data: boxes },
    { constName: 'cards', data: cards },
    { constName: TEST_shelfId, data: shelfIdToCheck },
    { constName: TEST_boxIdNewCards, data: boxIdNewCards },
    { constName: TEST_cardsInNewBox, data: cardsInNewBox },
    { constName: TEST_boxesByShelfIdOrderIndex, data: boxesByShelfId },
  ];
}

async function main() {
  try {
    const data = await getSeedDataFromDb();
    await createFileWithData(data, defaultFileName, saveFilePath);
    await prisma.$disconnect();
  } catch (e) {
    await prisma.$disconnect();
    return e;
  }
}
main().catch((e) => {
  console.error(e);
});
