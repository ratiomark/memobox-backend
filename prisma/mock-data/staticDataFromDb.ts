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
    id: 'edfc499c-bb66-4068-8b87-65bae7535dbb',
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$UcRXyyUGm83GoUA.8sz/QuCgUtfY.83xGbGjBIUAeWc.SRiYjtSmC',
  },
  {
    id: 'd914b311-4461-4da7-b338-46045aebc17b',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '$2a$10$UcRXyyUGm83GoUA.8sz/QuCgUtfY.83xGbGjBIUAeWc.SRiYjtSmC',
  },
];

export const shelves = [
  {
    id: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    title: 'Shelf A',
    index: 0,
    isCollapsed: true,
    createdAt: '2023-11-13T00:48:01.264Z',
    updatedAt: '2023-11-13T00:48:01.264Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
  },
  {
    id: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    title: 'Shelf B',
    index: 1,
    isCollapsed: true,
    createdAt: '2023-11-13T00:48:01.264Z',
    updatedAt: '2023-11-13T00:48:01.264Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
  },
  {
    id: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    title: 'Shelf C',
    index: 2,
    isCollapsed: true,
    createdAt: '2023-11-13T00:48:01.264Z',
    updatedAt: '2023-11-13T00:48:01.264Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
  },
];

export const boxes = [
  {
    id: '00813c83-7513-4682-a4af-b526ea7495b5',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
  },
  {
    id: '85655cab-7209-4c54-aee9-304399671eca',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
  },
  {
    id: '16b75aff-8884-4edb-9cb1-8f63bb792c1f',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
  },
  {
    id: 'd3820307-be56-46cb-b866-b886ea9c8cb5',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
  },
  {
    id: 'bc00a902-89e7-453d-8b34-49c51175db7f',
    index: 4,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
  },
  {
    id: '4669c307-4140-4ce3-9a69-d01455d0f209',
    index: 5,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
  },
  {
    id: '21124421-0c78-4336-9023-bc94a7752fba',
    index: 6,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
  },
  {
    id: '2fc00984-57b1-49fa-a1c4-42e5787b6929',
    index: 7,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
  },
  {
    id: 'f91971fe-8c1d-49ac-b217-e943196d01b1',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
  },
  {
    id: '14d0a622-b604-4e40-b771-ca78d6014816',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
  },
  {
    id: 'e8c5bdde-03af-457c-af2a-dca218c614ca',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
  },
  {
    id: '252511d2-5760-4f58-ad62-f736aa02921d',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
  },
  {
    id: 'e13b88a8-b46c-442f-8447-0dcb616b53e6',
    index: 4,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
  },
  {
    id: '4af716a1-9a64-48a3-9cef-1c330e4f69d5',
    index: 5,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
  },
  {
    id: '1ebf2a64-6df8-484c-bc60-c09686714325',
    index: 6,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
  },
  {
    id: '44226164-6840-4e9b-974d-47aebc4d3516',
    index: 7,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
  },
  {
    id: 'c1e43f04-3ab9-4c0b-a69f-82c4075800a5',
    index: 0,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
  },
  {
    id: '533a907b-e2d7-470d-bb6c-c4607af265df',
    index: 1,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
  },
  {
    id: '3eababf8-0ae2-4903-a805-19628a42faab',
    index: 2,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
  },
  {
    id: 'da70351e-2635-47aa-bb11-d08780896222',
    index: 3,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
  },
  {
    id: '67095006-4197-4b4f-b105-6b6f83302643',
    index: 4,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
  },
  {
    id: 'c97a6206-7000-4854-86cf-8bca00d18be3',
    index: 5,
    timing: {
      days: 0,
      hours: 0,
      weeks: 0,
      months: 0,
      minutes: 5,
    },
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
  },
];

export const cards = [
  {
    id: 'c484cdfc-c6e0-4fbf-adcd-747c3277bc8b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '00813c83-7513-4682-a4af-b526ea7495b5',
  },
  {
    id: 'cf41bd28-168e-4c66-acc3-38bd14febd35',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '00813c83-7513-4682-a4af-b526ea7495b5',
  },
  {
    id: 'c46ef02d-3dbc-4f66-a085-bcd87d47d4b5',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '00813c83-7513-4682-a4af-b526ea7495b5',
  },
  {
    id: 'd3e411e5-f67e-4107-8da6-3b5cf28268cd',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '00813c83-7513-4682-a4af-b526ea7495b5',
  },
  {
    id: 'e68e0cf8-34bf-461f-8318-b514545e098a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '85655cab-7209-4c54-aee9-304399671eca',
  },
  {
    id: '41bf6037-cccd-49c1-aec3-6836a3444fad',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '85655cab-7209-4c54-aee9-304399671eca',
  },
  {
    id: '869cce3b-5a87-47d7-b43b-5f9fe3bfd3ff',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '85655cab-7209-4c54-aee9-304399671eca',
  },
  {
    id: 'f55c4d8d-819e-428b-88f2-f818be4ced4f',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '85655cab-7209-4c54-aee9-304399671eca',
  },
  {
    id: 'ede03ed1-37c9-4ef6-a299-33eead3d2e25',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '16b75aff-8884-4edb-9cb1-8f63bb792c1f',
  },
  {
    id: 'a0e20d45-6484-4ef3-a7d8-8d1133c26576',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '16b75aff-8884-4edb-9cb1-8f63bb792c1f',
  },
  {
    id: 'bd1f0334-a28e-4bbe-a719-eb553afa814c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '16b75aff-8884-4edb-9cb1-8f63bb792c1f',
  },
  {
    id: '9ba6e735-64f1-410f-8731-fc57263e2b49',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: 'd3820307-be56-46cb-b866-b886ea9c8cb5',
  },
  {
    id: '70a00e1b-3f03-4dd8-beb2-5f248de7ef8e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: 'd3820307-be56-46cb-b866-b886ea9c8cb5',
  },
  {
    id: 'bf3f7e32-3097-4ed3-97d9-4fc2a1490554',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: 'bc00a902-89e7-453d-8b34-49c51175db7f',
  },
  {
    id: '7ed737d8-069f-4a5f-a10a-50fa26ad4b85',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: 'bc00a902-89e7-453d-8b34-49c51175db7f',
  },
  {
    id: 'f29e1250-eafd-418a-be8d-049d75b5b554',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: 'bc00a902-89e7-453d-8b34-49c51175db7f',
  },
  {
    id: '18a6ed64-ec67-45c7-9f3a-3ea59255610e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '4669c307-4140-4ce3-9a69-d01455d0f209',
  },
  {
    id: 'cfbda732-cb49-4fca-9a3e-5ff05de5480e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '4669c307-4140-4ce3-9a69-d01455d0f209',
  },
  {
    id: '1a0c1756-055b-4ecc-bead-fe853f5cbf66',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '21124421-0c78-4336-9023-bc94a7752fba',
  },
  {
    id: 'ed0d39c3-f030-48f5-aae5-5f4e0ddf9e47',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '21124421-0c78-4336-9023-bc94a7752fba',
  },
  {
    id: '60ed06b0-c2a1-4658-ae35-3b11efdc1a1e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '21124421-0c78-4336-9023-bc94a7752fba',
  },
  {
    id: '62567feb-fe19-4adc-95e4-c7db0da297ba',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '2fc00984-57b1-49fa-a1c4-42e5787b6929',
  },
  {
    id: '27806cca-14d3-4d33-bb0a-c5062856b6bc',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '2fc00984-57b1-49fa-a1c4-42e5787b6929',
  },
  {
    id: '9bd70014-4d41-4215-aa84-c01b4277a295',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '2fc00984-57b1-49fa-a1c4-42e5787b6929',
  },
  {
    id: '3640ca96-f775-41c5-947b-1122daa5868e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '50720dbd-902a-4e3d-aa26-c727aa6cfefd',
    boxId: '2fc00984-57b1-49fa-a1c4-42e5787b6929',
  },
  {
    id: 'ef709272-bf62-46e0-9e10-8a11e0fe01a0',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'f91971fe-8c1d-49ac-b217-e943196d01b1',
  },
  {
    id: '1ad18fe1-1a60-4929-9004-801b594e3090',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'e8c5bdde-03af-457c-af2a-dca218c614ca',
  },
  {
    id: '5580b9b4-634c-47b2-a4b8-5aa3e48dd968',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'f91971fe-8c1d-49ac-b217-e943196d01b1',
  },
  {
    id: 'e52a20ea-16c8-4602-99d2-34e0d2a6d816',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'f91971fe-8c1d-49ac-b217-e943196d01b1',
  },
  {
    id: '0ce4c3a5-1105-4dc2-b435-95728c26e1e1',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'f91971fe-8c1d-49ac-b217-e943196d01b1',
  },
  {
    id: '345ad2f8-2ede-4f2f-9272-69af80679243',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '14d0a622-b604-4e40-b771-ca78d6014816',
  },
  {
    id: '53387767-c9d3-4db0-959e-ce69d6711292',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '14d0a622-b604-4e40-b771-ca78d6014816',
  },
  {
    id: '1ec0788e-77e6-47e5-8b27-0de933aa5634',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '14d0a622-b604-4e40-b771-ca78d6014816',
  },
  {
    id: '0eef5b5e-b5f1-4d67-9426-f0459e929778',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'e8c5bdde-03af-457c-af2a-dca218c614ca',
  },
  {
    id: 'd5a42fb1-5f7f-4bef-871f-8ea79bea333f',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'e8c5bdde-03af-457c-af2a-dca218c614ca',
  },
  {
    id: '0083abb5-a62f-4ed8-96c9-7a3f81dd22c9',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'e8c5bdde-03af-457c-af2a-dca218c614ca',
  },
  {
    id: 'e3b27829-a201-43b9-abc3-cd35c2f9893e',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '252511d2-5760-4f58-ad62-f736aa02921d',
  },
  {
    id: '75b94725-a563-40dc-8ade-b70cb6399222',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '252511d2-5760-4f58-ad62-f736aa02921d',
  },
  {
    id: 'd57d8b0b-0a9a-4254-aa12-d12fe997c0e7',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '252511d2-5760-4f58-ad62-f736aa02921d',
  },
  {
    id: 'd0bb5538-ed14-4a14-a10e-4676a3d9bcc0',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'e13b88a8-b46c-442f-8447-0dcb616b53e6',
  },
  {
    id: 'b790bf49-75fb-4597-a236-72fbf0c42507',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'e13b88a8-b46c-442f-8447-0dcb616b53e6',
  },
  {
    id: '194f021c-850c-4968-9c29-ee185140c25f',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: 'e13b88a8-b46c-442f-8447-0dcb616b53e6',
  },
  {
    id: '3ea23df8-cb0d-4586-b479-fc26c485b559',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '4af716a1-9a64-48a3-9cef-1c330e4f69d5',
  },
  {
    id: 'fc085f7d-20b8-4d3f-8a19-b470f0d6f62c',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '4af716a1-9a64-48a3-9cef-1c330e4f69d5',
  },
  {
    id: 'def838b9-455e-46ab-ba8f-df2509e26fd6',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '1ebf2a64-6df8-484c-bc60-c09686714325',
  },
  {
    id: '2ad0c76a-8a2e-45d5-bab9-d52a8ff30bf4',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '1ebf2a64-6df8-484c-bc60-c09686714325',
  },
  {
    id: '0a9c93d6-1003-40f6-b966-46eaac7bdad8',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '1ebf2a64-6df8-484c-bc60-c09686714325',
  },
  {
    id: 'a29fe840-ac31-4eac-b2fd-7b693ec7a327',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '1ebf2a64-6df8-484c-bc60-c09686714325',
  },
  {
    id: 'ba2009b5-099d-4d71-9bef-def21620ca93',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '44226164-6840-4e9b-974d-47aebc4d3516',
  },
  {
    id: 'a66365c9-08e2-4505-aa38-0c377c14c378',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: '91fd61c2-0498-436b-b09e-0bb2f27b0567',
    boxId: '44226164-6840-4e9b-974d-47aebc4d3516',
  },
  {
    id: '83ddb5f7-ab7f-4758-b0f6-114b5e72b709',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequa","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfwefwfewf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"fwfw","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"t. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'c1e43f04-3ab9-4c0b-a69f-82c4075800a5',
  },
  {
    id: '47205daf-cb7a-4733-acc4-01487fe0234d',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliыва","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"цу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'c1e43f04-3ab9-4c0b-a69f-82c4075800a5',
  },
  {
    id: 'c561588e-6b35-48dd-bf6b-f936d2e807c8',
    question:
      '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefwe","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sfwefwefw","type":"text","version":1}],"direction":"ltr","format":"right","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"Yellow flower in tilt shift lens","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ацуацу","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'c1e43f04-3ab9-4c0b-a69f-82c4075800a5',
  },
  {
    id: '255125c2-7585-4f98-809b-1fc366748db9',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'c1e43f04-3ab9-4c0b-a69f-82c4075800a5',
  },
  {
    id: '6ac50aca-842c-4172-86af-f0ecec517c05',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: '533a907b-e2d7-470d-bb6c-c4607af265df',
  },
  {
    id: 'a8cf9601-9b3f-4692-8ec7-d0b33011767b',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: '533a907b-e2d7-470d-bb6c-c4607af265df',
  },
  {
    id: '32cca8d4-b853-4423-9662-df33ad38a3bc',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: '533a907b-e2d7-470d-bb6c-c4607af265df',
  },
  {
    id: '6291b4d6-b3aa-4a7f-8e05-6f63f03aa514',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: '533a907b-e2d7-470d-bb6c-c4607af265df',
  },
  {
    id: 'ac064da2-9fb2-48a0-b9c4-eb4ecded3de7',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: '3eababf8-0ae2-4903-a805-19628a42faab',
  },
  {
    id: '7775609e-3bf0-4407-9974-ec922458285a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: '3eababf8-0ae2-4903-a805-19628a42faab',
  },
  {
    id: 'a20f11c9-534a-4aca-a534-14ac5659635a',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'da70351e-2635-47aa-bb11-d08780896222',
  },
  {
    id: '97974344-e787-471e-8c76-1853b659c675',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'da70351e-2635-47aa-bb11-d08780896222',
  },
  {
    id: '7168cc3f-41b2-435e-ab72-038727a09460',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'da70351e-2635-47aa-bb11-d08780896222',
  },
  {
    id: '32550722-52b4-48e3-aab8-6ab5a81124cb',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'da70351e-2635-47aa-bb11-d08780896222',
  },
  {
    id: '93ff0d49-2428-4c56-b9bf-06d1e658d8a3',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: '67095006-4197-4b4f-b105-6b6f83302643',
  },
  {
    id: 'a5475445-863a-4845-9660-32ca5b0c823d',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: '67095006-4197-4b4f-b105-6b6f83302643',
  },
  {
    id: 'f2aa56a9-aa8a-42f7-9dfe-6b95cd36a8e3',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'c97a6206-7000-4854-86cf-8bca00d18be3',
  },
  {
    id: '45940867-6a98-4fee-b57e-2955d2fa85a7',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'c97a6206-7000-4854-86cf-8bca00d18be3',
  },
  {
    id: '4fe2ef9e-00ef-44be-bf42-a7e948af5820',
    question:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Minim aliqua voluptate Lorem deserunt aute non labore anim in in consequat. Aliqua voluptate nulla eu in.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    answer:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur Aute aute ex esse laboris magna ut voluptate duis tempor reprehenderit. Irure veniam quis ea pariatur","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    lastTraining: null,
    nextTraining: null,
    createdAt: '2023-11-13T00:48:01.296Z',
    updatedAt: '2023-11-13T00:48:01.296Z',
    userId: 'd914b311-4461-4da7-b338-46045aebc17b',
    shelfId: 'f18b9d16-0629-4039-9c14-eacb2b6f2132',
    boxId: 'c97a6206-7000-4854-86cf-8bca00d18be3',
  },
];
