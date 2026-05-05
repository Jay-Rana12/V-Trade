
const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Search Bubble
content = content.replace(/background: #2a4154;[\s\S]*?\/\* Lighter slate \*\//, "background: #ffffff; /* Premium White */");
content = content.replace(/border: 1px solid rgba\(255, 255, 255, 0\.1\);/, "border: 1px solid rgba(0, 0, 0, 0.1);");
content = content.replace(/background: #314b61;[\s\S]*?border-color: #F26B43;/, "background: #ffffff; border-color: #F26B43; box-shadow: 0 0 0 4px rgba(242, 107, 67, 0.1);");

// 2. Update Input and Placeholder
content = content.replace(/color: #FFFFFF;/, "color: #0A2540;");
content = content.replace(/color: rgba\(255, 255, 255, 0\.7\);/, "color: #64748b;");

// 3. Update Icon colors
content = content.replace(/\.search-btn-icon \{[\s\S]*?color: white;/, ".search-btn-icon {\n  background: transparent;\n  border: none;\n  color: #0A2540;");
content = content.replace(/\.mic-btn-icon \{[\s\S]*?color: white;/, ".mic-btn-icon {\n  background: transparent;\n  border: none;\n  color: #0A2540;");

// 4. Update Location indicator (if any)
content = content.replace(/\.location-indicator \{[\s\S]*?color: rgba\(255, 255, 255, 0\.6\);/, ".location-indicator {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 15px;\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\n  color: #64748b;");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Patched style.css');
