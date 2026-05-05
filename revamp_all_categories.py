
import os
import re

def patch_file(filename, category_name):
    path = os.path.join(r'c:\Users\AE\OneDrive\Desktop\redesign', filename)
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
        
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add modal.css and products_data.js/modal_system.js
    if 'css/modal.css' not in content:
        content = content.replace('<link rel="stylesheet" href="css/style.css">', 
                                  '<link rel="stylesheet" href="css/style.css">\n    <link rel="stylesheet" href="css/modal.css">')
    
    if 'js/products_data.js' not in content:
        content = content.replace('<script src="js/main.js"></script>', 
                                  '<script src="js/products_data.js"></script>\n    <script src="js/main.js"></script>')
                                  
    if 'js/modal_system.js' not in content:
        content = content.replace('</body>', '<script src="js/modal_system.js"></script>\n</body>')

    # 2. Identify and Replace the Grid
    # We look for the start of the grid and replace everything until the end of the section
    # This is safer than re.DOTALL with </div> which is ambiguous
    
    # Define IDs based on category
    if category_name == 'Horeca':
        ids = ['p3', 'p5', 'p6', 'p3', 'p6']
        titles = ["Luxury Buffet Chafers", "Commercial SS Pitchers", "Industrial GN Pans", "Professional Barware", "Elite Serving Trays"]
        imgs = ["images/curated_chafing.png", "images/curated_pitcher.png", "images/horeca_gn_pans.png", "images/horeca_barware.png", "images/horeca_serving.png"]
        descs = [
            "Industrial-grade stainless steel chafing dishes with hydraulic lids and induction-ready bases.",
            "Heavy-duty stainless steel pitchers and beverage dispensers with drip-free spouts and mirror finish.",
            "Standardized stainless steel GN pans for food storage and steam tables. Anti-jamming design.",
            "Double-walled ice buckets and cocktail shakers with brushed finishes for upscale hospitality.",
            "Modern, non-slip stainless steel trays and cake stands with high-gloss finishes for catering."
        ]
        prices = ["₹2,100 – ₹3,400", "₹320 – ₹480", "₹3,200 – ₹5,800", "₹2,100 – ₹3,400", "₹3,200 – ₹5,800"]
        sold = ["890 / 1,500", "3,100 / 4,000", "1,200 / 2,000", "540 / 1,000", "2,100 / 3,000"]
        fills = ["59%", "77%", "60%", "54%", "70%"]
        cats = ["Horeca", "Horeca", "Horeca", "Horeca", "Horeca"]
        subtitles = ["4 Pcs", "1.5 L", "All Sizes", "Premium", "Luxury"]
    elif category_name == 'Kitchenware':
        ids = ['p1', 'p2', 'p1', 'p3', 'p5']
        titles = ["Premium Dinner Sets", "Industrial Cookware", "Traditional Thali Set", "Commercial Catering", "Designer Tableware"]
        imgs = ["images/topseller_thali.png", "images/curated_pot.png", "images/curated_thali.png", "images/curated_chafing.png", "images/curated_pitcher.png"]
        descs = [
            "Sleek, mirror-finished stainless steel dinnerware designed for durability and elegance.",
            "Heavy-gauge pots, pans, and induction-friendly cookware. Built for professional kitchens.",
            "Authentic Indian dining experience with our handcrafted thali sets. Export-grade quality.",
            "Exclusive chafing dishes and serving stations for high-end Horeca clients.",
            "Modern pitchers, water jugs, and serving accessories. Combining aesthetic appeal with grade."
        ]
        prices = ["₹480 – ₹720", "₹1,850 – ₹2,600", "₹480 – ₹720", "₹2,100 – ₹3,400", "₹320 – ₹480"]
        sold = ["1,240 / 2,000", "2,050 / 2,500", "1,100 / 1,500", "670 / 1,000", "3,100 / 4,000"]
        fills = ["62%", "82%", "73%", "67%", "77%"]
        cats = ["Kitchenware", "Kitchenware", "Kitchenware", "Kitchenware", "Kitchenware"]
        subtitles = ["7 Pcs", "5 Pcs", "6 Pcs", "4 Pcs", "1.5 L"]
    elif category_name == 'Houseware':
        ids = ['p4', 'p4', 'p4', 'p4', 'p4']
        titles = ["Luxury Lunch Systems", "Artisan Kitchen Canisters", "Elite Mixing Solutions", "Global Storage Set", "Designer Tableware"]
        imgs = ["images/houseware_lunch_box.png", "images/houseware_canisters.png", "images/houseware_mixing_bowls.png", "images/houseware_containers.png", "images/houseware_modern.png"]
        descs = [
            "Vacuum-sealed 3-tier stainless steel lunch boxes with airtight silicone technology.",
            "Brushed metal finish canisters with eco-friendly bamboo lids for stylish storage.",
            "Heavy-gauge steel bowls with non-skid bases and measurements for professional cooking.",
            "Stackable, airtight containers with transparent lids for effortless organization.",
            "Innovative double-walled stainless steel bowls that maintain serving temperatures."
        ]
        prices = ["₹950 – ₹1,400", "₹950 – ₹1,400", "₹950 – ₹1,400", "₹950 – ₹1,400", "₹950 – ₹1,400"]
        sold = ["1,620 / 2,000", "980 / 1,200", "750 / 1,000", "2,300 / 3,000", "1,100 / 1,500"]
        fills = ["81%", "81%", "75%", "76%", "73%"]
        cats = ["Houseware", "Houseware", "Houseware", "Houseware", "Houseware"]
        subtitles = ["3 Tier", "6 Pcs", "Set of 3", "5 Pcs", "Premium"]
    else:
        return

    cards_html = ""
    for i in range(len(ids)):
        cards_html += f"""
                <div class="ts-card">
                    <div class="ts-img-wrap" onclick="openModal('{ids[i]}')">
                        <img src="{imgs[i]}" alt="{titles[i]}" class="ts-img">
                        <div class="ts-sold-badge"><i class="fa-solid fa-fire"></i> {sold[i].split(' / ')[0]} Sold</div>
                    </div>
                    <div class="ts-body">
                        <div class="ts-logo-row">
                            <div class="ts-company-logo-box">
                                <i class="fa-solid fa-gem"></i>
                                <span>INDIATRADE</span>
                            </div>
                            <span class="ts-cat-tag">{cats[i]}</span>
                        </div>
                        <h3 class="ts-name">{titles[i]} <span class="ts-pieces">{subtitles[i]}</span></h3>
                        <p class="ts-desc">{descs[i]}</p>
                        <div class="ts-sold-bar-wrap">
                            <div class="ts-sold-label"><span>Units Sold</span><strong>{sold[i]}</strong></div>
                            <div class="ts-sold-bar">
                                <div class="ts-sold-fill" style="width:{fills[i]};"></div>
                            </div>
                        </div>
                        <div class="ts-footer">
                            <div class="ts-price"><span>Price range:</span> {prices[i]}</div>
                            <div class="ts-actions">
                                <button class="ts-btn-detail" onclick="openModal('{ids[i]}')"><i class="fa-solid fa-circle-info"></i> Details</button>
                                <button class="ts-btn-enquire" onclick="quickEnquiry('{ids[i]}', event)"><i class="fa-solid fa-paper-plane"></i> Enquire</button>
                            </div>
                        </div>
                    </div>
                </div>"""

    new_grid_html = f'<div class="ts-grid">{cards_html}\n            </div>'
    
    # Regex to catch the ENTIRE product-grid div (from opening to last closing)
    # We find the first <div class="product-grid"> and the next section start or footer or similar large marker
    content = re.sub(r'<div class="product-grid">.*?</div>\s*</div>\s*</section>', new_grid_html + '\n        </div>\n    </section>', content, flags=re.DOTALL)
    
    # Remove old internal modal/script blocks
    content = re.sub(r'<!-- Dynamic.*?Modal -->.*?<div id="quickViewModal".*?</div>', '<!-- Modal managed by modal_system.js -->', content, flags=re.DOTALL)
    content = re.sub(r'<script>\s*// Modal Logic.*?document\.addEventListener.*?\}\);\s*</script>', '<!-- Logic managed by modal_system.js -->', content, flags=re.DOTALL)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Patched {filename}")

patch_file('horeca.html', 'Horeca')
patch_file('kitchenware.html', 'Kitchenware')
patch_file('houseware.html', 'Houseware')
patch_file('products.html', 'Kitchenware') # Products can also be Kitchenware style
patch_file('tubes-pipes.html', 'Kitchenware') 
patch_file('raw-materials.html', 'Kitchenware')
