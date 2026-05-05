const fs = require('fs');
const path = require('path');

const jsFile = 'c:/Users/AE/OneDrive/Desktop/redesign/js/nav_animations.js';
let content = fs.readFileSync(jsFile, 'utf8');

content = content.replace(/(navTimeline\.from\('.nav-item', {[\s\S]*?opacity: 0,[\s\S]*?}, "-=0\.4"\))/g, '/* $1 */');
content = content.replace(/(navTimeline\.from\('.extended-header', {[\s\S]*?opacity: 0,[\s\S]*?}\))/g, '/* $1 */');

fs.writeFileSync(jsFile, content, 'utf8');
console.log('Disabled GSAP opacity for nav items');
