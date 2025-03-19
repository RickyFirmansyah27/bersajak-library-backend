const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();
const jsonData = JSON.parse(fs.readFileSync('dump.json', 'utf8'));

const insertData = async () => {
  try {
    console.log("Memulai proses insert data...");

    // Insert Books
    for (const book of jsonData.books) {
      await prisma.books.upsert({
        where: { id: book.id },
        update: {},
        create: {
          id: book.id,
          title: book.title,
          author: book.author,
          description: book.description,
          thumbnail_url: book.thumbnail_url,
          audio_url: book.audio_url,
          ebook_url: book.ebook_url,
          genres: book.genres,
          total_reads: book.total_reads,
          total_likes: book.total_likes,
          created_at: new Date(book.created_at),
          updated_at: new Date(book.updated_at)
        }
      });
    }

    // Insert Quiz
    for (const quiz of jsonData.quiz) {
      await prisma.quiz.upsert({
        where: { id: quiz.id },
        update: {},
        create: {
          id: quiz.id,
          book_id: quiz.book_id,
          number: quiz.number,
          question: quiz.question,
          question_audio_url: quiz.question_audio_url,
          option_list: quiz.option_list,
          answer: quiz.answer,
          created_at: new Date(quiz.created_at),
          updated_at: new Date(quiz.updated_at)
        }
      });
    }

    // Insert WordCompletion
    for (const word of jsonData.word_completion) {
      await prisma.wordCompletion.upsert({
        where: { id: word.id },
        update: {},
        create: {
          id: word.id,
          book_id: word.book_id,
          number: word.number,
          question: word.question,
          question_audio_url: word.question_audio_url,
          answer: word.answer,
          created_at: new Date(word.created_at),
          updated_at: new Date(word.updated_at)
        }
      });
    }

    // Insert AudioGuide
    for (const audio of jsonData.audio_guide) {
      await prisma.audioGuide.upsert({
        where: { id: audio.id },
        update: {},
        create: {
          id: audio.id,
          type: audio.type,
          audio_url: audio.audio_url
        }
      });
    }

    console.log("Data berhasil diinsert ke PostgreSQL!");
  } catch (error) {
    console.error("Error saat insert data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Jalankan script
insertData();
