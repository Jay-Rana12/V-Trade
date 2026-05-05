const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'assets', 'images'); // standardizing folder structure sometimes users like 'images' inside assets or just 'images'. Let me just use 'images' directly.
const outDir = path.join(__dirname, 'images');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const allFiles = [
    'index.html', 'about.html', 'services.html', 'products.html', 'gallery.html', 'blog.html', 'contact.html',
    'css/style.css'
];

let counter = 1;
const imgMap = new Map();

allFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Find all unsplash urls
    const regex = /https:\/\/images\.unsplash\.com\/[^"'\s\)]+/g;
    const matches = content.match(regex);

    if (matches) {
        matches.forEach(url => {
            if (!imgMap.has(url)) {
                imgMap.set(url, `imported-img-${counter}.jpg`);
                counter++;
            }
        });
    }
});

let promises = [];

console.log(`Found ${imgMap.size} unique images to download. Downloading...`);

imgMap.forEach((filename, url) => {
    promises.push(new Promise((resolve, reject) => {
        const p = path.join(outDir, filename);
        if (fs.existsSync(p)) return resolve(); // skip

        const file = fs.createWriteStream(p);
        https.get(url, function (response) {

            // Handle redirects (like 302 Found or 301 Moved Permanently)
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                https.get(response.headers.location, function (redirectResponse) {
                    redirectResponse.pipe(file);
                    file.on('finish', function () {
                        file.close(resolve);
                    });
                }).on('error', function () {
                    resolve();
                });
            } else {
                response.pipe(file);
                file.on('finish', function () {
                    file.close(resolve);
                });
            }
        }).on('error', function (err) {
            fs.unlinkSync(p);
            resolve(); // ignore error for now
        });
    }));
});

Promise.all(promises).then(() => {
    // replace in files
    allFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (!fs.existsSync(filePath)) return;
        let content = fs.readFileSync(filePath, 'utf8');

        imgMap.forEach((filename, url) => {
            const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const replacement = file.startsWith('css') ? `../images/${filename}` : `images/${filename}`;
            content = content.replace(new RegExp(escapedUrl, 'g'), replacement);
        });

        fs.writeFileSync(filePath, content);
    });
    console.log("Images downloaded and HTML/CSS references updated!");
}).catch(console.error);
