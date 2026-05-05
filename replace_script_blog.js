const fs = require('fs');
let file = 'blog.html';
let content = fs.readFileSync(file, 'utf8');

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

let regex = /<div>\s*<h4>Contact Headquarters<\/h4>[\s\S]*?<\/div>/i;
if (regex.test(content)) {
    content = content.replace(regex, newContactBlock);
    fs.writeFileSync(file, content);
    console.log("Successfully replaced in blog.html");
} else {
    console.log("Regex did not match");
}
