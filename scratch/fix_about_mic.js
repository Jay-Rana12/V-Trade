
const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\xampp\\htdocs\\redesign', 'about.html');
try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Force UTF-8 and remove possible NULL characters
    content = content.replace(/\0/g, '');
    
    const target = '<button class="mic-btn-icon" title="Voice Search">';
    const replacement = '<button class="mic-btn-icon" title="Voice Search" style="display: flex !important; color: #f26b43 !important; position: relative !important; z-index: 999 !important;">';
    
    if (content.includes(target)) {
        content = content.split(target).join(replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('SUCCESS: about.html updated successfully.');
    } else {
        console.log('WARNING: Target string not found. Maybe it already has styles?');
        // Check if it already has the style
        if (content.includes('style="display: flex !important;')) {
            console.log('INFO: Mic already has force-visibility style.');
        } else {
            console.log('ERROR: Mic button HTML structure is different than expected.');
            // Let's see what's there
            const searchIndex = content.indexOf('mic-btn-icon');
            if (searchIndex !== -1) {
                console.log('Context around mic-btn-icon:', content.substring(searchIndex - 20, searchIndex + 100));
            }
        }
    }
} catch (err) {
    console.error('CRITICAL ERROR:', err.message);
}
