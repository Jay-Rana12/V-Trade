const fs = require('fs');
const path = require('path');

const cssFile = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

content += `\n
/* Force Navlinks Visibility */
.premium-nav-links {
    opacity: 1 !important;
    visibility: visible !important;
    display: flex !important;
}

.nav-item {
    opacity: 1 !important;
    visibility: visible !important;
    display: inline-block !important;
}

.categories-dropdown {
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
}

@media (max-width: 992px) {
    .premium-nav-links {
        display: none !important;
    }
    .premium-nav-links.active {
        display: flex !important;
    }
    .nav-item {
        display: block !important;
    }
}
`;

fs.writeFileSync(cssFile, content, 'utf8');
console.log('Forced visibility in CSS for all nav items');
