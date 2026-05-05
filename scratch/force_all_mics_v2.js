
const fs = require('fs');
const path = require('path');

const files = ['about.html', 'contact.html', 'manufacturers.html', 'kitchenware.html', 'index.html', 'results.html'];
const baseDir = 'c:\\xampp\\htdocs\\redesign';
const timestamp = Date.now();

files.forEach(file => {
    const filePath = path.join(baseDir, file);
    try {
        if (!fs.existsSync(filePath)) return;
        
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/\0/g, ''); // Clean NULLs
        
        // 1. Force Cache Refresh for CSS
        content = content.replace(/style\.css\?v=[0-9]+/g, `style.css?v=${timestamp}`);
        
        // 2. Add Force-Visibility to search-bubble
        content = content.replace(/class="search-bubble top-search intel-search-container"/g, 
            'class="search-bubble top-search intel-search-container" style="position: relative; overflow: visible !important; display: flex !important; align-items: center !important;"');
        
        // 3. Add Force-Visibility to mic button if not already there
        if (!content.includes('style="display: flex !important; color: #f26b43 !important;')) {
            const micTarget = '<button class="mic-btn-icon" title="Voice Search">';
            const micReplacement = '<button class="mic-btn-icon" title="Voice Search" style="display: flex !important; color: #f26b43 !important; position: relative !important; z-index: 999 !important;">';
            content = content.split(micTarget).join(micReplacement);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`SUCCESS: ${file} updated and cache busted.`);
    } catch (err) {
        console.error(`ERROR in ${file}:`, err.message);
    }
});
