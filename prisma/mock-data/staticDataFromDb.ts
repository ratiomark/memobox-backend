/* cSpell:disable */
export const roles = [
  {
    id: 1,
    name: 'ADMIN',
  },
  {
    id: 2,
    name: 'USER',
  },
];

export const statuses = [
  {
    id: 1,
    name: 'ACTIVE',
  },
  {
    id: 2,
    name: 'INACTIVE',
  },
];

export const users = [
  {
    id: '26939538-39ef-463f-9ed9-10fcdb210b00',
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$b5h67Gn.01LwAXItK/xGBuOLKsYe4OizJgqcQ5deXPHrShSbOFJe2',
  },
  {
    id: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '$2a$10$b5h67Gn.01LwAXItK/xGBuOLKsYe4OizJgqcQ5deXPHrShSbOFJe2',
  },
];

export const shelves = [
  {
    id: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    title: 'Shelf A',
    index: 0,
    isCollapsed: true,
    createdAt: '2023-11-13T00:51:39.373Z',
    updatedAt: '2023-11-13T00:51:39.373Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
  },
  {
    id: '038f6f60-1034-46a1-b9c4-427aece3333f',
    title: 'Shelf B',
    index: 1,
    isCollapsed: true,
    createdAt: '2023-11-13T00:51:39.373Z',
    updatedAt: '2023-11-13T00:51:39.373Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
  },
  {
    id: '85605016-41a5-496f-9211-5d94bd3b9047',
    title: 'Shelf C',
    index: 2,
    isCollapsed: true,
    createdAt: '2023-11-13T00:51:39.373Z',
    updatedAt: '2023-11-13T00:51:39.373Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
  },
];

export const boxes = [
  {
    id: 'd94630ac-e4b0-4db7-be04-e3d24e375842',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
  },
  {
    id: '54d1e7df-2657-429b-bcda-67cb3df463a1',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
  },
  {
    id: '4b091a02-a184-4438-b051-257ac4e4474c',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
  },
  {
    id: 'f97669ac-335f-42b3-a6f4-1ba24eead169',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
  },
  {
    id: 'bbd6f079-756d-442f-b951-94006661c8f3',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
  },
  {
    id: 'c5cdb380-e784-45ae-901b-2207d9f0056e',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
  },
  {
    id: '4e5b8843-b26f-4d9b-b5b8-f75103e3c301',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
  },
  {
    id: '03e721b7-ea64-44a3-a7ba-2e86ae8c4427',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
  },
  {
    id: '1e926c97-8132-4653-8eff-9a4953eb13e4',
    index: 4,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
  },
  {
    id: '24ae3435-85a9-4e91-a423-f241b8508010',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
  },
  {
    id: 'a5e41a45-8d96-442e-8507-eea45492c607',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
  },
  {
    id: '272e42fb-46ea-40d9-8055-fa28997dcb8f',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
  },
  {
    id: 'ada2989a-350a-46cf-b044-8ca46a92736c',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
  },
  {
    id: '8772572d-ec3d-44c6-89ef-8813e70a4ae4',
    index: 4,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
  },
  {
    id: '011f0244-9dcd-4547-90c3-82e28e881666',
    index: 5,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
  },
  {
    id: '10072ad8-ae33-4739-8776-a91276b201b6',
    index: 6,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
  },
  {
    id: '5fd7626f-00d5-4a3b-be03-781b6edae655',
    index: 7,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
  },
];

export const cards = [
  {
    id: 'f123d6ac-3589-45b8-afdd-8b7268f00ab3',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: 'd94630ac-e4b0-4db7-be04-e3d24e375842',
  },
  {
    id: '1fde2788-37a1-42be-ad4d-fd5a15ab661d',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: 'd94630ac-e4b0-4db7-be04-e3d24e375842',
  },
  {
    id: '40bd96a3-6ced-4784-9bc3-2e300d09c278',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: 'd94630ac-e4b0-4db7-be04-e3d24e375842',
  },
  {
    id: '50306775-d353-4f1d-9449-daf7273f0bb9',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: 'd94630ac-e4b0-4db7-be04-e3d24e375842',
  },
  {
    id: '5ece1376-2464-4cae-a993-bd6662e5125e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: '54d1e7df-2657-429b-bcda-67cb3df463a1',
  },
  {
    id: 'f80f26e4-1d94-4ce0-9de6-1976b5c56bfc',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: '54d1e7df-2657-429b-bcda-67cb3df463a1',
  },
  {
    id: 'f4325287-3559-49fe-8b82-2a05791fe8d4',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: '54d1e7df-2657-429b-bcda-67cb3df463a1',
  },
  {
    id: '1df4d700-7a84-44f1-8854-6559aec01b2e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: '4b091a02-a184-4438-b051-257ac4e4474c',
  },
  {
    id: '053b7580-ccbf-4021-8a45-e6da76b69806',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: '4b091a02-a184-4438-b051-257ac4e4474c',
  },
  {
    id: '1d854edd-05c6-402f-bd67-5442c03ffa65',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: '4b091a02-a184-4438-b051-257ac4e4474c',
  },
  {
    id: '4b222322-6abf-44b4-8ebe-78325c8ae031',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: 'f97669ac-335f-42b3-a6f4-1ba24eead169',
  },
  {
    id: 'f9d0401e-2daa-470e-a30d-f1ff7931cdf2',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: 'f97669ac-335f-42b3-a6f4-1ba24eead169',
  },
  {
    id: 'b7bdaa4e-20fd-4ffd-be3f-4ab3d0bac565',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: 'c066014d-69c9-411f-852d-b6ab8b5e9473',
    boxId: 'f97669ac-335f-42b3-a6f4-1ba24eead169',
  },
  {
    id: '7e23c869-7834-4500-b9fd-6dbf24b23813',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: 'bbd6f079-756d-442f-b951-94006661c8f3',
  },
  {
    id: '97e905ff-05ea-4d2a-afe7-d85e28e39ef1',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: 'bbd6f079-756d-442f-b951-94006661c8f3',
  },
  {
    id: '834716bb-e0e0-417a-bc99-91773413cb33',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: 'bbd6f079-756d-442f-b951-94006661c8f3',
  },
  {
    id: 'f988f43e-453f-429f-82ca-692531b6aa7f',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: 'bbd6f079-756d-442f-b951-94006661c8f3',
  },
  {
    id: '750c2789-b3bc-43cf-b492-fde571eb2440',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: 'c5cdb380-e784-45ae-901b-2207d9f0056e',
  },
  {
    id: 'd638a7c6-b02f-4bbd-8e14-65c15046bd08',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: 'c5cdb380-e784-45ae-901b-2207d9f0056e',
  },
  {
    id: 'dcdbca68-ef56-4d9d-a16f-be7447dd40e5',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: '4e5b8843-b26f-4d9b-b5b8-f75103e3c301',
  },
  {
    id: '3d2523ce-e2e9-4080-8032-eadcb7194ee8',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: '4e5b8843-b26f-4d9b-b5b8-f75103e3c301',
  },
  {
    id: 'c2192799-73af-44c0-a803-d41323e2c586',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: '4e5b8843-b26f-4d9b-b5b8-f75103e3c301',
  },
  {
    id: '8e6d31d1-e0c3-4bcf-bb40-4af851f0668c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: '03e721b7-ea64-44a3-a7ba-2e86ae8c4427',
  },
  {
    id: '3c8d1c75-f34a-44a3-9a77-3e21ba61da76',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: '03e721b7-ea64-44a3-a7ba-2e86ae8c4427',
  },
  {
    id: 'ff55758e-2704-458b-94ee-ea9aec1d938e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: '1e926c97-8132-4653-8eff-9a4953eb13e4',
  },
  {
    id: '4cb2db79-0bad-4b68-bbb0-e67275911b2b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: '1e926c97-8132-4653-8eff-9a4953eb13e4',
  },
  {
    id: '545df722-d5be-4fa3-b66c-7bb7808e1fe8',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '038f6f60-1034-46a1-b9c4-427aece3333f',
    boxId: '1e926c97-8132-4653-8eff-9a4953eb13e4',
  },
  {
    id: 'ccb16d00-5666-4187-80dc-18996155ef16',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '24ae3435-85a9-4e91-a423-f241b8508010',
  },
  {
    id: 'e81f0874-9424-4768-b5d5-75352b695c45',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '24ae3435-85a9-4e91-a423-f241b8508010',
  },
  {
    id: '6b10dae4-9684-4379-91fb-8ba8a2683111',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '24ae3435-85a9-4e91-a423-f241b8508010',
  },
  {
    id: 'b3d27601-94cf-4681-be7b-b250d9cf980b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '24ae3435-85a9-4e91-a423-f241b8508010',
  },
  {
    id: 'd1401ef3-735c-425d-b761-3ab0d2ba6dc7',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: 'a5e41a45-8d96-442e-8507-eea45492c607',
  },
  {
    id: '1f36d39c-695f-4f58-a02a-6e61ed976249',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: 'a5e41a45-8d96-442e-8507-eea45492c607',
  },
  {
    id: '810f85fa-4223-46ea-a9bf-7c3b34a7c156',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: 'a5e41a45-8d96-442e-8507-eea45492c607',
  },
  {
    id: 'b8b08d93-fc25-45bb-93b8-209620f0bc30',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '272e42fb-46ea-40d9-8055-fa28997dcb8f',
  },
  {
    id: '1b47debb-6436-4224-9f45-9c7500b7a697',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '272e42fb-46ea-40d9-8055-fa28997dcb8f',
  },
  {
    id: '748cf49d-c650-4fd7-8ef4-8b31b5941b22',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '272e42fb-46ea-40d9-8055-fa28997dcb8f',
  },
  {
    id: '4bbe89c4-74bb-432c-9238-5910b0b18430',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '272e42fb-46ea-40d9-8055-fa28997dcb8f',
  },
  {
    id: 'e099b2cb-7bb2-4264-a65c-f8c5db9f613b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: 'ada2989a-350a-46cf-b044-8ca46a92736c',
  },
  {
    id: '16c1d029-b1a6-4e94-96e7-caf7f5aedf03',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: 'ada2989a-350a-46cf-b044-8ca46a92736c',
  },
  {
    id: '5ff0294f-38b3-40b8-8ed1-194a9b4599e8',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: 'ada2989a-350a-46cf-b044-8ca46a92736c',
  },
  {
    id: '57900404-0a4b-432b-b831-1d8546ed8bcb',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: 'ada2989a-350a-46cf-b044-8ca46a92736c',
  },
  {
    id: '96aa4acc-626d-461c-8267-d5b67cea4043',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '8772572d-ec3d-44c6-89ef-8813e70a4ae4',
  },
  {
    id: 'dcd2c8b3-20ca-42fd-b77f-461eec97cd55',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '8772572d-ec3d-44c6-89ef-8813e70a4ae4',
  },
  {
    id: 'a058cc4c-028b-4fca-a53a-4cb293321cb8',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '011f0244-9dcd-4547-90c3-82e28e881666',
  },
  {
    id: '2f1f0ff8-b68b-4c5f-b29b-f570b27c9e3a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '011f0244-9dcd-4547-90c3-82e28e881666',
  },
  {
    id: '8a316bd5-7777-40a0-b2c9-f5ac0dc35104',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '011f0244-9dcd-4547-90c3-82e28e881666',
  },
  {
    id: '4bfa70a8-e926-4660-bfbf-daf314563d66',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '10072ad8-ae33-4739-8776-a91276b201b6',
  },
  {
    id: '0984c434-5813-43a5-8d76-d36b3ea07573',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '10072ad8-ae33-4739-8776-a91276b201b6',
  },
  {
    id: '34a1a61c-296c-4e1a-a88a-4ead2a226efa',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '5fd7626f-00d5-4a3b-be03-781b6edae655',
  },
  {
    id: '5d0ff230-421a-44f9-b253-8b2ac65dd90e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '5fd7626f-00d5-4a3b-be03-781b6edae655',
  },
  {
    id: 'db8d983e-5d91-4fa7-8c9b-08cdce77a914',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '5fd7626f-00d5-4a3b-be03-781b6edae655',
  },
  {
    id: 'a43fea08-fbbf-4d94-93b3-e860036f9b6d',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:51:39.435Z',
    updatedAt: '2023-11-13T00:51:39.435Z',
    userId: '2e8a5424-8483-4fcb-866a-57461a6a4f09',
    shelfId: '85605016-41a5-496f-9211-5d94bd3b9047',
    boxId: '5fd7626f-00d5-4a3b-be03-781b6edae655',
  },
];
