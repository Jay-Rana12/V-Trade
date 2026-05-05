const fs = require('fs');
let c = fs.readFileSync('about.html', 'utf8');
c = c.replace('href="contact.html" style="padding: 16px 28px; font-weight: 700; font-size: 0.85rem; color: #64748b; border-bottom: 3px solid transparent; text-decoration: none; transition: all 0.2s;">Term', 
              'href="terms.html" style="padding: 16px 28px; font-weight: 700; font-size: 0.85rem; color: #64748b; border-bottom: 3px solid transparent; text-decoration: none; transition: all 0.2s;">Term');
fs.writeFileSync('about.html', c);
console.log('Link updated to terms.html');
