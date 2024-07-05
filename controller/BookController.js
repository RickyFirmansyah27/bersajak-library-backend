const path = require('path');
const { Logger } = require('../utils/logger');
const fs = require('fs').promises;
const { PDFDocument } = require('pdf-lib');

const Namespace = 'BookController';
const GetEbookChunk = async (req, res) => {
    const { id } = req.params;
    const { page } = req.query;

    const startPage = (parseInt(page) - 1) * 2 + 1;
    const endPage = startPage + 1;

    // eslint-disable-next-line no-undef
    const filePath = path.join(__dirname, '..', 'assets', 'books', `${id}.pdf`);
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

        // eslint-disable-next-line no-undef
        const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
        res.send(pdfBase64);
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
};
