
import os

path = r'c:\Users\AE\OneDrive\Desktop\redesign\horeca.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add modal.css
content = content.replace('<link rel="stylesheet" href="css/style.css">', 
                          '<link rel="stylesheet" href="css/style.css">\n    <link rel="stylesheet" href="css/modal.css">')

# 2. Update Grid
new_grid = """
            <div class="ts-grid">
                <!-- Product 1: Chafing Dishes -->
                <div class="ts-card">
                    <div class="ts-img-wrap" onclick="openModal('p3')">
                        <img src="images/curated_chafing.png" alt="Luxury Buffet Chafers" class="ts-img">
                        <div class="ts-sold-badge"><i class="fa-solid fa-fire"></i> 890 Sold</div>
                    </div>
                    <div class="ts-body">
                        <div class="ts-logo-row">
                            <div class="ts-company-logo-box">
                                <i class="fa-solid fa-gem"></i>
                                <span>INDIATRADE</span>
                            </div>
                            <span class="ts-cat-tag" style="background:#e6f4ea; color:#2d7a3a;">Horeca</span>
                        </div>
                        <h3 class="ts-name">Luxury Buffet Chafing Dishes <span class="ts-pieces" style="color:#2d7a3a; background:#e6f4ea;">4 Pcs</span></h3>
                        <p class="ts-desc">Industrial-grade stainless steel chafing dishes with hydraulic lids and induction-ready bases for sophisticated events.</p>
                        <div class="ts-sold-bar-wrap">
                            <div class="ts-sold-label"><span>Units Sold</span><strong>890 / 1,500</strong></div>
                            <div class="ts-sold-bar">
                                <div class="ts-sold-fill" style="width:59%; background: linear-gradient(90deg, #22c55e, #16a34a);"></div>
                            </div>
                        </div>
                        <div class="ts-footer">
                            <div class="ts-price"><span>Price range:</span> ₹2,100 – ₹3,400</div>
                            <div class="ts-actions">
                                <button class="ts-btn-detail" onclick="openModal('p3')"><i class="fa-solid fa-circle-info"></i> Details</button>
                                <button class="ts-btn-enquire" onclick="quickEnquiry('p3', event)"><i class="fa-solid fa-paper-plane"></i> Enquire</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product 2: Commercial Pitchers -->
                <div class="ts-card">
                    <div class="ts-img-wrap" onclick="openModal('p5')">
                        <img src="images/curated_pitcher.png" alt="Commercial Pitchers" class="ts-img">
                        <div class="ts-sold-badge"><i class="fa-solid fa-fire"></i> 3,100 Sold</div>
                    </div>
                    <div class="ts-body">
                        <div class="ts-logo-row">
                            <div class="ts-company-logo-box">
                                <i class="fa-solid fa-gem"></i>
                                <span>INDIATRADE</span>
                            </div>
                            <span class="ts-cat-tag" style="background:#e6f4ea; color:#2d7a3a;">Horeca</span>
                        </div>
                        <h3 class="ts-name">Commercial SS Mirror Pitchers <span class="ts-pieces" style="color:#2d7a3a; background:#e6f4ea;">1.5 L</span></h3>
                        <p class="ts-desc">Heavy-duty stainless steel pitchers and beverage dispensers with drip-free spouts and mirror finish for fine dining.</p>
                        <div class="ts-sold-bar-wrap">
                            <div class="ts-sold-label"><span>Units Sold</span><strong>3,100 / 4,000</strong></div>
                            <div class="ts-sold-bar">
                                <div class="ts-sold-fill" style="width:77%; background: linear-gradient(90deg, #22c55e, #16a34a);"></div>
                            </div>
                        </div>
                        <div class="ts-footer">
                            <div class="ts-price"><span>Price range:</span> ₹320 – ₹480</div>
                            <div class="ts-actions">
                                <button class="ts-btn-detail" onclick="openModal('p5')"><i class="fa-solid fa-circle-info"></i> Details</button>
                                <button class="ts-btn-enquire" onclick="quickEnquiry('p5', event)"><i class="fa-solid fa-paper-plane"></i> Enquire</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product 3: Gastronorm Pans -->
                <div class="ts-card">
                    <div class="ts-img-wrap" onclick="openModal('p6')">
                        <img src="images/horeca_gn_pans.png" alt="Industrial GN Pans" class="ts-img">
                        <div class="ts-sold-badge"><i class="fa-solid fa-fire"></i> 1,200 Sold</div>
                    </div>
                    <div class="ts-body">
                        <div class="ts-logo-row">
                            <div class="ts-company-logo-box">
                                <i class="fa-solid fa-gem"></i>
                                <span>INDIATRADE</span>
                            </div>
                            <span class="ts-cat-tag" style="background:#e6f4ea; color:#2d7a3a;">Horeca</span>
                        </div>
                        <h3 class="ts-name">Industrial GN Display Pans <span class="ts-pieces" style="color:#2d7a3a; background:#e6f4ea;">All Sizes</span></h3>
                        <p class="ts-desc">Standardized stainless steel pans for food storage and steam table use. Optimized for bulk transport.</p>
                        <div class="ts-sold-bar-wrap">
                            <div class="ts-sold-label"><span>Units Sold</span><strong>1,200 / 2,000</strong></div>
                            <div class="ts-sold-bar">
                                <div class="ts-sold-fill" style="width:60%; background: linear-gradient(90deg, #22c55e, #16a34a);"></div>
                            </div>
                        </div>
                        <div class="ts-footer">
                            <div class="ts-price"><span>Price range:</span> ₹3,200 – ₹5,800</div>
                            <div class="ts-actions">
                                <button class="ts-btn-detail" onclick="openModal('p6')"><i class="fa-solid fa-circle-info"></i> Details</button>
                                <button class="ts-btn-enquire" onclick="quickEnquiry('p6', event)"><i class="fa-solid fa-paper-plane"></i> Enquire</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product 4: Barware -->
                <div class="ts-card">
                    <div class="ts-img-wrap" onclick="openModal('p3')">
                        <img src="images/horeca_barware.png" alt="Professional Barware" class="ts-img">
                        <div class="ts-sold-badge"><i class="fa-solid fa-fire"></i> 540 Sold</div>
                    </div>
                    <div class="ts-body">
                        <div class="ts-logo-row">
                            <div class="ts-company-logo-box">
                                <i class="fa-solid fa-gem"></i>
                                <span>INDIATRADE</span>
                            </div>
                            <span class="ts-cat-tag" style="background:#e6f4ea; color:#2d7a3a;">Horeca</span>
                        </div>
                        <h3 class="ts-name">Professional SS Barware <span class="ts-pieces" style="color:#2d7a3a; background:#e6f4ea;">Premium</span></h3>
                        <p class="ts-desc">Double-walled ice buckets and cocktail shakers with brushed finishes for upscale hospitality environments.</p>
                        <div class="ts-sold-bar-wrap">
                            <div class="ts-sold-label"><span>Units Sold</span><strong>540 / 1,000</strong></div>
                            <div class="ts-sold-bar">
                                <div class="ts-sold-fill" style="width:54%; background: linear-gradient(90deg, #22c55e, #16a34a);"></div>
                            </div>
                        </div>
                        <div class="ts-footer">
                            <div class="ts-price"><span>Price range:</span> ₹2,100 – ₹3,400</div>
                            <div class="ts-actions">
                                <button class="ts-btn-detail" onclick="openModal('p3')"><i class="fa-solid fa-circle-info"></i> Details</button>
                                <button class="ts-btn-enquire" onclick="quickEnquiry('p3', event)"><i class="fa-solid fa-paper-plane"></i> Enquire</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product 5: Serving Trays -->
                <div class="ts-card">
                    <div class="ts-img-wrap" onclick="openModal('p6')">
                        <img src="images/horeca_serving.png" alt="Elite Serving Trays" class="ts-img">
                        <div class="ts-sold-badge"><i class="fa-solid fa-fire"></i> 2,100 Sold</div>
                    </div>
                    <div class="ts-body">
                        <div class="ts-logo-row">
                            <div class="ts-company-logo-box">
                                <i class="fa-solid fa-gem"></i>
                                <span>INDIATRADE</span>
                            </div>
                            <span class="ts-cat-tag" style="background:#e6f4ea; color:#2d7a3a;">Horeca</span>
                        </div>
                        <h3 class="ts-name">Elite Serving Trays Set <span class="ts-pieces" style="color:#2d7a3a; background:#e6f4ea;">Luxury</span></h3>
                        <p class="ts-desc">Modern, non-slip stainless steel trays and cake stands with high-gloss finishes for premium catering events.</p>
                        <div class="ts-sold-bar-wrap">
                            <div class="ts-sold-label"><span>Units Sold</span><strong>2,100 / 3,000</strong></div>
                            <div class="ts-sold-bar">
                                <div class="ts-sold-fill" style="width:70%; background: linear-gradient(90deg, #22c55e, #16a34a);"></div>
                            </div>
                        </div>
                        <div class="ts-footer">
                            <div class="ts-price"><span>Price range:</span> ₹3,200 – ₹5,800</div>
                            <div class="ts-actions">
                                <button class="ts-btn-detail" onclick="openModal('p6')"><i class="fa-solid fa-circle-info"></i> Details</button>
                                <button class="ts-btn-enquire" onclick="quickEnquiry('p6', event)"><i class="fa-solid fa-paper-plane"></i> Enquire</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>"""

import re
content = re.sub(r'<div class="product-grid">.*?</div>', new_grid, content, flags=re.DOTALL)

# 3. Add Scripts and Remove old modal
content = content.replace('<script src="js/main.js"></script>', 
                          '<script src="js/products_data.js"></script>\n    <script src="js/main.js"></script>')

if 'js/modal_system.js' not in content:
    content = content.replace('</body>', '<script src="js/modal_system.js"></script>\n</body>')

# Remove old internal modal and scripts
content = re.sub(r'<!-- Dynamic Horeca Modal -->.*?<script>.*?</script>', '<!-- Modal and Logic handled by modal_system.js -->', content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
