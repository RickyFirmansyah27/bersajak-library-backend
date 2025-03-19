/*
  Warnings:

  - You are about to drop the column `option_list_audio_url` on the `quiz` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_id" INTEGER NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "question" TEXT NOT NULL,
    "question_audio_url" TEXT NOT NULL DEFAULT '',
    "option_list" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "quiz_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_quiz" ("answer", "book_id", "created_at", "id", "number", "option_list", "question", "question_audio_url", "updated_at") SELECT "answer", "book_id", "created_at", "id", "number", "option_list", "question", "question_audio_url", "updated_at" FROM "quiz";
DROP TABLE "quiz";
ALTER TABLE "new_quiz" RENAME TO "quiz";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
