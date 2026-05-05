const fs = require('fs');
const path = require('path');

const indexPath = 'c:/Users/AE/OneDrive/Desktop/redesign/index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Update Why Choose Us
content = content.replace(
    '<p>Proven track record of secure and timely cross-border transactions.</p>',
    '<p>Decades of mastery in forging premium-grade stainless steel kitchenware built to last.</p>'
);
content = content.replace(
    '<p>Deep understanding of international trade regulations and market trends.</p>',
    '<p>Our utensils and houseware designs are molded to fit modern global culinary standards.</p>'
);
content = content.replace(
    '<h4>Market Expertise</h4>',
    '<h4>Quality Craftsmanship</h4>'
);

content = content.replace(
    '<p>Established connections with major ports, suppliers, and carriers.</p>',
    '<p>Seamlessly exporting our durable products to over 50 countries without delays.</p>'
);
content = content.replace(
    '<h4>Global Network</h4>',
    '<h4>Global Export Reach</h4>'
);

// Update Testimonials
content = content.replace(
    '<p>"GlobalTrade transformed our export process. Their expertise saved us significant time and resources while expanding our market reach in Europe."</p>',
    '<p>"Their stainless steel bartans and cookware sets have completely elevated our restaurant chain\'s kitchen operations. Incredibly durable and beautiful finish."</p>'
);
content = content.replace(
    '<p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">CEO, AgriExports India</p>',
    '<p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Founder, Elite Hospitality</p>'
);

content = content.replace(
    '<p>"Exceptional logistics support. Their proactive approach in handling documentation and customs clearance ensures our industrial machinery arrives on time."</p>',
    '<p>"We heavily rely on GlobalTrade for our luxury houseware imports. The Horeca supplies they deliver are unmatched in quality and compliance."</p>'
);
content = content.replace(
    '<p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Operations Manager, TechMech</p>',
    '<p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Procurement Lead, Grand Hotels</p>'
);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Testimonials and Features updated for Kitchenware theme');
