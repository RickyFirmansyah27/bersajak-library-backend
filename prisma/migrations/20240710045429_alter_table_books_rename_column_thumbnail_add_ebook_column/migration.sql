/*
  Warnings:

  - You are about to drop the column `image_url` on the `books` table. All the data in the column will be lost.
  - Added the required column `ebook_url` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_url` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,
    "ebook_url" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "total_reads" INTEGER NOT NULL DEFAULT 0,
    "total_likes" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_books" ("audio_url", "author", "created_at", "description", "genres", "id", "title", "total_likes", "total_reads", "updated_at") SELECT "audio_url", "author", "created_at", "description", "genres", "id", "title", "total_likes", "total_reads", "updated_at" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
