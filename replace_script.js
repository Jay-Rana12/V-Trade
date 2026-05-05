const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const newContactBlock = `<div>
                    <h4>Get In Touch</h4>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 15px; display: flex; gap: 10px;">
                            <i class="fa-solid fa-location-dot" style="color: var(--accent); margin-top: 5px;"></i> 
                            515, Fifth Floor, HillTown Impressa, Nikol, Ahmedabad, Gujarat 380049
                        </li>
                        <li style="margin-bottom: 15px; display: flex; gap: 10px;">
                            <i class="fa-solid fa-envelope" style="color: var(--accent); margin-top: 5px;"></i> 
                            info@vibrantindiafair.com
                        </li>
                        <li style="display: flex; gap: 10px;">
                            <i class="fa-solid fa-phone" style="color: var(--accent); margin-top: 5px;"></i> 
                            +91 99244 88938
                        </li>
                    </ul>
                </div>`;

let count = 0;
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check for '<h4>Contact Info</h4>' pattern
    let regex1 = /<div>\s*<h4>Contact Info<\/h4>\s*<ul style=[^>]+>[\s\S]*?<\/ul>\s*<\/div>/i;
    let regex2 = /<div>\s*<h4>Contact<\/h4>\s*<ul style=[^>]+>[\s\S]*?<\/ul>\s*<\/div>/i;
    let regex3 = /<div>\s*<h4>Get In Touch<\/h4>\s*<ul style=[^>]+>[\s\S]*?<\/ul>\s*<\/div>/i;

    let modified = false;
    
    if (regex1.test(content)) {
        content = content.replace(regex1, newContactBlock);
        modified = true;
    } else if (regex2.test(content)) {
        content = content.replace(regex2, newContactBlock);
        modified = true;
    } else if (regex3.test(content)) {
        content = content.replace(regex3, newContactBlock);
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(file, content);
        count++;
    }
}
console.log('Successfully fully replaced the footer contact blocks in ' + count + ' files.');
