const fs = require('fs');
const path = require('path');

const projectDir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const imagesDir = path.join(projectDir, 'images');

// Source paths from Gemini AI Generation
const srcImages = [
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/stainless_steel_cookware_1773473992764.png',
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/horeca_supplies_1773474016029.png',
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/houseware_decor_1773474040373.png'
];

const destImages = [
    'kitchenware_steel.png',
    'horeca_display.png',
    'houseware_modern.png'
];

// Copy images
srcImages.forEach((src, idx) => {
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(imagesDir, destImages[idx]));
        console.log('Copied', destImages[idx]);
    } else {
        console.log('Missing source:', src);
    }
});

// Now inject the new gallery section into index.html
const indexPath = path.join(projectDir, 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf8');

const newGalleryHtml = `
    <!-- Featured Kitchenware Products Gallery -->
    <section class="kitchenware-gallery section-padding bg-light" style="background: #f8fafc;">
        <div class="container">
            <div class="section-header" style="text-align: center;">
                <h2 class="section-title">Featured Kitchenware & Supplies</h2>
                <p>Browse our extensive catalog of globally exported premium steel products</p>
            </div>
            
            <div class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; margin-top: 40px;">
                <!-- Product Card 1 -->
                <div class="gallery-card glass-card" style="border-radius: 12px; overflow: hidden; background: white; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                    <div style="width: 100%; height: 260px; overflow: hidden;">
                        <img src="images/kitchenware_steel.png" alt="Premium Kitchenware Bartans" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" class="hover-zoom">
                    </div>
                    <div style="padding: 25px;">
                        <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.3rem; margin-bottom: 10px; color: #0A2540;">Premium Indian Bartans</h3>
                        <p style="color: #6b7280; font-size: 0.95rem; margin-bottom: 20px;">Polished stainless steel pots, pans, and authentic Indian cooking utensils imported globally for home kitchens.</p>
                        <a href="kitchenware.html" style="color: #F26B43; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 8px;">Explore Range <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>

                <!-- Product Card 2 -->
                <div class="gallery-card glass-card" style="border-radius: 12px; overflow: hidden; background: white; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                    <div style="width: 100%; height: 260px; overflow: hidden;">
                        <img src="images/horeca_display.png" alt="Horeca Supplies" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" class="hover-zoom">
                    </div>
                    <div style="padding: 25px;">
                        <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.3rem; margin-bottom: 10px; color: #0A2540;">Luxury Horeca Trays</h3>
                        <p style="color: #6b7280; font-size: 0.95rem; margin-bottom: 20px;">Durable chafing dishes, hot cases, and serving stations engineered strictly for 5-star hospitality settings.</p>
                        <a href="horeca.html" style="color: #F26B43; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 8px;">Explore Range <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>

                <!-- Product Card 3 -->
                <div class="gallery-card glass-card" style="border-radius: 12px; overflow: hidden; background: white; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                    <div style="width: 100%; height: 260px; overflow: hidden;">
                        <img src="images/houseware_modern.png" alt="Modern Houseware DEcor" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" class="hover-zoom">
                    </div>
                    <div style="padding: 25px;">
                        <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.3rem; margin-bottom: 10px; color: #0A2540;">Minimalist Houseware</h3>
                        <p style="color: #6b7280; font-size: 0.95rem; margin-bottom: 20px;">Aesthetically focused steel bowls, plates, and home-decor pitcher setups matching contemporary interior styles.</p>
                        <a href="houseware.html" style="color: #F26B43; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 8px;">Explore Range <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            <div class="text-center" style="margin-top: 50px;">
                <a href="kitchenware.html" class="btn btn-primary" style="background:#F26B43; color: white; padding: 12px 30px; border-radius: 4px; font-weight: 600; font-family: 'Poppins', sans-serif; text-decoration: none; box-shadow: 0 10px 20px rgba(242, 107, 67, 0.3);">View Full Product Catalog</a>
            </div>
        </div>
    </section>
`;

// Insert the new gallery BEFORE the "Why Choose Us" section
if (!htmlContent.includes('Featured Kitchenware Products Gallery')) {
    htmlContent = htmlContent.replace('<!-- Why Choose Us -->', newGalleryHtml + '\n\n    <!-- Why Choose Us -->');
    fs.writeFileSync(indexPath, htmlContent, 'utf8');
    console.log('Injected Kitchenware Gallery successfully!');
} else {
    console.log('Gallery already exists.');
}
