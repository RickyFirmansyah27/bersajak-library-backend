const { HutanLaranganMultipleChoice, WabahPenyakitMultipleChoice, GaweEcoenzimMultipleChoice, SuaraGemuruhItuMultipleChoice } = require('../data/QuestionBank');
const { SuaraGemuruhItuWordCompletion, HutanLaranganWordCompletion, GaweEkoenzimWordCompletion, WabahPenyakitWordCompletion } = require('../data/WordCompletionBank');
const db = require('../prisma/client');
const BookSeeder = async () => {
    const books = [
        {
            title: 'Suara Gemuruh Itu',
            author: 'Nur ‘Aini Rahmawati',
            description:
                'Buku ini menceritakan tentang perjalanan seorang pemuda bernama Rizki yang mengalami kegagalan dalam hidupnya. Ia merasa hidupnya tidak berarti dan tidak ada gunanya. Namun, suatu hari ia bertemu dengan seseorang yang memberikan inspirasi dan motivasi kepadanya. Dari situlah hidup Rizki berubah menjadi lebih baik dan ia pun menemukan arti hidupnya.',
            thumbnail_url: '/assets/books/thumbnail/suara-gemuruh-itu.jpg',
            audio_url: '/assets/audio/suara-gemuruh-itu.mp3',
            ebook_url: '/assets/books/suara-gemuruh-itu.pdf',
            genres: 'Anak',
            total_reads: 10,
            total_likes: 10,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            title: 'Hutan Larangan',
            author: 'Arih Numboro',
            description:
                'Lorem exercitation consectetur labore nostrud aliquip ipsum ullamco aliqua. Irure incididunt eiusmod ipsum esse ea anim Lorem.',
            thumbnail_url: '/assets/books/thumbnail/hutan-larangan.jpg',
            audio_url: '/assets/audio/hutan-larangan.mp3',
            ebook_url: '/assets/books/hutan-larangan.pdf',
            genres: 'Anak',
            total_reads: 10,
            total_likes: 10,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            title: 'Gawe Ecoenzim',
            author: 'Qoniah',
            description:
                'Lorem exercitation consectetur labore nostrud aliquip ipsum ullamco aliqua. Irure incididunt eiusmod ipsum esse ea anim Lorem.',
            thumbnail_url: '/assets/books/thumbnail/gawe-ecoenzim.jpg',
            audio_url: '/assets/audio/gawe-ecoenzim.mp3',
            ebook_url: '/assets/books/gawe-ecoenzim.pdf',
            genres: 'Anak',
            total_reads: 10,
            total_likes: 10,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            title: 'Wabah Penyakit',
            author: 'Sukini',
            description:
                'Lorem exercitation consectetur labore nostrud aliquip ipsum ullamco aliqua. Irure incididunt eiusmod ipsum esse ea anim Lorem.',
            thumbnail_url: '/assets/books/thumbnail/wabah-penyakit.jpg',
            audio_url: '/assets/audio/wabah-penyakit.mp3',
            ebook_url: '/assets/books/wabah-penyakit.pdf',
            genres: 'Anak',
            total_reads: 10,
            total_likes: 10,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ];

    await db.books.createMany({
        data: books,
    });
};

const WordCompletionSeeder = async () => {
    const book = await db.books.findFirst({
        where: {
            title: 'Wabah Penyakit'
        },
        select: {
            id: true
        }
    });

    WabahPenyakitWordCompletion.forEach(async (question) => {
        await db.wordCompletion.create({
            data: {
                book_id: book.id,
                answer: question.answer,
                question: question.question,
                number: question.number,
                created_at: new Date(),
                updated_at: new Date(),
            }
        })
    });
}
const QuizSeeder = async () => {
    // const book = await db.books.findFirst({
    //     where: {
    //         title: 'Suara Gemuruh Itu'
    //     },
    //     select: {
    //         id: true
    //     }
    // });
    // SuaraGemuruhItuMultipleChoice.forEach(async (question) => {
    //     const stringifyOptions = JSON.stringify(question.options);
    //     await db.quiz.create({
    //         data: {
    //             book_id: book.id,
    //             question: question.question,
    //             option_list: stringifyOptions,
    //             answer: question.answer,
    //             created_at: new Date(),
    //             updated_at: new Date(),
    //         },
    //     });
    // });
}

module.exports = { BookSeeder, QuizSeeder, WordCompletionSeeder };
