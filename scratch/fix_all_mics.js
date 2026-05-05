
const fs = require('fs');
const path = require('path');

const files = ['about.html', 'contact.html', 'manufacturers.html', 'kitchenware.html', 'results.html'];
const baseDir = 'c:\\xampp\\htdocs\\redesign';

files.forEach(file => {
    const filePath = path.join(baseDir, file);
    try {
        if (!fs.existsSync(filePath)) return;
        
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/\0/g, ''); // Clean NULLs
        
        const target = '<button class="mic-btn-icon" title="Voice Search">';
        const replacement = '<button class="mic-btn-icon" title="Voice Search" style="display: flex !important; color: #f26b43 !important; position: relative !important; z-index: 999 !important;">';
        
        if (content.includes(target)) {
            content = content.split(target).join(replacement);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`SUCCESS: ${file} updated.`);
        } else if (content.includes('mic-btn-icon')) {
            // Already updated or has inline styles
            console.log(`INFO: ${file} already has mic styles or structure is different.`);
        } else {
            console.log(`WARNING: ${file} does not contain mic-btn-icon.`);
        }
    } catch (err) {
        console.error(`ERROR in ${file}:`, err.message);
    }
});
