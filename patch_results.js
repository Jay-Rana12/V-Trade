
const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign', 'results.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add modal_system.js
if (!content.includes('js/modal_system.js')) {
    content = content.replace('<script src="js/main.js"></script>', 
                              '<script src="js/modal_system.js"></script>\n    <script src="js/main.js"></script>');
}

// 2. Add products_data.js
if (!content.includes('js/products_data.js')) {
    content = content.replace('<script src="js/modal_system.js"></script>', 
                              '<script src="js/products_data.js"></script>\n    <script src="js/modal_system.js"></script>');
}

// 3. Update the innerHTML logic in renderFilteredResults
// Replace the old res-card template with ts-card template
const oldCardTarget = "`\n                    <div class=\"res-card\" style=\"position:relative;\">";
const newCardTemplate = "`\n                    <div class=\"ts-card\">\n                        <div class=\"ts-img-wrap\" onclick=\"openModal('${p.id}')\">\n                            <img src=\"${displayImg}\" alt=\"${p.title}\" class=\"ts-img\">\n                            ${trendingBadgeHtml}\n                        </div>\n                        <div class=\"ts-body\">\n                            <div class=\"ts-logo-row\">\n                                <div class=\"ts-company-logo-box\"><i class=\"fa-solid fa-gem\"></i><span>INDIATRADE</span></div>\n                                ${catPill}\n                            </div>\n                            <h3 class=\"ts-name\">${p.title} <span class=\"ts-pieces\">Premium</span></h3>\n                            <p class=\"ts-desc\">${(p.description || \"Premium industrial grade product exported directly from certified manufacturers.\").substring(0, 100)}...</p>\n                            <div class=\"ts-sold-bar-wrap\">\n                                <div class=\"ts-sold-label\"><span>Units Sold</span><strong>1,240 / 2,000</strong></div>\n                                <div class=\"ts-sold-bar\"><div class=\"ts-sold-fill\" style=\"width:62%;\"></div></div>\n                            </div>\n                            <div class=\"ts-footer\">\n                                <div class=\"ts-price\"><span>Price range:</span> ${displayPrice}</div>\n                                <div class=\"ts-actions\">\n                                    <button onclick=\"openModal('${p.id}')\" class=\"ts-btn-detail\"><i class=\"fa-solid fa-circle-info\"></i> Details</button>\n                                    <button onclick=\"handleEnquiry('${p.id}', this)\" class=\"ts-btn-enquire\"><i class=\"fa-solid fa-paper-plane\"></i> Enquire</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>`";

// We need to replace the whole block inside forEach
const forEachBlockStart = "finalProducts.forEach((p, index) => {";
const forEachBlockEnd = "});"; // Careful, there are many });

// I'll just replace the specific grid.innerHTML assignment
content = content.replace(/grid\.innerHTML \+= `[\s\S]*?<\/div>\s*<\/div>`;/g, "grid.innerHTML += " + newCardTemplate + ";");

// Also update the Trending badge to be a ts-sold-badge style
content = content.replace(/const trendingBadgeHtml = \(index < 3\) \? `[\s\S]*?<\/div>` : '';/, 
                          "const trendingBadgeHtml = (index < 3) ? `<div class=\"ts-sold-badge\"><i class=\"fa-solid fa-arrow-trend-up\"></i> Trending #${index+1}</div>` : '';");

// Update catPill to use ts-cat-tag class
content = content.replace("background:#e0f2fe; color:#0284c7; padding:4px 10px; border-radius:20px; font-size:0.7rem; font-weight:700; text-transform:capitalize;", "");
content = content.replace('const catPill = p.category ? `<div style="display:inline-block; margin-bottom:10px; background:#e0f2fe; color:#0284c7; padding:4px 10px; border-radius:20px; font-size:0.7rem; font-weight:700; text-transform:capitalize;">${p.category}</div>` : \'\';',
                          'const catPill = p.category ? `<span class="ts-cat-tag">${p.category}</span>` : \'\';');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Patched results.html');
