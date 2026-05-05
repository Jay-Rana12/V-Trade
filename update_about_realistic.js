const fs = require('fs');
const path = require('path');

const projectDir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const aboutPath = path.join(projectDir, 'about.html');
let content = fs.readFileSync(aboutPath, 'utf8');

// 1. Update Banner Image in CSS block
content = content.replace(
    /url\('images\/imported-img-4\.jpg'\)/,
    "url('images/about_banner.png')"
);

// 2. Update Page Header Content
content = content.replace(
    '<h1>About Our Company</h1>',
    '<h1>About GlobalTrade India</h1>'
);
content = content.replace(
    '<p>Pioneering international trade solutions since 2001.</p>',
    '<p>Excellence in Stainless Steel Kitchenware & Global Export Logistics.</p>'
);

// 3. Update Who We Are
const whoWeAreSection = `
                <div>
                    <h2 class="section-title">The Heart of Indian Steel</h2>
                    <p style="margin-bottom: 20px; font-size: 1.1rem; color: #4b5563;">GlobalTrade India is more than an export house; we are the guardians of a 25-year legacy in stainless steel craftsmanship.</p>
                    <p style="margin-bottom: 20px;">What started as a small workshop for traditional Indian bartans in Mumbai has evolved into a global powerhouse. We specialize in the design, manufacturing, and international distribution of high-grade 304 and 202 food-grade stainless steel kitchenware, Horeca supplies, and industrial tubes.</p>
                    <p style="margin-bottom: 20px;">Our commitment to precision engineering and superior polishing has made us the trusted partner for premium hospitality chains and household brands across 50+ countries. We blend traditional Indian durability with modern global aesthetics.</p>

                    <div style="margin-top: 40px; border-left: 4px solid #F26B43; padding-left: 20px;">
                        <h4 style="font-size: 1.2rem; margin-bottom: 10px;">Our Mission</h4>
                        <p>To redefine the world's perception of Indian kitchenware by delivering products that combine lifetime durability with contemporary elegance, ensuring every kitchen we touch becomes a center of excellence.</p>
                    </div>

                    <div style="margin-top: 30px; border-left: 4px solid #0A2540; padding-left: 20px;">
                        <h4 style="font-size: 1.2rem; margin-bottom: 10px;">Our Vision</h4>
                        <p>To become the world's most recognized brand for stainless steel utensils, setting the global benchmark for food-grade safety, environmental sustainability, and metallic craftsmanship.</p>
                    </div>
                </div>
                <div class="about-img glass-card" style="padding: 15px; background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <img src="images/about_studio.png" alt="Kitchenware Design Studio" style="border-radius: 10px; width: 100%; height: auto; object-fit: cover;">
                </div>`;

// Replace the old grid content
content = content.replace(/<div class="about-grid">[\s\S]*?<\/div>(\s*<\/div>\s*<\/section>)/, `<div class="about-grid">${whoWeAreSection}\n            </div>\n        </div>\n    </section>`);

// 4. Update Journey/Timeline
content = content.replace(
    '<h4>Company Foundation</h4>',
    '<h4>Founding & Metalwork Roots</h4>'
);
content = content.replace(
    '<p>Started operations in Mumbai handling local agricultural exports to the Middle East.</p>',
    '<p>Began as a boutique stainless steel polishing unit in Mumbai, serving local markets with traditional thali sets.</p>'
);

content = content.replace(
    '<h4>European Market Entry</h4>',
    '<h4>European Expansion & Horeca Launch</h4>'
);
content = content.replace(
    '<p>Established a primary logistics hub in Rotterdam, opening vast trade routes into Central Europe.</p>',
    '<p>Launched our premium Horeca line in Germany and the UK, supplying to top-tier Michelin-starred kitchens.</p>'
);

content = content.replace(
    '<h4>Digital Transformation</h4>',
    '<h4>Smart Manufacturing & Global Reach</h4>'
);
content = content.replace(
    '<p>Implemented AI-driven supply chain tracking and achieved 1500+ successful global shipments.</p>',
    '<p>Adopted robotic polishing and 100% automated QC, hitting the milestone of 5 million units exported worldwide annually.</p>'
);

fs.writeFileSync(aboutPath, content, 'utf8');
console.log('Updated about.html with Kitchenware focus and realistic images');
