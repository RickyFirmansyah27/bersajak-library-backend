const { statSync, createReadStream } = require('fs');
const path = require('path');

const GetAudioEbook = (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line no-undef
    const audioPath = path.join(__dirname, '..', 'assets', 'audio', `sample-1.mp3`);
    const stat = statSync(audioPath)
    const fileSize = stat.size;
    const range = req.range(fileSize);

    if (!range) {
        return res.status(416).send('Requested range not satisfiable\n');
    }

    if (range.type === 'bytes') {
        const { start, end } = range[0];
        const chunkSize = (end - start) + 1;
        const file = createReadStream(audioPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'audio/mpeg',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'audio/mpeg',
        };
        res.writeHead(200, head);
        createReadStream(audioPath).pipe(res);
    }
};

module.exports = {
    GetAudioEbook,
}