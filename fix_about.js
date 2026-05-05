const fs = require('fs');
let content = fs.readFileSync('about.html', 'utf8');

const oldStart = content.indexOf('    <!-- About Section -->');
const oldEnd = content.indexOf('    <!-- Footer -->');

if (oldStart === -1 || oldEnd === -1) {
    console.log('Markers not found. oldStart:', oldStart, 'oldEnd:', oldEnd);
    process.exit(1);
}

const newContent = `    <!-- About Section -->
    <section id="about-section" class="section-padding" style="position: relative; z-index: 10; background: #fff;">
        <div class="container">
            <div class="about-grid">
                <div>
                    <p style="color: #F26B43; font-weight: 700; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">WHO WE ARE</p>
                    <h2 class="section-title" style="text-align: left; font-size: 2.2rem; margin-bottom: 30px;">Vibrant India Trade: Your Premier B2B Platform for Houseware and Kitchen Utensils</h2>
                    <p style="margin-bottom: 20px; font-size: 1.05rem; color: #4b5563; line-height: 1.8;">
                        Vibrant India Trade is the parent company of <strong>Vibrant India Event Solution Pvt. Ltd (VIES)</strong>, renowned for its strong and trustworthy relationships with industry professionals nationwide. With nearly two decades of experience, VIES has established a robust legacy and network in the houseware industry.
                    </p>
                    <p style="margin-bottom: 20px; color: #64748b; line-height: 1.8;">
                        The company's portfolio includes the prestigious <strong>Vibrant India Magazine</strong> and the <strong>Vibrant India Trade Show</strong>, which unites various professionals in the houseware sector. VIES's international networking has expanded its audience globally.
                    </p>
                    <p style="margin-bottom: 20px; color: #64748b; line-height: 1.8;">
                        Leveraging this versatile niche and legacy, the Vibrant India Trade Portal has emerged as a leading online B2B platform for industry professionals in India. The portal offers a unique inquiry-based model, enabling users to discover a wide range of high-quality houseware and kitchen utensils from top manufacturers. It serves as a one-stop solution for all houseware, kitchenware, and kitchen utensil needs, providing convenient access to premium products.
                    </p>
                    <p style="color: #64748b; line-height: 1.8;">
                        Vibrant India Trade boasts the most extensive database of manufacturers, OEMs, importers, exporters, distributors, dealers, and traders in India — making it the most sought-after inquiry-based platform for the vast houseware and interior products industry. Experience the convenience and reliability of Vibrant India Trade — your ultimate destination for all your houseware and kitchen utensil needs.
                    </p>

                    <!-- Stats Row -->
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px;">
                        <div style="background: #f8fafc; border-radius: 16px; padding: 22px 20px; text-align: center; border: 1px solid #e2e8f0;">
                            <div style="font-size: 2rem; font-weight: 800; color: #F26B43;">20+</div>
                            <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px; font-weight: 600;">Years of Experience</div>
                        </div>
                        <div style="background: #f8fafc; border-radius: 16px; padding: 22px 20px; text-align: center; border: 1px solid #e2e8f0;">
                            <div style="font-size: 2rem; font-weight: 800; color: #0A2540;">50K+</div>
                            <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px; font-weight: 600;">Industry Professionals</div>
                        </div>
                        <div style="background: #f8fafc; border-radius: 16px; padding: 22px 20px; text-align: center; border: 1px solid #e2e8f0;">
                            <div style="font-size: 2rem; font-weight: 800; color: #F26B43;">Pan India</div>
                            <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px; font-weight: 600;">Network Reach</div>
                        </div>
                    </div>
                </div>
                <div class="about-img glass-card" style="padding: 15px; background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <img src="images/about_studio.png" alt="Vibrant India Trade" style="border-radius: 10px; width: 100%; height: 100%; object-fit: cover; min-height: 400px;">
                </div>
            </div>
        </div>
    </section>

    <!-- Mission & Vision -->
    <section class="section-padding" style="background: #0A2540; position: relative; z-index: 10; overflow: hidden;">
        <div style="position: absolute; width: 500px; height: 500px; border-radius: 50%; background: rgba(242,107,67,0.08); top: -100px; right: -100px; pointer-events: none;"></div>
        <div style="position: absolute; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.03); bottom: -50px; left: -50px; pointer-events: none;"></div>

        <div class="container">
            <div style="text-align: center; margin-bottom: 60px;">
                <p style="color: #F26B43; font-weight: 700; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">OUR PURPOSE</p>
                <h2 style="color: #fff; font-size: 2.2rem; font-weight: 800;">Mission &amp; Vision</h2>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <!-- Mission -->
                <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 45px 40px; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #F26B43, #f59e0b);"></div>
                    <div style="width: 60px; height: 60px; background: rgba(242,107,67,0.15); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                        <i class="fa-solid fa-bullseye" style="color: #F26B43; font-size: 1.5rem;"></i>
                    </div>
                    <p style="color: #F26B43; font-weight: 700; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px;">MISSION</p>
                    <h3 style="color: #fff; font-size: 1.4rem; margin-bottom: 20px; line-height: 1.3;">Revolutionizing the B2B Houseware Industry</h3>
                    <p style="color: #94a3b8; line-height: 1.8; font-size: 0.95rem;">
                        Our mission at Vibrant India Trade is to revolutionize the houseware and kitchen utensils industry by providing a seamless, efficient, and reliable B2B platform that connects industry professionals with top manufacturers. We strive to empower our users by offering a comprehensive range of high-quality products, fostering meaningful business relationships, and driving growth and innovation within the sector. Our commitment to excellence, integrity, and customer satisfaction sets us apart as the trusted partner for all houseware and kitchen utensil needs.
                    </p>
                </div>

                <!-- Vision -->
                <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 45px 40px; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #3b82f6, #8b5cf6);"></div>
                    <div style="width: 60px; height: 60px; background: rgba(59,130,246,0.15); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                        <i class="fa-solid fa-eye" style="color: #60a5fa; font-size: 1.5rem;"></i>
                    </div>
                    <p style="color: #60a5fa; font-weight: 700; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px;">VISION</p>
                    <h3 style="color: #fff; font-size: 1.4rem; margin-bottom: 20px; line-height: 1.3;">Leading Global B2B Platform for Houseware</h3>
                    <p style="color: #94a3b8; line-height: 1.8; font-size: 0.95rem;">
                        Our vision at Vibrant India Trade is to be the leading and most trusted B2B platform for houseware and kitchen utensils, globally recognized for our exceptional service, unparalleled product range, and innovative solutions. We aim to transform the way industry professionals source and supply products, creating a vibrant and interconnected ecosystem that drives progress and sustainability. By leveraging technology, fostering partnerships, and upholding the highest standards of quality and ethics, we envision a future where Vibrant India Trade is synonymous with excellence and success.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Supplier CTA Banner -->
    <section style="position: relative; z-index: 10; padding: 80px 0; background: #f8fafc;">
        <div class="container">
            <div style="background: linear-gradient(135deg, #0A2540 0%, #1a3a5c 100%); border-radius: 28px; padding: 60px 50px; display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; position: relative; overflow: hidden; box-shadow: 0 30px 80px rgba(10,37,64,0.25);">
                <div style="position: absolute; right: -50px; top: -50px; width: 300px; height: 300px; border-radius: 50%; background: rgba(242,107,67,0.1); pointer-events: none;"></div>
                <div style="flex: 1; min-width: 280px;">
                    <p style="color: #F26B43; font-weight: 700; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">
                        <i class="fa-solid fa-store" style="margin-right: 6px;"></i> BECOME A SUPPLIER
                    </p>
                    <h2 style="color: #fff; font-size: 2rem; font-weight: 800; line-height: 1.3; margin-bottom: 16px;">
                        Showcase Your Products &amp; Connect with Millions of Qualified Buyers Globally
                    </h2>
                    <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
                        Interested in becoming a supplier on the <strong style="color: #F26B43;">Vibrant India Trade</strong> Marketplace? List your products and reach thousands of B2B buyers across India and globally.
                    </p>
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 20px; color: #94a3b8; font-size: 0.9rem;">
                        <i class="fa-solid fa-phone" style="color: #F26B43;"></i>
                        <span>Any Question? Contact us at <strong style="color: #fff;">(+91) 992 448 8938</strong></span>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 16px; min-width: 200px;">
                    <a href="contact.html" style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #F26B43; color: #fff; font-weight: 800; font-size: 0.9rem; padding: 16px 30px; border-radius: 12px; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 6px 20px rgba(242,107,67,0.4);">
                        <i class="fa-solid fa-paper-plane"></i> Click to Contact Us
                    </a>
                    <a href="products.html" style="display: flex; align-items: center; justify-content: center; gap: 10px; background: rgba(255,255,255,0.1); color: #fff; font-weight: 700; font-size: 0.9rem; padding: 16px 30px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(255,255,255,0.2);">
                        <i class="fa-solid fa-list"></i> Listing Your Products
                    </a>
                </div>
            </div>
        </div>
    </section>

    `;

content = content.slice(0, oldStart) + newContent + content.slice(oldEnd);
fs.writeFileSync('about.html', content);
console.log('About page content fully replaced.');
