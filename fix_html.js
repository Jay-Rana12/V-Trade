const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Add cache buster to modal_system.js
    content = content.replace(/src=["']js\/modal_system\.js(\?v=\d+(\.\d+)?)?["']/g, 'src="js/modal_system.js?v=' + Date.now() + '"');
    
    // Also re-apply cache busters to main.js and sidebar_filter.js
    content = content.replace(/src=["']js\/sidebar_filter\.js(\?v=\d+(\.\d+)?)?["']/g, 'src="js/sidebar_filter.js?v=' + Date.now() + '"');
    content = content.replace(/src=["']js\/main\.js(\?v=\d+(\.\d+)?)?["']/g, 'src="js/main.js?v=' + Date.now() + '"');

    // Fix double body/html tags if they exist
    if (content.split('</body>').length > 2) {
        content = content.replace(/<\/body>\s*<\/html>\s*<script/g, '<script');
        // Remove trailing </body></html> if there's more after them
        content = content.replace(/<\/body>\s*<\/html>([\s\S]*?)<\/body>\s*<\/html>/g, '$1</body>\n</html>');
    }

    fs.writeFileSync(f, content);
});
console.log('Cache busters and HTML structure fixed.');
