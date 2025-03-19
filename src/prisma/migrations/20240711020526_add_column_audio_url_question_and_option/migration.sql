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
    "option_list_audio_url" TEXT NOT NULL DEFAULT '',
    "answer" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "quiz_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_quiz" ("answer", "book_id", "created_at", "id", "number", "option_list", "question", "updated_at") SELECT "answer", "book_id", "created_at", "id", "number", "option_list", "question", "updated_at" FROM "quiz";
DROP TABLE "quiz";
ALTER TABLE "new_quiz" RENAME TO "quiz";
CREATE TABLE "new_word_completion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_id" INTEGER NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "question" TEXT NOT NULL,
    "question_audio_url" TEXT NOT NULL DEFAULT '',
    "answer" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "word_completion_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_word_completion" ("answer", "book_id", "created_at", "id", "number", "question", "updated_at") SELECT "answer", "book_id", "created_at", "id", "number", "question", "updated_at" FROM "word_completion";
DROP TABLE "word_completion";
ALTER TABLE "new_word_completion" RENAME TO "word_completion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
