
const fs = require('fs');
const path = require('path');

function patchFile(filename, categoryName) {
    const filePath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign', filename);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add modal.css and products_data.js/modal_system.js
    if (!content.includes('css/modal.css')) {
        content = content.replace('<link rel="stylesheet" href="css/style.css">', 
                                  '<link rel="stylesheet" href="css/style.css">\n    <link rel="stylesheet" href="css/modal.css">');
    }
    
    if (!content.includes('js/products_data.js')) {
        content = content.replace('<script src="js/main.js"></script>', 
                                  '<script src="js/products_data.js"></script>\n    <script src="js/main.js"></script>');
    }
                                  
    if (!content.includes('js/modal_system.js')) {
        content = content.replace('</body>', '<script src="js/modal_system.js"></script>\n</body>');
    }

    // 2. Identify and Replace the Grid
    let ids, titles, imgs, descs, prices, sold, fills, cats, subtitles;
    
    if (categoryName === 'Horeca') {
        ids = ['p3', 'p5', 'p6', 'p3', 'p6'];
        titles = ["Luxury Buffet Chafers", "Commercial SS Pitchers", "Industrial GN Pans", "Professional Barware", "Elite Serving Trays"];
        imgs = ["images/curated_chafing.png", "images/curated_pitcher.png", "images/horeca_gn_pans.png", "images/horeca_barware.png", "images/horeca_serving.png"];
        descs = [
            "Industrial-grade stainless steel chafing dishes with hydraulic lids and induction-ready bases.",
            "Heavy-duty stainless steel pitchers and beverage dispensers with drip-free spouts and mirror finish.",
            "Standardized stainless steel GN pans for food storage and steam tables. Anti-jamming design.",
            "Double-walled ice buckets and cocktail shakers with brushed finishes for upscale hospitality.",
            "Modern, non-slip stainless steel trays and cake stands with high-gloss finishes for catering."
        ];
        prices = ["₹2,100 – ₹3,400", "₹320 – ₹480", "₹3,200 – ₹5,800", "₹2,100 – ₹3,400", "₹3,200 – ₹5,800"];
        sold = ["890 / 1,500", "3,100 / 4,000", "1,200 / 2,000", "540 / 1,000", "2,100 / 3,000"];
        fills = ["59%", "77%", "60%", "54%", "70%"];
        cats = ["Horeca", "Horeca", "Horeca", "Horeca", "Horeca"];
        subtitles = ["4 Pcs", "1.5 L", "All Sizes", "Premium", "Luxury"];
    } else if (categoryName === 'Kitchenware') {
        ids = ['p1', 'p2', 'p1', 'p3', 'p5'];
        titles = ["Premium Dinner Sets", "Industrial Cookware", "Traditional Thali Set", "Commercial Catering", "Designer Tableware"];
        imgs = ["images/topseller_thali.png", "images/curated_pot.png", "images/curated_thali.png", "images/curated_chafing.png", "images/curated_pitcher.png"];
        descs = [
            "Sleek, mirror-finished stainless steel dinnerware designed for durability and elegance.",
            "Heavy-gauge pots, pans, and induction-friendly cookware. Built for professional kitchens.",
            "Authentic Indian dining experience with our handcrafted thali sets. Export-grade quality.",
            "Exclusive chafing dishes and serving stations for high-end Horeca clients.",
            "Modern pitchers, water jugs, and serving accessories. Combining aesthetic appeal with grade."
        ];
        prices = ["₹480 – ₹720", "₹1,850 – ₹2,600", "₹480 – ₹720", "₹2,100 – ₹3,400", "₹320 – ₹480"];
        sold = ["1,240 / 2,000", "2,050 / 2,500", "1,100 / 1,500", "670 / 1,000", "3,100 / 4,000"];
        fills = ["62%", "82%", "73%", "67%", "77%"];
        cats = ["Kitchenware", "Kitchenware", "Kitchenware", "Kitchenware", "Kitchenware"];
        subtitles = ["7 Pcs", "5 Pcs", "6 Pcs", "4 Pcs", "1.5 L"];
    } else if (categoryName === 'Houseware') {
        ids = ['p4', 'p4', 'p4', 'p4', 'p4'];
        titles = ["Luxury Lunch Systems", "Artisan Kitchen Canisters", "Elite Mixing Solutions", "Global Storage Set", "Designer Tableware"];
        imgs = ["images/houseware_lunch_box.png", "images/houseware_canisters.png", "images/houseware_mixing_bowls.png", "images/houseware_containers.png", "images/houseware_modern.png"];
        descs = [
            "Vacuum-sealed 3-tier stainless steel lunch boxes with airtight silicone technology.",
            "Brushed metal finish canisters with eco-friendly bamboo lids for stylish storage.",
            "Heavy-gauge steel bowls with non-skid bases and measurements for professional cooking.",
            "Stackable, airtight containers with transparent lids for effortless organization.",
            "Innovative double-walled stainless steel bowls that maintain serving temperatures."
        ];
        prices = ["₹950 – ₹1,400", "₹950 – ₹1,400", "₹950 – ₹1,400", "₹950 – ₹1,400", "₹950 – ₹1,400"];
        sold = ["1,620 / 2,000", "980 / 1,200", "750 / 1,000", "2,300 / 3,000", "1,100 / 1,500"];
        fills = ["81%", "81%", "75%", "76%", "73%"];
        cats = ["Houseware", "Houseware", "Houseware", "Houseware", "Houseware"];
        subtitles = ["3 Tier", "6 Pcs", "Set of 3", "5 Pcs", "Premium"];
    } else {
        return;
    }

    let cardsHtml = "";
    for (let i = 0; i < ids.length; i++) {
        cardsHtml += `
                <div class="ts-card">
                    <div class="ts-img-wrap" onclick="openModal('${ids[i]}')">
                        <img src="${imgs[i]}" alt="${titles[i]}" class="ts-img">
                        <div class="ts-sold-badge"><i class="fa-solid fa-fire"></i> ${sold[i].split(' / ')[0]} Sold</div>
                    </div>
                    <div class="ts-body">
                        <div class="ts-logo-row">
                            <div class="ts-company-logo-box">
                                <i class="fa-solid fa-gem"></i>
                                <span>INDIATRADE</span>
                            </div>
                            <span class="ts-cat-tag">${cats[i]}</span>
                        </div>
                        <h3 class="ts-name">${titles[i]} <span class="ts-pieces">${subtitles[i]}</span></h3>
                        <p class="ts-desc">${descs[i]}</p>
                        <div class="ts-sold-bar-wrap">
                            <div class="ts-sold-label"><span>Units Sold</span><strong>${sold[i]}</strong></div>
                            <div class="ts-sold-bar">
                                <div class="ts-sold-fill" style="width:${fills[i]};"></div>
                            </div>
                        </div>
                        <div class="ts-footer">
                            <div class="ts-price"><span>Price range:</span> ${prices[i]}</div>
                            <div class="ts-actions">
                                <button class="ts-btn-detail" onclick="openModal('${ids[i]}')"><i class="fa-solid fa-circle-info"></i> Details</button>
                                <button class="ts-btn-enquire" onclick="quickEnquiry('${ids[i]}', event)"><i class="fa-solid fa-paper-plane"></i> Enquire</button>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    const newGridHtml = `<div class="ts-grid">${cardsHtml}\n            </div>`;
    
    // Replace the product-grid block
    const gridRegex = /<div class="product-grid">[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/section>/;
    content = content.replace(gridRegex, newGridHtml + '\n        </div>\n    </section>');
    
    // Remove old internal modal/script blocks
    content = content.replace(/<!-- Dynamic[\s\S]*?Modal -->[\s\S]*?<div id="quickViewModal"[\s\S]*?<\/div>/g, '<!-- Modal handled by modal_system.js -->');
    content = content.replace(/<script>[\s\S]*?\/\/ Modal Logic[\s\S]*?document\.addEventListener[\s\S]*?\}\);[\s\S]*?<\/script>/g, '<!-- Logic handled by modal_system.js -->');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched ${filename}`);
}

patchFile('horeca.html', 'Horeca');
patchFile('kitchenware.html', 'Kitchenware');
patchFile('houseware.html', 'Houseware');
patchFile('products.html', 'Kitchenware');
patchFile('tubes-pipes.html', 'Kitchenware'); 
patchFile('raw-materials.html', 'Kitchenware');
