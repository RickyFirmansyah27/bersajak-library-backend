-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,
    "ebook_url" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "total_reads" INTEGER NOT NULL DEFAULT 0,
    "total_likes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "question" TEXT NOT NULL,
    "question_audio_url" TEXT NOT NULL DEFAULT '',
    "option_list" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "word_completion" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "question" TEXT NOT NULL,
    "question_audio_url" TEXT NOT NULL DEFAULT '',
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "word_completion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audio_guide" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,

    CONSTRAINT "audio_guide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_completion" ADD CONSTRAINT "word_completion_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
