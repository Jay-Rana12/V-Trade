const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/src=["']js\/sidebar_filter\.js(\?v=\d+(\.\d+)?)?["']/g, 'src="js/sidebar_filter.js?v=' + Date.now() + '"');
    content = content.replace(/href=["']css\/category_standard\.css(\?v=\d+(\.\d+)?)?["']/g, 'href="css/category_standard.css?v=' + Date.now() + '"');
    content = content.replace(/href=["']css\/style\.css(\?v=\d+(\.\d+)?)?["']/g, 'href="css/style.css?v=' + Date.now() + '"');
    content = content.replace(/src=["']js\/main\.js(\?v=\d+(\.\d+)?)?["']/g, 'src="js/main.js?v=' + Date.now() + '"');
    fs.writeFileSync(f, content);
});
console.log('Cache busters updated for all HTML files.');
