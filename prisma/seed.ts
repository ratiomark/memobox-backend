import { Box, Prisma, PrismaClient, Role, Shelf, Status } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../test/utils/constants';
import { v4 as v4uuid } from 'uuid';

const snakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('_');
type PartialShelf = Omit<Shelf, 'createdAt' | 'updatedAt'>;
type PartialBox = Omit<Box, 'createdAt' | 'updatedAt'>;
const prisma = new PrismaClient();
const uuid = v4uuid as () => string;
interface DataBlock {
  wait: number;
  all: number;
  train: number;
}
// const basePrismaClient = new PrismaClient();

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

  // async function seedStatuses() {
  //   const statuses: Status[] = [
  //     { id: 1, name: 'ACTIVE' },
  //     { id: 2, name: 'INACTIVE' },
  //   ];

  //   // for (const status of statuses) {
  //   //   await prisma.status.upsert({
  //   //     where: { id: status.id },
  //   //     update: {},
  //   //     create: status,
  //   //   });
  //   // }
  //   const createdStatuses = await prisma.status.createMany({ data: statuses });
  //   console.log('✔️ statuses');
  //   return createdStatuses;
  //   // return await prisma.status.findMany();
  //   // console.log({ statuses });
  // }

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
        index: 0,
      },
      {
        id: shelfB,
        title: 'Shelf B',
        userId: userId,
        isCollapsed: true,
        index: 1,
      },
      {
        id: shelfC,
        title: 'Shelf C',
        userId: userId,
        isCollapsed: true,
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
      const boxCount = Math.floor(Math.random() * 4) + 5; // Случайное число от 5 до 8
      boxCounts[shelfId] = boxCount;
      for (let i = 0; i < boxCount; i++) {
        const box: PartialBox = {
          id: uuid(),
          shelfId: shelfId,
          userId: userId,
          index: i,
          timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
        };

        userBoxes.push(box);

        // Здесь добавьте код для сохранения коробки в базу данных, если это необходимо
        // Например: await prisma.box.create({ data: box });
      }
    }

    // Вывод информации о количестве коробок на каждой полке
    // console.log(JSON.stringify(boxCounts)); // Пример: {"shelfA": 5, "shelfB": 6, "shelfC": 7}
    // const boxes = await prisma.box.findMany();
    // Возвращаем созданные коробки и информацию о количестве коробок на полках
    // return { userBoxes: boxes, boxCounts };
    const createdBoxes = await prismaExtended.box.createManyAndReturn({
      data: userBoxes,
    });
    console.log('✔️ boxes');
    return createdBoxes['newRecords'];
  }
  // const seedData = {
  //   seedRoles: await seedRoles(),
  //   seedStatuses: await seedStatuses(),
  //   seedUsers: await seedUsers(),
  //   seedShelves: await seedShelves(),
  // };
  // // const seed = await Promise.all([
  // //   seedRoles,
  // //   seedStatuses,
  // //   seedUsers,
  // //   seedShelves,
  // // seedBoxes,
  // // ]);
  // return seedData;
  const seedData = {
    seedRoles: await seedRoles(),
    seedStatuses: await seedStatuses(),
    seedUsers: await seedUsers(),
    seedShelves: await seedShelves(),
    seedBoxes: await seedBoxes(),
  };
  // const [shelvesRes, boxesRes] = await Promise.all([
  //   // seedRoles(),
  //   // seedStatuses(),
  //   seedShelves(),
  //   seedBoxes(),
  // ]);
  // // const [usersRes, shelvesRes, boxesRes] = await Promise.all([
  // //   // seedRoles(),
  // //   // seedStatuses(),
  // //   seedUsers(),
  // //   seedShelves(),
  // //   seedBoxes(),
  // // ]);

  // seedData = {
  //   ...seedData,
  //   // seedRoles: rolesRes,
  //   // seedStatuses: statusesRes,
  //   // seedUsers: usersRes,
  //   seedShelves: shelvesRes,
  //   seedBoxes: boxesRes,
  // };
  // console.log(seedData);

  console.log('Seeding completed.');
  return seedData;
}

async function main() {
  try {
    const createdDB = await createSeedsInDB();

    return createdDB;
    // await seedRoles();
    // await seedStatuses();
    // await seedUsers();
    // await seedShelf();
  } catch (e) {
    console.error(e);
    console.log('Seeding failed.');
  }
}
export default main;
// main()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
// import { PrismaClient, Role, Status } from '@prisma/client';
// import bcrypt from 'bcryptjs';
// import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../test/utils/constants';
// import { v4 as uuid } from 'uuid';

// const prisma = new PrismaClient();

// async function seedRoles() {
//   const roles: Role[] = [
//     { id: 1, name: 'ADMIN' },
//     { id: 2, name: 'USER' },
//   ];

//   for (const role of roles) {
//     await prisma.role.upsert({
//       where: { id: role.id },
//       update: {},
//       create: role,
//     });
//   }
//   console.log({ roles });
// }

// async function seedStatuses() {
//   const statuses: Status[] = [
//     { id: 1, name: 'ACTIVE' },
//     { id: 2, name: 'INACTIVE' },
//   ];

//   for (const status of statuses) {
//     await prisma.status.upsert({
//       where: { id: status.id },
//       update: {},
//       create: status,
//     });
//   }
//   console.log({ statuses });
// }

// async function seedUsers() {
//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);
//   const users = [
//     {
//       firstName: 'Super',
//       lastName: 'Admin',
//       email: ADMIN_EMAIL,
//       password: hashedPassword,
//       roleId: 1,
//       statusId: 1,
//     },
//     {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       password: hashedPassword,
//       roleId: 2,
//       statusId: 1,
//     },
//   ];

//   for (const user of users) {
//     await prisma.user.upsert({
//       where: { email: user.email },
//       update: {},
//       create: user,
//     });
//   }
//   console.log({ users });
// }

// async function main() {
//   console.log('Seeding...');
//   await seedRoles();
//   await seedStatuses();
//   await seedUsers();
//   console.log('Seeding completed.');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
