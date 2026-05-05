const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'admin/src/pages/Brands.jsx');
let content = fs.readFileSync(file, 'utf8');

// Find the img tag with the brand logo src
const imgSrcPattern = 'src={resolveImage(brand.logo) || localLogo}';
const imgIdx = content.indexOf(imgSrcPattern);

if (imgIdx === -1) {
  console.log('ERROR: img src pattern not found');
  process.exit(1);
}

// Walk back to find opening <div of the logo container (2 levels up)
// The structure is: <div (container)>\n    <img .../>\n    <div .../>\n</div>
// Find the last '<div' before the img tag
let containerStart = content.lastIndexOf('<div', imgIdx);
// That's the inner img container. Walk back once more for potential wrapper
let outerContainerSearch = content.lastIndexOf('<div', containerStart - 1);

// The logo container div starts at containerStart
const containerDivLine = containerStart;

// Find the end: two closing </div> after the img tag
const imgEnd = content.indexOf('/>', imgIdx) + 2;
const firstClosingDiv = content.indexOf('</div>', imgEnd) + 6;
const containerClosingDiv = content.indexOf('</div>', firstClosingDiv) + 6;

const oldBlock = content.substring(containerStart, containerClosingDiv);
console.log('=== OLD BLOCK ===');
console.log(JSON.stringify(oldBlock));

const newBlock = `<div style={{ width: '60px', height: '60px', background: '#f1f5f9', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <BrandLogo brand={brand} localLogo={localLogo} />
                 </div>`;

content = content.substring(0, containerStart) + newBlock + content.substring(containerClosingDiv);

fs.writeFileSync(file, content, 'utf8');
console.log('\n=== SUCCESS: BrandLogo component applied ===');
