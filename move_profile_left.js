
const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Move the user profile section significantly to the left
const oldLine = '    margin-left: 20px !important;';
const newLine = '    margin-left: 20px !important;\n    margin-right: 120px !important; /* Move profile more towards the center */';

content = content.replace(oldLine, newLine);

fs.writeFileSync(cssPath, content, 'utf8');
console.log('User profile moved further left by adding margin-right.');
