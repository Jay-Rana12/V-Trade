const fs = require('fs');
const path = require('path');

const cssFile = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

content += `\n
/* Fix Layout Container Issues */
.premium-navbar {
    display: flex !important;
    justify-content: flex-end !important;
    width: 100% !important;
}

.premium-nav-container {
    width: auto !important;
    max-width: none !important;
    margin: 0 !important; 
    padding: 0 !important;
}

.top-banner-container {
    width: auto !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
}

.top-navbar-banner {
    display: flex !important;
    justify-content: flex-end !important;
    width: 100% !important;
}
`;

fs.writeFileSync(cssFile, content, 'utf8');
console.log('Fixed container margin bug');
