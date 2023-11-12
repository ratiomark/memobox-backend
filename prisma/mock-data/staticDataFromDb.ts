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
    id: 'b7f513a5-20b0-484d-aefb-d6754af43ede',
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$Wjky2joP3Ad/rrXDNnrHuOdN/bHT2Qqf0S5Qvsr/2vTeb7B9RDIly',
  },
  {
    id: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '$2a$10$Wjky2joP3Ad/rrXDNnrHuOdN/bHT2Qqf0S5Qvsr/2vTeb7B9RDIly',
  },
];

export const shelves = [
  {
    id: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    title: 'Shelf A',
    index: 0,
    isCollapsed: true,
    createdAt: '2023-11-12T00:29:59.637Z',
    updatedAt: '2023-11-12T00:29:59.637Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
  },
  {
    id: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    title: 'Shelf B',
    index: 1,
    isCollapsed: true,
    createdAt: '2023-11-12T00:29:59.637Z',
    updatedAt: '2023-11-12T00:29:59.637Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
  },
  {
    id: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    title: 'Shelf C',
    index: 2,
    isCollapsed: true,
    createdAt: '2023-11-12T00:29:59.637Z',
    updatedAt: '2023-11-12T00:29:59.637Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
  },
];

export const boxes = [
  {
    id: '8593a405-4f5c-4b5a-b55e-e803722d44ab',
    index: 0,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
  },
  {
    id: '9cf39200-3c94-41d3-862a-c6569ecd057e',
    index: 1,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
  },
  {
    id: '62c1c7b5-36b0-4fa4-8cdc-19e2a9d1cf49',
    index: 2,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
  },
  {
    id: '0fe06801-ced6-4ceb-a262-b28e9ae5b0f9',
    index: 3,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
  },
  {
    id: '3ca86290-c42f-47a3-afb7-855b759fa6d4',
    index: 0,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
  },
  {
    id: 'f5209731-8909-4da2-bc53-fb40f4d62ccb',
    index: 1,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
  },
  {
    id: '5c46bea2-186c-412e-b871-6c8b524bda5e',
    index: 2,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
  },
  {
    id: 'e840cd86-d7e7-446d-9acd-4ca8ec583efb',
    index: 3,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
  },
  {
    id: '43b5d17b-15ff-42a1-837b-e12fa6ffa3e1',
    index: 4,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
  },
  {
    id: 'a57e1746-0ea1-414a-976f-bd9efbbffe8d',
    index: 5,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
  },
  {
    id: '31ac2362-626e-4be2-b7c0-29782ccde015',
    index: 6,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
  },
  {
    id: '9731c371-ec29-40db-918c-554c847f1e94',
    index: 0,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
  },
  {
    id: 'e96ae639-82f1-464a-9899-529368b73a89',
    index: 1,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
  },
  {
    id: 'a6473676-8740-4b3e-aece-78fe50afe10d',
    index: 2,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
  },
  {
    id: '803c5571-f944-4e57-9382-a5eea8f8f9f0',
    index: 3,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
  },
  {
    id: '4cd9a1f9-c159-46d9-975c-1c30645f87e1',
    index: 4,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
  },
  {
    id: 'f4f665a7-4e12-4f57-93bf-609cc2bc0cc3',
    index: 5,
    timing: "{'minutes': 0,'hours': 0,'days': 0,'weeks': 0,'months': 0}",
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
  },
];

export const cards = [
  {
    id: 'c39c33cd-1e52-46a1-813c-1525ac093e6e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '8593a405-4f5c-4b5a-b55e-e803722d44ab',
  },
  {
    id: '8b5e092e-e204-4a10-945c-4abaa7a51d42',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '8593a405-4f5c-4b5a-b55e-e803722d44ab',
  },
  {
    id: '7f41845d-d944-47cb-8cfc-487072c178a7',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '8593a405-4f5c-4b5a-b55e-e803722d44ab',
  },
  {
    id: '0c64400c-3d24-449c-b148-681e8b375c7a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '8593a405-4f5c-4b5a-b55e-e803722d44ab',
  },
  {
    id: 'a9a2c688-0a4c-49f1-918e-4e441c8db064',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '9cf39200-3c94-41d3-862a-c6569ecd057e',
  },
  {
    id: '7e214bbb-d880-407f-9c10-030600caf77b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '9cf39200-3c94-41d3-862a-c6569ecd057e',
  },
  {
    id: 'dcf82ad4-b6cb-434b-8f9e-2740e88ed4fa',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '9cf39200-3c94-41d3-862a-c6569ecd057e',
  },
  {
    id: 'afadf4ee-a0fe-4b27-a195-1df134d2977c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '62c1c7b5-36b0-4fa4-8cdc-19e2a9d1cf49',
  },
  {
    id: 'fdf50e54-1100-42d2-afaa-715955286528',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '62c1c7b5-36b0-4fa4-8cdc-19e2a9d1cf49',
  },
  {
    id: '7036fc9f-ecec-4a78-b81c-f2cc03377d46',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '62c1c7b5-36b0-4fa4-8cdc-19e2a9d1cf49',
  },
  {
    id: 'a0113d8c-17ce-452f-b385-1dbba689b295',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '62c1c7b5-36b0-4fa4-8cdc-19e2a9d1cf49',
  },
  {
    id: 'f79af0d1-dc12-44e8-aa0a-3ee2abc900f6',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '0fe06801-ced6-4ceb-a262-b28e9ae5b0f9',
  },
  {
    id: '0b92aeb5-43d1-4980-933e-2a0ffc995b1a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '0fe06801-ced6-4ceb-a262-b28e9ae5b0f9',
  },
  {
    id: '313aced1-cd74-4d6f-8ee9-a4befbaafb7e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '4c4d8de6-e542-4541-a67e-6a3919fed455',
    boxId: '0fe06801-ced6-4ceb-a262-b28e9ae5b0f9',
  },
  {
    id: 'a9d7e46d-c733-4145-bf74-2197f7904ad6',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '3ca86290-c42f-47a3-afb7-855b759fa6d4',
  },
  {
    id: '13845e6e-b416-4f20-8723-6b6e8dc2fce8',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '3ca86290-c42f-47a3-afb7-855b759fa6d4',
  },
  {
    id: '19174e81-ae81-43a0-b4ed-deb3e930484a',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '3ca86290-c42f-47a3-afb7-855b759fa6d4',
  },
  {
    id: '30e84e61-d819-41bd-b6e8-83fbf8afc2ce',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '3ca86290-c42f-47a3-afb7-855b759fa6d4',
  },
  {
    id: 'c4ebf898-07f8-4c0d-8d7c-6ce9315bc21f',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: 'f5209731-8909-4da2-bc53-fb40f4d62ccb',
  },
  {
    id: 'c9fad411-95d1-4fcf-9dc3-1619ca5fa21a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: 'f5209731-8909-4da2-bc53-fb40f4d62ccb',
  },
  {
    id: '486e9695-46d1-4e80-9c5f-f3c0eef876ed',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: 'f5209731-8909-4da2-bc53-fb40f4d62ccb',
  },
  {
    id: 'f7071d54-50ea-4983-9ec8-35de25c8bb73',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: 'f5209731-8909-4da2-bc53-fb40f4d62ccb',
  },
  {
    id: 'a0b4522b-cd23-428a-bd3e-b9cbcc9c3579',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '5c46bea2-186c-412e-b871-6c8b524bda5e',
  },
  {
    id: '82f175bf-abbb-42e9-9e51-34cc6fa3cc76',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '5c46bea2-186c-412e-b871-6c8b524bda5e',
  },
  {
    id: 'cbd8f61e-7797-4312-b11d-5d6cc835e335',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '5c46bea2-186c-412e-b871-6c8b524bda5e',
  },
  {
    id: '6451b5d0-ab32-449b-a6d8-a9c4e4fe9774',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '5c46bea2-186c-412e-b871-6c8b524bda5e',
  },
  {
    id: '7c8baedf-1f73-419f-8958-f24c409bc3ed',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: 'e840cd86-d7e7-446d-9acd-4ca8ec583efb',
  },
  {
    id: '3ed0ac94-cd2a-4b86-85f2-49a864920c43',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: 'e840cd86-d7e7-446d-9acd-4ca8ec583efb',
  },
  {
    id: 'd45ff6d2-e200-4fa3-a652-c13b9d3681cf',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '43b5d17b-15ff-42a1-837b-e12fa6ffa3e1',
  },
  {
    id: '9033a308-3887-4843-a66a-30b462c6d769',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '43b5d17b-15ff-42a1-837b-e12fa6ffa3e1',
  },
  {
    id: '5f80efb8-ceec-48dd-9935-852a03f578fb',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '43b5d17b-15ff-42a1-837b-e12fa6ffa3e1',
  },
  {
    id: '8f46fba9-1503-4f36-b82f-8c7914f26736',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '43b5d17b-15ff-42a1-837b-e12fa6ffa3e1',
  },
  {
    id: '5d5b25bd-0a4a-46e5-b91c-4dc6c2b7f608',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: 'a57e1746-0ea1-414a-976f-bd9efbbffe8d',
  },
  {
    id: '59182db9-3d60-419e-9339-373cb3894f21',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: 'a57e1746-0ea1-414a-976f-bd9efbbffe8d',
  },
  {
    id: '1760b78f-d9ef-45d0-95ba-eb29818118c2',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: 'a57e1746-0ea1-414a-976f-bd9efbbffe8d',
  },
  {
    id: 'c61d6897-230c-416f-a98f-caa857706673',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '31ac2362-626e-4be2-b7c0-29782ccde015',
  },
  {
    id: '80eb778e-fda5-48d6-ae90-1ad2eaaa9e7b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '31ac2362-626e-4be2-b7c0-29782ccde015',
  },
  {
    id: '0c967196-460c-41f9-a6d0-5b1c91f9d22a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: '0f89ee3e-d3f8-4403-ad76-e04b596bd555',
    boxId: '31ac2362-626e-4be2-b7c0-29782ccde015',
  },
  {
    id: 'dc136ab8-136e-49b2-86c1-43e6cdec8f80',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '9731c371-ec29-40db-918c-554c847f1e94',
  },
  {
    id: '7b158453-3dcc-4885-be75-5be93fcb57d2',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '803c5571-f944-4e57-9382-a5eea8f8f9f0',
  },
  {
    id: 'c2c22cd3-82e7-4d04-890f-698c88bea82b',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '9731c371-ec29-40db-918c-554c847f1e94',
  },
  {
    id: '099bc37c-0db2-4efa-ba55-8721b7a3b9a9',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '9731c371-ec29-40db-918c-554c847f1e94',
  },
  {
    id: 'e66ae805-b234-4c2b-b5ca-2733a6bf8cb5',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '9731c371-ec29-40db-918c-554c847f1e94',
  },
  {
    id: '9507739a-1dc8-4d30-b6b2-5b2bc604109a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: 'e96ae639-82f1-464a-9899-529368b73a89',
  },
  {
    id: '5c80a575-1288-4ccf-bf40-1ce7fd1a6e3b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: 'e96ae639-82f1-464a-9899-529368b73a89',
  },
  {
    id: 'bd80fb01-20e0-4a42-972d-fc2d7d2db199',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: 'a6473676-8740-4b3e-aece-78fe50afe10d',
  },
  {
    id: 'f362fcb5-f282-4c8e-b453-636b62f103d5',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: 'a6473676-8740-4b3e-aece-78fe50afe10d',
  },
  {
    id: 'b7e833d0-97b4-442e-8d39-16e5283b870c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '803c5571-f944-4e57-9382-a5eea8f8f9f0',
  },
  {
    id: '3d22e094-f6bf-48f6-bd21-ee9f46e3b920',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '803c5571-f944-4e57-9382-a5eea8f8f9f0',
  },
  {
    id: '5a13f43d-ac98-4423-864f-9b418c18f43b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '803c5571-f944-4e57-9382-a5eea8f8f9f0',
  },
  {
    id: '84bc9844-1f1b-4ac1-a685-038fe700ccd5',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '4cd9a1f9-c159-46d9-975c-1c30645f87e1',
  },
  {
    id: '023acffb-a01c-4e23-81dd-9667462b071c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '4cd9a1f9-c159-46d9-975c-1c30645f87e1',
  },
  {
    id: 'e8ad2fb2-af8a-49ee-9d22-c373d4a78767',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: '4cd9a1f9-c159-46d9-975c-1c30645f87e1',
  },
  {
    id: '8237d364-d7c3-48f5-b416-314148be27c7',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: 'f4f665a7-4e12-4f57-93bf-609cc2bc0cc3',
  },
  {
    id: '15d22f3b-1c7d-4242-ae66-32ff0111e647',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: 'f4f665a7-4e12-4f57-93bf-609cc2bc0cc3',
  },
  {
    id: '44fbafbd-bce4-4ea3-9df6-49b3f02494d0',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-12T00:29:59.671Z',
    updatedAt: '2023-11-12T00:29:59.671Z',
    userId: '7bba46cb-f5c4-477d-be4d-84e0365d3a66',
    shelfId: 'bcb627c0-60a7-406f-9768-add7aeaf3fd8',
    boxId: 'f4f665a7-4e12-4f57-93bf-609cc2bc0cc3',
  },
];
