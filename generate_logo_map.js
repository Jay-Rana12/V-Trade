const fs = require('fs');
const path = require('path');

const brandLogoDir = path.join(__dirname, 'admin/public/brand_logo');
const outputFile = path.join(__dirname, 'admin/src/brandLogoMap.json');

const files = fs.readdirSync(brandLogoDir);

const mapping = {};
files.forEach(file => {
  // e.g. "classic-enterprise.jpg" -> "classicenterprise"
  const nameWithoutExt = path.parse(file).name;
  const sanitizedName = nameWithoutExt.toLowerCase().replace(/[^a-z0-9]/g, '');
  mapping[sanitizedName] = `/brand_logo/${file}`;
});

fs.writeFileSync(outputFile, JSON.stringify(mapping, null, 2));
console.log('Successfully generated brandLogoMap.json with ' + Object.keys(mapping).length + ' logos.');
