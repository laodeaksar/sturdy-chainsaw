/*
  Warnings:

  - You are about to drop the `views` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "views";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Views" (
    "permalink" TEXT NOT NULL PRIMARY KEY,
    "count" BIGINT NOT NULL DEFAULT 1
);
