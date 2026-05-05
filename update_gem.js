const fs = require('fs');
const path = require('path');

const jsFile = 'c:/Users/AE/OneDrive/Desktop/redesign/js/nav_animations.js';
let content = fs.readFileSync(jsFile, 'utf8');

content = content.replace('color: 0xF59E0B, // Amber gold', 'color: 0xF26B43, // Coral Orange match');
fs.writeFileSync(jsFile, content, 'utf8');
console.log('Updated Three.js Gem Color');
