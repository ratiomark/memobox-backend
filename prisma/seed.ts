import { Prisma, PrismaClient, Role, Status } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../test/utils/constants';
import { v4 as v4uuid } from 'uuid';
import { getRandomBetween } from '../src/utils/common/getRandomBetween';
import { PartialShelf, PartialBox, CardBase } from './types/entities';
import { newCards, defaultCard } from './mock-data/cards';
import { getSpecialType } from './helpers/getSpecialType';

const snakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('_');

const prisma = new PrismaClient();
const uuid = v4uuid as () => string;

export const prismaExtended = prisma.$extends({
  name: 'createManyAndReturn',
  model: {
    $allModels: {
      async createManyAndReturn<T, A>(
        this: T,
        args: Prisma.Exact<A, Prisma.Args<T, 'createMany'>>,
      ): Promise<Prisma.Result<T, A, 'createMany'> & { ids: string[] }> {
        const thisAny = this as any;
        const argsAny = args as any;
        const ctx = Prisma.getExtensionContext(this);

        const providedIds: string[] = [];

        argsAny.data.forEach((record: any) => {
          if (record.id) {
            providedIds.push(record.id);
          }
        });

        const numberOfRecordsWithoutId =
          argsAny.data.length - providedIds.length;

        const ids = await prisma.$queryRaw<
          {
            nextval: string;
          }[]
        >`
          SELECT nextval(pg_get_serial_sequence(${snakeCase(
            ctx.$name,
          )},'id')) FROM generate_series(1, ${numberOfRecordsWithoutId}) n
        `;

        let freeIdIndex = 0;
        const newRecords = argsAny.data.map((record: any) => {
          return {
            ...record,
            id: record.id ? record.id : ids[freeIdIndex++]?.nextval,
          };
        });

        const result = await thisAny.createMany({
          ...argsAny,
          data: newRecords,
        });

        return {
          ...result,
          newRecords,
          // ids: [...providedIds, ...ids.map((id) => id.nextval)],
        };
      },
    },
  },
});

async function createSeedsInDB() {
  console.log('Seeding...');
  const adminUserId = uuid();
  const userId = uuid();
  const shelfA = uuid();
  const shelfB = uuid();
  const shelfC = uuid();
  let userShelves: PartialShelf[];
  // let userBoxes: PartialBox[];

  async function seedRoles() {
    const roles: Role[] = [
      { id: 1, name: 'ADMIN' },
      { id: 2, name: 'USER' },
    ];

    const createdRoles = await prismaExtended.role.createManyAndReturn({
      data: roles,
    });
    console.log('✔️ roles');
    // console.log({ roles });
    return createdRoles['newRecords'];
  }

  async function seedStatuses() {
    const statuses: Status[] = [
      { id: 1, name: 'ACTIVE' },
      { id: 2, name: 'INACTIVE' },
    ];
    const createdStatuses = await prismaExtended.status.createManyAndReturn({
      data: statuses,
    });
    console.log('✔️ statuses');
    return createdStatuses['newRecords'];
  }

  async function seedUsers() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);
    const users = [
      {
        id: adminUserId,
        firstName: 'Super',
        lastName: 'Admin',
        email: ADMIN_EMAIL,
        password: hashedPassword,
        roleId: 1,
        statusId: 1,
      },
      {
        id: userId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
        roleId: 2,
        statusId: 1,
      },
    ];
    // await prisma.user.deleteMany();
    const createdUsers = await prismaExtended.user.createManyAndReturn({
      data: users,
    });
    console.log('✔️ users');
    return createdUsers['newRecords'];
    // const createdUsers = await prisma.user.createMany({ data: users });
    // return createdUsers;
    // return await prisma.user.findMany();
  }

  async function seedShelves() {
    userShelves = [
      {
        id: shelfA,
        title: 'Shelf A',
        userId: userId,
        isCollapsed: true,
        missedTrainingValue: 'none',
        index: 0,
      },
      {
        id: shelfB,
        title: 'Shelf B',
        userId: userId,
        isCollapsed: true,
        missedTrainingValue: 'none',
        index: 1,
      },
      {
        id: shelfC,
        title: 'Shelf C',
        userId: userId,
        isCollapsed: true,
        missedTrainingValue: 'none',
        index: 2,
      },
    ];
    // await prisma.shelf.createMany({ data: userShelves });
    // return prisma.shelf.findMany();
    const createdShelves = await prismaExtended.shelf.createManyAndReturn({
      data: userShelves,
    });
    console.log('✔️ shelves');
    return createdShelves['newRecords'];
  }

  async function seedBoxes() {
    const shelfIds = [shelfA, shelfB, shelfC];
    const userBoxes: PartialBox[] = [];
    const boxCounts = {}; // Для хранения количества коробок на каждой полке
    // const allBoxes: PartialBox[] = []; // Для хранения всех созданных коробок
    for (const shelfId of shelfIds) {
      const boxCount = getRandomBetween(4, 8);
      boxCounts[shelfId] = boxCount;
      for (let i = 0; i < boxCount; i++) {
        // let specialType: ;
        // switch (i) {
        // 	case 0:

        // 		break;

        // 	default:
        // 		break;
        // }
        const box: PartialBox = {
          id: uuid(),
          shelfId: shelfId,
          userId: userId,
          index: i,
          specialType: getSpecialType(i, boxCount),
          // timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
        };

        userBoxes.push(box);
      }
    }

    const createdBoxes = await prismaExtended.box.createManyAndReturn({
      data: userBoxes,
    });
    console.log('✔️ boxes');
    return { createBoxes: createdBoxes['newRecords'], boxCounts };
  }

  function createCardsForBoxes(
    boxData: PartialBox[],
    newCards: CardBase[],
    defaultCard: CardBase,
  ) {
    // Функция для создания копии defaultCard с добавлением нужных полей
    const createDefaultCards = (box: PartialBox, count: number) => {
      return Array.from({ length: count }, () => ({
        ...defaultCard,
        shelfId: box.shelfId,
        userId: box.userId,
        boxId: box.id,
      }));
    };

    // Итерация по каждой коробке и создание карточек
    const allCards = boxData.flatMap((box) => {
      if (box.index === 0) {
        // Для коробок с индексом 0 используем newCards
        return newCards.map((card) => ({
          ...card,
          shelfId: box.shelfId,
          userId: box.userId,
          boxId: box.id,
        }));
      } else {
        const randomCount = getRandomBetween(2, 4);
        return createDefaultCards(box, randomCount);
      }
    });
    // console.log(allCards);
    return allCards;
  }

  async function seedCards(boxData: PartialBox[]) {
    const box = boxData[0];
    const cards = createCardsForBoxes(boxData, newCards, defaultCard);

    const createdCards = await prismaExtended.card.createMany({
      data: cards,
    });
    // console.log(createdCards.count);
    // const createdCards = await prismaExtended.card.createManyAndReturn({
    //   data: cards,
    // });
    console.log('✔️ cards' + ' | created ', createdCards.count);
    return await prisma.card.findMany();
    // return createdCards;
    // return createdCards['newRecords'];
  }

  const seedData = {
    seedRoles: await seedRoles(),
    seedStatuses: await seedStatuses(),
    seedUsers: await seedUsers(),
    seedShelves: await seedShelves(),
  };
  const seedBoxesResult = await seedBoxes();
  const boxesFromDb = seedBoxesResult.createBoxes;
  const boxCounts = seedBoxesResult.boxCounts;
  seedData['seedBoxes'] = boxesFromDb;
  seedData['boxCounts'] = boxCounts;
  // console.log(boxesFromDb);
  const cardsFromDb = await seedCards(boxesFromDb);
  seedData['seedCards'] = cardsFromDb;
  console.log('Seeding completed.');
  return seedData;
}

async function main() {
  try {
    const createdDB = await createSeedsInDB();
    await prisma.$disconnect();
    return createdDB;
  } catch (e) {
    console.error(e);
    console.log('Seeding failed.');
    await prisma.$disconnect();
  }
}
main().catch((e) => {
  console.error(e);
});

export default main;
