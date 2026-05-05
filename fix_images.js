const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'images');

const files = fs.readdirSync(dir);
const brokenFiles = files.filter(f => {
    const p = path.join(dir, f);
    const stats = fs.statSync(p);
    return stats.size <= 29;
});

console.log('Broken files to replace:', brokenFiles);

let promises = [];

brokenFiles.forEach((file, index) => {
    // Generate a different id for each image to ensure variety
    const url = `https://picsum.photos/800/600?random=${index}`;

    promises.push(new Promise((resolve, reject) => {
        const filePath = path.join(dir, file);
        const fileStream = fs.createWriteStream(filePath);

        function download(url) {
            https.get(url, function (response) {
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    download(response.headers.location);
                } else {
                    response.pipe(fileStream);
                    fileStream.on('finish', function () {
                        fileStream.close(resolve);
                    });
                }
            }).on('error', function (err) {
                resolve();
            });
        }

        download(url);
    }));
});

Promise.all(promises).then(() => {
    console.log("Broken images successfully replaced with functional placeholders!");
}).catch(console.error);
