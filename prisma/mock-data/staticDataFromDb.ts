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
    id: '4bd14cfb-abbb-44ae-9c50-09a188342ded',
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$GUlkUTOxHB6S6I5Aui4qw./95FrjZ7L/kb45r5a9ztFDD5MZ3GDMC',
  },
  {
    id: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '$2a$10$GUlkUTOxHB6S6I5Aui4qw./95FrjZ7L/kb45r5a9ztFDD5MZ3GDMC',
  },
];

export const shelves = [
  {
    id: '65ebb893-be68-4025-8ebd-7c9100383c90',
    title: 'Shelf A',
    index: 0,
    isCollapsed: true,
    createdAt: '2023-11-12T22:53:06.224Z',
    updatedAt: '2023-11-12T22:53:06.224Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
  },
  {
    id: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    title: 'Shelf B',
    index: 1,
    isCollapsed: true,
    createdAt: '2023-11-12T22:53:06.224Z',
    updatedAt: '2023-11-12T22:53:06.224Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
  },
  {
    id: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    title: 'Shelf C',
    index: 2,
    isCollapsed: true,
    createdAt: '2023-11-12T22:53:06.224Z',
    updatedAt: '2023-11-12T22:53:06.224Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
  },
];

export const boxes = [
  {
    id: 'bb9f0d8c-77f1-4484-a57e-eca4378dc018',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
  },
  {
    id: 'aaa7f30b-14d5-45d3-abb5-6bedf2c6eddf',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
  },
  {
    id: '22ab68ff-1897-4538-a560-8af2222d1cf3',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
  },
  {
    id: 'e348a329-12a8-41a4-aae8-f9a0884c632f',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
  },
  {
    id: '3d041fd5-2c16-47fa-a989-85aacac81733',
    index: 4,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
  },
  {
    id: '1f10331e-781e-4c43-b6d6-fe71205e0c7e',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
  },
  {
    id: '1691c22f-5242-4149-9250-c1508c273856',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
  },
  {
    id: 'aebaf9ec-8ec4-4931-a41f-95eeba26ced4',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
  },
  {
    id: '408afa28-d1bc-4230-a365-b8180f190e0c',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
  },
  {
    id: 'cac473ba-1671-44ef-aff6-03c25924f146',
    index: 4,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
  },
  {
    id: '8e7fb3a5-88bb-448d-a0b6-de6c2a640b5c',
    index: 5,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
  },
  {
    id: '0c7827d8-f14d-4278-8653-c4d09b3e4de4',
    index: 6,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
  },
  {
    id: '958764be-4248-4c2d-ba31-74d86ad56171',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
  },
  {
    id: 'd1b944c8-5737-4db2-bb25-24f7591082af',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
  },
  {
    id: 'f3d2c96d-f24a-4743-bab8-21aa96d5cdc5',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
  },
  {
    id: 'ea41dad8-7109-4ae3-a31e-fa42b4c30e1b',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
  },
  {
    id: 'dc42a5ff-3a11-4e05-b3ff-167c82d82035',
    index: 4,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
  },
  {
    id: '507dcaae-18ea-42b2-9076-701c69c0803c',
    index: 5,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
  },
  {
    id: '38082569-914d-4fa1-bdcf-8a16bd29f71a',
    index: 6,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 0,
    },
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
  },
];

export const cards = [
  {
    id: '6f27add4-d450-4e15-946c-56dc9e9ee805',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'bb9f0d8c-77f1-4484-a57e-eca4378dc018',
  },
  {
    id: '743a57d0-9a1b-4dbb-8aeb-d73c7e59e961',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'bb9f0d8c-77f1-4484-a57e-eca4378dc018',
  },
  {
    id: 'a77fe0f1-25e1-4dc4-a137-7a0e34e9cd20',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'bb9f0d8c-77f1-4484-a57e-eca4378dc018',
  },
  {
    id: '78c76246-d4cb-4c8a-b616-a0ef78b2374e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'bb9f0d8c-77f1-4484-a57e-eca4378dc018',
  },
  {
    id: '81cf7658-6f3a-4fd6-92b4-a3227fe31dba',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'aaa7f30b-14d5-45d3-abb5-6bedf2c6eddf',
  },
  {
    id: 'c41cc754-342c-4463-bd50-91ccb3dbc5b5',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'aaa7f30b-14d5-45d3-abb5-6bedf2c6eddf',
  },
  {
    id: 'c8cd58d4-d2de-4657-a588-ad023e424b40',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'aaa7f30b-14d5-45d3-abb5-6bedf2c6eddf',
  },
  {
    id: '0c50a147-1f9b-429f-9130-766be9877723',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'aaa7f30b-14d5-45d3-abb5-6bedf2c6eddf',
  },
  {
    id: 'b35cc96a-4141-4d0b-933b-2eca231c1a95',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: '22ab68ff-1897-4538-a560-8af2222d1cf3',
  },
  {
    id: '2dc4879d-6c70-4379-bacb-96cbb324f825',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: '22ab68ff-1897-4538-a560-8af2222d1cf3',
  },
  {
    id: '0ad20730-043b-41ef-9aee-f3fce62dc553',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: '22ab68ff-1897-4538-a560-8af2222d1cf3',
  },
  {
    id: '45393ff2-519c-4693-9253-6244806c468a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: '22ab68ff-1897-4538-a560-8af2222d1cf3',
  },
  {
    id: '2d904d57-10e7-4471-a778-c11e8887f891',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'e348a329-12a8-41a4-aae8-f9a0884c632f',
  },
  {
    id: '00ab66d1-7b91-4253-963e-736c530f1706',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'e348a329-12a8-41a4-aae8-f9a0884c632f',
  },
  {
    id: '6c163907-a00b-4a84-9f01-6f206f717bd9',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'e348a329-12a8-41a4-aae8-f9a0884c632f',
  },
  {
    id: 'ad8aa98f-38f9-4fc1-9483-75d30af75068',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: 'e348a329-12a8-41a4-aae8-f9a0884c632f',
  },
  {
    id: 'de042282-2e9a-44cf-968c-80a91d0acb2c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: '3d041fd5-2c16-47fa-a989-85aacac81733',
  },
  {
    id: '613c6cb1-3efd-4e6e-908e-1710c8d114de',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: '3d041fd5-2c16-47fa-a989-85aacac81733',
  },
  {
    id: '01dde771-1130-4844-8295-2d2622e9f5c2',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '65ebb893-be68-4025-8ebd-7c9100383c90',
    boxId: '3d041fd5-2c16-47fa-a989-85aacac81733',
  },
  {
    id: '7a86aa31-9b2c-41de-8872-53b5e491bb1c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '1f10331e-781e-4c43-b6d6-fe71205e0c7e',
  },
  {
    id: '7e1afc5d-9f98-42a7-9c7c-f28794463534',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '1f10331e-781e-4c43-b6d6-fe71205e0c7e',
  },
  {
    id: '655aace2-3b8c-46ba-bcc5-81022334cfc0',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '1f10331e-781e-4c43-b6d6-fe71205e0c7e',
  },
  {
    id: 'ab95a644-813a-49ff-a85b-2cb2fb7b2982',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '1f10331e-781e-4c43-b6d6-fe71205e0c7e',
  },
  {
    id: '175a30b0-79c4-45c1-b753-53ca92bdc775',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '1691c22f-5242-4149-9250-c1508c273856',
  },
  {
    id: '22500dbe-63e8-4c6e-9f77-f004f6fcde3d',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '1691c22f-5242-4149-9250-c1508c273856',
  },
  {
    id: '069edeab-78e9-4b8b-afe6-a37c10567019',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: 'aebaf9ec-8ec4-4931-a41f-95eeba26ced4',
  },
  {
    id: 'ba463e81-4763-41b1-9d16-57c9346ddfb2',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: 'aebaf9ec-8ec4-4931-a41f-95eeba26ced4',
  },
  {
    id: '4540befc-f35d-4337-9476-d27c7d4ffe24',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: 'aebaf9ec-8ec4-4931-a41f-95eeba26ced4',
  },
  {
    id: 'd565ed1d-e37f-4422-8c43-5e7675442d0d',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: 'aebaf9ec-8ec4-4931-a41f-95eeba26ced4',
  },
  {
    id: '2f52f7c0-de20-4270-a257-9e64b884bdab',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '408afa28-d1bc-4230-a365-b8180f190e0c',
  },
  {
    id: '8edb8463-fcf0-4acf-a889-75dbb8777f93',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '408afa28-d1bc-4230-a365-b8180f190e0c',
  },
  {
    id: 'f62731c0-d47c-493a-b7e4-15c7b782e2a5',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '408afa28-d1bc-4230-a365-b8180f190e0c',
  },
  {
    id: '625ac22b-a849-43dc-9b49-c44fad7f2a28',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: 'cac473ba-1671-44ef-aff6-03c25924f146',
  },
  {
    id: 'f9a9d237-8986-46f3-b4c2-3e6991a050ab',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: 'cac473ba-1671-44ef-aff6-03c25924f146',
  },
  {
    id: '444e0b97-28a3-4316-a6e5-fc04634a675f',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '8e7fb3a5-88bb-448d-a0b6-de6c2a640b5c',
  },
  {
    id: 'bd8fc6ce-ec43-4f4e-90c1-0f401fcc91ef',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '8e7fb3a5-88bb-448d-a0b6-de6c2a640b5c',
  },
  {
    id: 'c7779e68-f537-45f9-b258-1a9d48a496ae',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '8e7fb3a5-88bb-448d-a0b6-de6c2a640b5c',
  },
  {
    id: 'b4867844-6d7e-4fdd-90b9-0ec61c0b2cd7',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '8e7fb3a5-88bb-448d-a0b6-de6c2a640b5c',
  },
  {
    id: 'e795ce77-7168-43bc-a0ba-2177d926966b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '0c7827d8-f14d-4278-8653-c4d09b3e4de4',
  },
  {
    id: '9dc953e0-4d4c-4f88-8bf5-2ff3fe211d73',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '0c7827d8-f14d-4278-8653-c4d09b3e4de4',
  },
  {
    id: '68f3636b-4b20-4dd0-b9dd-8fb490644aa5',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '0c7827d8-f14d-4278-8653-c4d09b3e4de4',
  },
  {
    id: '265f80cf-59d4-477e-8b1c-b42b5cf40a96',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: 'a3b6efa8-014b-4e74-a2f7-853147f992f5',
    boxId: '0c7827d8-f14d-4278-8653-c4d09b3e4de4',
  },
  {
    id: 'd1c77512-54ea-49c5-8634-ac42839864da',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '958764be-4248-4c2d-ba31-74d86ad56171',
  },
  {
    id: 'cc6efb9e-f3e7-4cf3-9fb7-fc8e8632f82a',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '958764be-4248-4c2d-ba31-74d86ad56171',
  },
  {
    id: '83e66030-ef6d-4f65-8f59-366441d24867',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '958764be-4248-4c2d-ba31-74d86ad56171',
  },
  {
    id: '51edb26d-601b-4644-a07e-ca96903cdb2b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '958764be-4248-4c2d-ba31-74d86ad56171',
  },
  {
    id: '22340017-77f1-41b2-beb8-74d7bade737a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'd1b944c8-5737-4db2-bb25-24f7591082af',
  },
  {
    id: '07f68005-29be-4edf-8329-3672e07e10de',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'd1b944c8-5737-4db2-bb25-24f7591082af',
  },
  {
    id: 'a48c5124-cb52-48ee-b98a-be78171dccfc',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'f3d2c96d-f24a-4743-bab8-21aa96d5cdc5',
  },
  {
    id: '9ff232a9-1fb0-4f67-b000-c32c79aefdf7',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'f3d2c96d-f24a-4743-bab8-21aa96d5cdc5',
  },
  {
    id: '8bf5bc3f-ada4-4881-960d-773dc9fb09d1',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'ea41dad8-7109-4ae3-a31e-fa42b4c30e1b',
  },
  {
    id: '632af4ec-60e4-436a-a3ca-9d5763cf3507',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'ea41dad8-7109-4ae3-a31e-fa42b4c30e1b',
  },
  {
    id: 'a2bd852d-f724-41e0-8d9d-ff5372e2906c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'ea41dad8-7109-4ae3-a31e-fa42b4c30e1b',
  },
  {
    id: 'ae37d1d0-5ec7-4169-87ef-3eb50361c370',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'ea41dad8-7109-4ae3-a31e-fa42b4c30e1b',
  },
  {
    id: '1b1901c3-d920-44df-b0c8-f9a631915ada',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'dc42a5ff-3a11-4e05-b3ff-167c82d82035',
  },
  {
    id: '127c0003-39c7-4320-8b41-c371ac462ea3',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'dc42a5ff-3a11-4e05-b3ff-167c82d82035',
  },
  {
    id: 'c6d8b58b-082b-413f-929c-0e5aa55f7e6b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: 'dc42a5ff-3a11-4e05-b3ff-167c82d82035',
  },
  {
    id: 'a46842e5-14ac-4e19-ac0c-0d63b17d8e85',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '507dcaae-18ea-42b2-9076-701c69c0803c',
  },
  {
    id: '2756f8e4-9e45-4a7a-b677-05ccf2124ca1',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '507dcaae-18ea-42b2-9076-701c69c0803c',
  },
  {
    id: '93aa6b7a-d4a4-4a44-989c-0c81e66ce19b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '507dcaae-18ea-42b2-9076-701c69c0803c',
  },
  {
    id: '668e3eae-9728-4b79-a2cb-435c3a29959e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '507dcaae-18ea-42b2-9076-701c69c0803c',
  },
  {
    id: 'f11e0db9-42f1-4bca-989a-334b5d882b66',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '38082569-914d-4fa1-bdcf-8a16bd29f71a',
  },
  {
    id: 'e2e07d00-f741-41b9-9987-497d86618dc7',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '38082569-914d-4fa1-bdcf-8a16bd29f71a',
  },
  {
    id: 'd75d4e7d-fec9-47d5-a438-d53c77466e13',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T22:53:06.305Z',
    updatedAt: '2023-11-12T22:53:06.305Z',
    userId: 'de12dbd1-bfdb-4b0e-b31d-76644b91110b',
    shelfId: '4acb9255-63ee-4740-bbd6-08c9cbe2ffb5',
    boxId: '38082569-914d-4fa1-bdcf-8a16bd29f71a',
  },
];
