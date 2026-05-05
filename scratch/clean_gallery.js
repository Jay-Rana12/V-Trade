const fs = require('fs');
const path = 'c:/xampp/htdocs/redesign/gallery.html';
let content = fs.readFileSync(path, 'utf8');

const startMarker = '<div class="trend-grid" id="trend-grid">';
const endMarker = '</div>'; // We need to find the correct ending tag for the grid

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Could not find start marker');
    process.exit(1);
}

// Find the corresponding closing </div> for the trend-grid
let openDivs = 0;
let endIndex = -1;
let searchIndex = startIndex;

// Simple parser to find the matching closing tag
while (searchIndex < content.length) {
    const nextOpen = content.indexOf('<div', searchIndex);
    const nextClose = content.indexOf('</div>', searchIndex);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
        openDivs++;
        searchIndex = nextOpen + 4;
    } else {
        openDivs--;
        if (openDivs === 0) {
            endIndex = nextClose;
            break;
        }
        searchIndex = nextClose + 6;
    }
}

if (endIndex === -1) {
    console.error('Could not find end marker');
    process.exit(1);
}

const partBefore = content.substring(0, startIndex + startMarker.length);
const partAfter = content.substring(endIndex);

const newContent = partBefore + '\n                <!-- Trending products load dynamically here -->\n            ' + partAfter;

fs.writeFileSync(path, newContent);
console.log('Successfully updated gallery.html');
