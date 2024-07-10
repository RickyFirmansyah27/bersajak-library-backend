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

module.exports = { BookSeeder };
