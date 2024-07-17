const path = require('path');
const db = require('../prisma/client');
const { Logger } = require('../utils/logger');
const fs = require('fs').promises;
const { PDFDocument } = require('pdf-lib');
const { toInteger } = require('lodash');

const { APP_URL } = process.env;
const Namespace = 'BookController';
const GetEbookList = async (req, res) => {
    const { title } = req.query;
    try {
        let ebooks;
        if (title) {
            ebooks = await db.books.findMany({
                where: {
                    title: {
                        contains: title,
                    },
                },
            });
        } else {
            ebooks = await db.books.findMany({
                orderBy: {
                    created_at: 'asc'
                }
            });
        }
        const transformedData = ebooks.map((ebook) => {
            delete ebook.created_at;
            delete ebook.updated_at;

            return {
                ...ebook,
                thumbnail_url: APP_URL + ebook.thumbnail_url,
                ebook_url: APP_URL + ebook.ebook_url,
                audio_url: APP_URL + ebook.audio_url,
            };
        });

        return res.successWithData(transformedData);
    } catch (error) {
        Logger.error(
            `[${Namespace}::GetEbookList] error ${error}, stack ${error.stack}`
        );
        return res.internalServerError();
    }
};

const GetEbookDetail = async (req, res) => {
    const { id } = req.params;

    const ebook = await db.books.findUnique({
        where: {
            id: toInteger(id),
        },
    });

    if (!ebook) {
        return res.notFound('Ebook not found');
    }

    delete ebook.created_at;
    delete ebook.updated_at;

    return res.successWithData({
        ...ebook,
        thumbnail_url: `${APP_URL}` + ebook.thumbnail_url,
        ebook_url: `${APP_URL}${ebook.ebook_url}`,
        audio_url: `${APP_URL}${ebook.audio_url}`,
    });
};

const GetEbookChunk = async (req, res) => {
    const { id } = req.params;
    const { page } = req.query;

    const startPage = (parseInt(page) - 1) * 2 + 1;
    const endPage = startPage + 1;

    const ebook = await db.books.findUnique({
        where: {
            id: toInteger(id),
        },
    });

    if (!ebook) {
        return res.notFound('Ebook not found');
    }

    const filePath = path.join(__dirname, '..', ebook.ebook_url);
    Logger.debug(`[${Namespace}::GetEbookChunk] filePath ${filePath}`);

    try {
        const ebook = await fs.readFile(filePath);
        const pdfDoc = await PDFDocument.load(ebook);
        const newPdfDoc = await PDFDocument.create();

        const pages = pdfDoc.getPages();
        const totalPages = pages.length;

        if (startPage > totalPages) {
            return res.badRequest('No more pages');
        }

        const [page1] = await newPdfDoc.copyPages(pdfDoc, [startPage - 1]);
        newPdfDoc.addPage(page1);

        if (endPage <= totalPages) {
            const [page2] = await newPdfDoc.copyPages(pdfDoc, [endPage - 1]);
            newPdfDoc.addPage(page2);
        }

        const pdfBytes = await newPdfDoc.save();
        const roundedTotalPages = Math.ceil(totalPages / 2);

        // eslint-disable-next-line no-undef
        const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
        res.successWithPagination(pdfBase64, {
            totalPages: roundedTotalPages,
            currentPage: parseInt(page),
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            return res.notFound('Ebook not found');
        }
        //prettier-ignore
        Logger.error(`[${Namespace}::GetEbookChunk] error ${error}, stack ${error.stack}`);
        return res.internalServerError();
    }
};

module.exports = {
    GetEbookChunk,
    GetEbookList,
    GetEbookDetail,
};
