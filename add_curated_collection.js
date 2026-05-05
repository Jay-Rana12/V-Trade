const fs = require('fs');
const path = require('path');

const projectDir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const indexPath = path.join(projectDir, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const curatedSectionHtml = `
    <!-- Amazon Style Curated Collection Section -->
    <section class="curated-collection section-padding" style="background: #fff; padding: 100px 0;">
        <div class="container">
            <div class="section-header" style="text-align: left; margin-bottom: 50px;">
                <h2 class="section-title" style="font-size: 2.5rem; color: #0A2540; margin-bottom: 10px;">Our Curated Collection</h2>
                <p style="color: #6b7280; font-size: 1.1rem;">Top-rated premium steel essentials for your home and business.</p>
            </div>
            
            <div class="amazon-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px;">
                <!-- Product 1 -->
                <div class="amazon-product-card" style="background: #fdfdfd; border: 1px solid #eee; border-radius: 8px; padding: 20px; transition: all 0.3s ease; position: relative; overflow: hidden;">
                    <div style="width: 100%; height: 230px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                        <img src="images/curated_thali.png" alt="Steel Thali Set" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                    </div>
                    <h3 style="font-size: 1.15rem; color: #203544; margin-bottom: 8px; font-family: 'Poppins', sans-serif;">Royal 5-Piece Thali Set</h3>
                    <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 12px; color: #F59E0B;">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i>
                        <span style="color: #6b7280; font-size: 0.85rem; margin-left: 5px;">(4.8/5)</span>
                    </div>
                    <p style="color: #6b7280; font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px;">Premium 304 food-grade polished stainless steel dinnerware set.</p>
                    <a href="kitchenware.html" class="shop-now-btn" style="display: block; text-align: center; background: #F26B43; color: #fff; padding: 10px; border-radius: 4px; font-weight: 600; text-decoration: none; transition: background 0.3s;">Explore Details</a>
                </div>

                <!-- Product 2 -->
                <div class="amazon-product-card" style="background: #fdfdfd; border: 1px solid #eee; border-radius: 8px; padding: 20px; transition: all 0.3s ease;">
                    <div style="width: 100%; height: 230px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                        <img src="images/curated_pot.png" alt="Professional Chef Pot" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                    </div>
                    <h3 style="font-size: 1.15rem; color: #203544; margin-bottom: 8px; font-family: 'Poppins', sans-serif;">Induction Bottom Chef Pot</h3>
                    <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 12px; color: #F59E0B;">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                        <span style="color: #6b7280; font-size: 0.85rem; margin-left: 5px;">(5.0/5)</span>
                    </div>
                    <p style="color: #6b7280; font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px;">Heavy-duty 5.5L professional stockpot with copper bottom.</p>
                    <a href="kitchenware.html" class="shop-now-btn" style="display: block; text-align: center; background: #F26B43; color: #fff; padding: 10px; border-radius: 4px; font-weight: 600; text-decoration: none; transition: background 0.3s;">Explore Details</a>
                </div>

                <!-- Product 3 -->
                <div class="amazon-product-card" style="background: #fdfdfd; border: 1px solid #eee; border-radius: 8px; padding: 20px; transition: all 0.3s ease;">
                    <div style="width: 100%; height: 230px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                        <img src="images/curated_pitcher.png" alt="Steel Pitcher Set" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                    </div>
                    <h3 style="font-size: 1.15rem; color: #203544; margin-bottom: 8px; font-family: 'Poppins', sans-serif;">Elite Pitcher & Glass Duo</h3>
                    <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 12px; color: #F59E0B;">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                        <span style="color: #6b7280; font-size: 0.85rem; margin-left: 5px;">(4.2/5)</span>
                    </div>
                    <p style="color: #6b7280; font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px;">High-grade mirror finish pitcher for modern dining aesthetics.</p>
                    <a href="houseware.html" class="shop-now-btn" style="display: block; text-align: center; background: #F26B43; color: #fff; padding: 10px; border-radius: 4px; font-weight: 600; text-decoration: none; transition: background 0.3s;">Explore Details</a>
                </div>

                <!-- Product 4 -->
                <div class="amazon-product-card" style="background: #fdfdfd; border: 1px solid #eee; border-radius: 8px; padding: 20px; transition: all 0.3s ease;">
                    <div style="width: 100%; height: 230px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                        <img src="images/curated_chafing.png" alt="Commercial Chafing Dish" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                    </div>
                    <h3 style="font-size: 1.15rem; color: #203544; margin-bottom: 8px; font-family: 'Poppins', sans-serif;">Gourmet Chafing Station</h3>
                    <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 12px; color: #F59E0B;">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                        <span style="color: #6b7280; font-size: 0.85rem; margin-left: 5px;">(4.9/5)</span>
                    </div>
                    <p style="color: #6b7280; font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px;">Luxury catering chafing dish for elite Horeca environments.</p>
                    <a href="horeca.html" class="shop-now-btn" style="display: block; text-align: center; background: #F26B43; color: #fff; padding: 10px; border-radius: 4px; font-weight: 600; text-decoration: none; transition: background 0.3s;">Explore Details</a>
                </div>
            </div>
        </div>
    </section>
`;

if (!content.includes('Our Curated Collection')) {
    content = content.replace('<!-- Why Choose Us -->', curatedSectionHtml + '\n\n    <!-- Why Choose Us -->');
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('Added Curated Collection to index.html');
} else {
    console.log('Curated Collection already exists.');
}
