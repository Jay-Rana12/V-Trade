const fs = require('fs');
const path = require('path');

const cssFile = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

const regex = /\.premium-logo\s*{[\s\S]*?position:\s*absolute;[\s\S]*?left:\s*40px;[\s\S]*?top:\s*50%;[\s\S]*?transform:\s*translateY\(-50%\);[\s\S]*?}/;

const newRule = `.premium-logo {
  position: absolute;
  left: 40px;
  top: 25px; /* Aligned with top row */
  transform: none;
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  z-index: 10;
}`;

if (regex.test(content)) {
    content = content.replace(regex, newRule);
    fs.writeFileSync(cssFile, content, 'utf8');
    console.log('Fixed logo position to upper left corner');
} else {
    console.log('Regex not found, trying multi replace');
    // Fallback simple replace
    content = content.replace('top: 50%;', 'top: 25px;');
    content = content.replace('transform: translateY(-50%);', 'transform: none;');
    fs.writeFileSync(cssFile, content, 'utf8');
    console.log('Fallback applied');
}
