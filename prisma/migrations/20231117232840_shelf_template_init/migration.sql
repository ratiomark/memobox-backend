-- CreateTable
CREATE TABLE "shelf_template" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "template" JSONB NOT NULL DEFAULT '[{"minutes":5,"hours":0,"days":0,"weeks":0,"months":0},{"minutes":0,"hours":8,"days":0,"weeks":0,"months":0},{"minutes":0,"hours":0,"days":1,"weeks":0,"months":0},{"minutes":0,"hours":0,"days":3,"weeks":0,"months":0},{"minutes":0,"hours":0,"days":14,"weeks":0,"months":0},{"minutes":0,"hours":0,"days":28,"weeks":0,"months":0},{"minutes":0,"hours":0,"days":0,"weeks":3,"months":0},{"minutes":0,"hours":0,"days":2,"weeks":3,"months":1},{"minutes":0,"hours":0,"days":0,"weeks":0,"months":2},{"minutes":0,"hours":0,"days":0,"weeks":4,"months":2}]',

    CONSTRAINT "shelf_template_pkey" PRIMARY KEY ("id")
);
