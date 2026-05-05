const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'admin/src/pages/Brands.jsx');
let content = fs.readFileSync(file, 'utf8');

// The incorrect line is exactly: "  import brandLogoMap from '../brandLogoMap.json';\n"
content = content.replace(/  import brandLogoMap from '\.\.\/brandLogoMap\.json';\r?\n/g, '');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed inline import syntax error.');
