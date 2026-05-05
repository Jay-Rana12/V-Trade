const fs = require('fs');
const path = require('path');

const dir = 'c:/xampp/htdocs/redesign';
const footerRegex = /<a href="index\.html" class="footer-logo">([\s\S]*?)<\/a>/;
const newFooter = `<a href="index.html" class="footer-logo">
                        <img src="images/logo.png" alt="India Trade Logo" style="height: 45px; filter: brightness(0) invert(1);">
                    </a>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.match(footerRegex)) {
        content = content.replace(footerRegex, newFooter);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated footer in ' + file);
    }
}
console.log("All footers updated!");
