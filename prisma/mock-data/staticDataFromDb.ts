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
    id: 'ab1c05ab-4ccf-4051-ba8c-a003b5592227',
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$UXxzI6WREDSiw9FX8KZ4reTvUbpQUYKELe6H2j29Nyb4kNa9W7..2',
  },
  {
    id: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '$2a$10$UXxzI6WREDSiw9FX8KZ4reTvUbpQUYKELe6H2j29Nyb4kNa9W7..2',
  },
];

export const shelves = [
  {
    id: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    title: 'Shelf A',
    index: 0,
    isCollapsed: true,
    createdAt: '2023-11-12T23:38:32.595Z',
    updatedAt: '2023-11-12T23:38:32.595Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
  },
  {
    id: '70426e56-c033-4528-99d7-e8cdf96b4353',
    title: 'Shelf B',
    index: 1,
    isCollapsed: true,
    createdAt: '2023-11-12T23:38:32.595Z',
    updatedAt: '2023-11-12T23:38:32.595Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
  },
  {
    id: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    title: 'Shelf C',
    index: 2,
    isCollapsed: true,
    createdAt: '2023-11-12T23:38:32.595Z',
    updatedAt: '2023-11-12T23:38:32.595Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
  },
];

export const boxes = [
  {
    id: '137a3e70-abfe-49be-ad78-73e620e280f2',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
  },
  {
    id: '374e3725-e76d-45a8-918e-470cb2edad4b',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
  },
  {
    id: 'ca86be71-706e-4466-ad10-3fe1ba083ea1',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
  },
  {
    id: 'b95ece60-bdf3-4d68-8917-08b79cdb45d6',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
  },
  {
    id: '8bf03b1e-9923-4f1d-b5dd-c271c8f05a95',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
  },
  {
    id: 'b702740d-4937-45d2-a712-3ddb24cac68c',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
  },
  {
    id: '08ab257e-61f5-4f0c-a566-244507c9d20a',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
  },
  {
    id: 'd0f6c9df-b16a-4cfb-9706-6cde6fba2bc9',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
  },
  {
    id: '357a3e1e-f01a-44c9-9732-d15bb84b0925',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
  },
  {
    id: 'c28fe756-63de-4022-9cce-9ea6a24899dc',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
  },
  {
    id: '1ac73022-e9a4-4232-a029-e16496067624',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
  },
  {
    id: '84752d86-c2b1-4377-93e4-322ae3008fa4',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
  },
];

export const cards = [
  {
    id: 'a1a19061-e270-40fc-853b-e024d4229fb3',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: '137a3e70-abfe-49be-ad78-73e620e280f2',
  },
  {
    id: 'fa762cab-8687-4c52-8b1f-ddd55f952ab3',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: '137a3e70-abfe-49be-ad78-73e620e280f2',
  },
  {
    id: 'd1b1c950-87f0-48f4-9c34-d326499ddf6a',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: '137a3e70-abfe-49be-ad78-73e620e280f2',
  },
  {
    id: 'a8794b8e-1e41-4cec-86eb-e4a2336502a7',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: '137a3e70-abfe-49be-ad78-73e620e280f2',
  },
  {
    id: '2c06915a-6bef-488b-a68d-33f59df05e33',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: '374e3725-e76d-45a8-918e-470cb2edad4b',
  },
  {
    id: '0baeb6cf-0e8c-48f6-82b7-66ff3abc5a8b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: '374e3725-e76d-45a8-918e-470cb2edad4b',
  },
  {
    id: 'fa7c5aa9-3902-47c0-9575-72e2840f7a96',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: 'ca86be71-706e-4466-ad10-3fe1ba083ea1',
  },
  {
    id: '988fec85-6b71-46c3-a55e-2d072ba3c78a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: 'ca86be71-706e-4466-ad10-3fe1ba083ea1',
  },
  {
    id: 'f2dd90a4-725a-428d-ab4d-9b1ea52e482a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: 'b95ece60-bdf3-4d68-8917-08b79cdb45d6',
  },
  {
    id: '2a2663d2-cb81-4693-a641-14acac5e19b8',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: 'b95ece60-bdf3-4d68-8917-08b79cdb45d6',
  },
  {
    id: 'f04e7a11-df4f-4252-a253-9b4ceffab9c2',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: 'b95ece60-bdf3-4d68-8917-08b79cdb45d6',
  },
  {
    id: 'ff394c57-c742-4b78-b2e4-6169294339a8',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: 'd37e9f6b-bb47-4544-a13e-e32b86bf4054',
    boxId: 'b95ece60-bdf3-4d68-8917-08b79cdb45d6',
  },
  {
    id: '6c6ae172-d896-4945-8385-f35b12345034',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: '8bf03b1e-9923-4f1d-b5dd-c271c8f05a95',
  },
  {
    id: 'b25dee5e-69e1-4c72-8b95-96a07889ad58',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: '8bf03b1e-9923-4f1d-b5dd-c271c8f05a95',
  },
  {
    id: '4142ab2b-cb0f-4150-8924-3a44beb83416',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: '8bf03b1e-9923-4f1d-b5dd-c271c8f05a95',
  },
  {
    id: 'b0dd19c9-bd81-4980-b3d9-3ac341c026ef',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: '8bf03b1e-9923-4f1d-b5dd-c271c8f05a95',
  },
  {
    id: 'c3bccf8f-ad9e-44bf-a1aa-2e99b2584da2',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: 'b702740d-4937-45d2-a712-3ddb24cac68c',
  },
  {
    id: '015d6c83-7081-4a9d-95b6-7e7a93ed99f1',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: 'b702740d-4937-45d2-a712-3ddb24cac68c',
  },
  {
    id: '0e02d4de-bf39-4b15-9aeb-b8b9a3eda3d6',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: 'b702740d-4937-45d2-a712-3ddb24cac68c',
  },
  {
    id: '555922e5-c400-4356-a7bc-43a9c018be0c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: 'b702740d-4937-45d2-a712-3ddb24cac68c',
  },
  {
    id: 'cf81ee0b-d58f-4d1e-ac72-4f0426242b4e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: '08ab257e-61f5-4f0c-a566-244507c9d20a',
  },
  {
    id: 'e04b7ea5-1a96-4b3c-a8ab-fa18ba75cd39',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: '08ab257e-61f5-4f0c-a566-244507c9d20a',
  },
  {
    id: '5735ed86-35dd-45d3-b863-5e367e43ed1c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: '08ab257e-61f5-4f0c-a566-244507c9d20a',
  },
  {
    id: '65309c60-67cc-4949-87c8-84548516be46',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: '08ab257e-61f5-4f0c-a566-244507c9d20a',
  },
  {
    id: '4d258afe-c0bc-4045-ac0d-e2adcc6303ae',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: 'd0f6c9df-b16a-4cfb-9706-6cde6fba2bc9',
  },
  {
    id: '0cafaf14-9eba-498a-a256-bcf3ebeb97bc',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: 'd0f6c9df-b16a-4cfb-9706-6cde6fba2bc9',
  },
  {
    id: 'fd1a385c-ce10-4cdd-ac33-01fe6434b9b1',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: 'd0f6c9df-b16a-4cfb-9706-6cde6fba2bc9',
  },
  {
    id: '909ef894-32b7-4ec0-8f78-6e2732a259d1',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '70426e56-c033-4528-99d7-e8cdf96b4353',
    boxId: 'd0f6c9df-b16a-4cfb-9706-6cde6fba2bc9',
  },
  {
    id: 'c4220514-9be5-4ad1-8813-143f090fb9ff',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: '357a3e1e-f01a-44c9-9732-d15bb84b0925',
  },
  {
    id: '09a5517b-58e7-49f7-b734-5d278c8c4e5e',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: '357a3e1e-f01a-44c9-9732-d15bb84b0925',
  },
  {
    id: 'cad4c66b-fae6-4000-8999-3f5f9f282b8f',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: '357a3e1e-f01a-44c9-9732-d15bb84b0925',
  },
  {
    id: '13af9a3f-c79f-4cd1-9367-09e5ec6ba136',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: '357a3e1e-f01a-44c9-9732-d15bb84b0925',
  },
  {
    id: 'ff1911f1-b56b-41cb-bc2c-ee6615b3246a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: 'c28fe756-63de-4022-9cce-9ea6a24899dc',
  },
  {
    id: '08bf84fd-e8fa-4176-bd82-942496539247',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: 'c28fe756-63de-4022-9cce-9ea6a24899dc',
  },
  {
    id: 'd6a35382-cb76-4559-b7b3-84e34abf63f3',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: '1ac73022-e9a4-4232-a029-e16496067624',
  },
  {
    id: '7d331dc8-d9f2-47c4-b1bf-bff0d233abde',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: '1ac73022-e9a4-4232-a029-e16496067624',
  },
  {
    id: 'e47429d3-29f8-4351-815e-b280b467e3d3',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: '1ac73022-e9a4-4232-a029-e16496067624',
  },
  {
    id: '57b55413-c207-40e4-b2a0-371abea5623b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: '84752d86-c2b1-4377-93e4-322ae3008fa4',
  },
  {
    id: '2420d179-9307-4dda-9a3d-3df81768fec8',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: '84752d86-c2b1-4377-93e4-322ae3008fa4',
  },
  {
    id: '87bb1037-3b06-43a6-be8e-93eb1548733a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T23:38:32.620Z',
    updatedAt: '2023-11-12T23:38:32.620Z',
    userId: '779a3591-6fb2-4f50-bf4c-1d34a0769bf7',
    shelfId: '7b80744f-0c43-411f-9388-845dc5f96a0c',
    boxId: '84752d86-c2b1-4377-93e4-322ae3008fa4',
  },
];
