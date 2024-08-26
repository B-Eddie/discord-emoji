import path from 'path';
import fs from 'fs';
import https from 'https';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { imageUrl, imageName } = req.query;

        if (!imageUrl || !imageName) {
            return res.status(400).json({ error: 'url + name req' });
        }

        const imagesDirectory = path.join(process.cwd(), 'public', 'images');
        const imagePath = path.join(imagesDirectory, imageName);

        // file exists
        if (fs.existsSync(imagePath)) {
            return res.status(200).json({ success: true, message: 'alr exists', imageUrl: `/images/${imageName}` });
        } else {
            const file = fs.createWriteStream(imagePath);

            https.get(imageUrl, (response) => {
                response.pipe(file);

                file.on('finish', () => {
                    file.close(() => {
                        res.status(200).json({ success: true, imageUrl: `/images/${imageName}` });
                    });
                });

                file.on('error', (err) => {
                    fs.unlink(imagePath, () => {
                        res.status(500).json({ error: 'write file did not work', details: err.message });
                    });
                });
            }).on('error', (err) => {
                res.status(500).json({ error: 'download img did not work', details: err.message });
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`the method: ${req.method} is not allowed`);
    }
}
