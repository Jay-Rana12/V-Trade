const fs = require('fs');
const path = require('path');

const indexPath = 'c:/Users/AE/OneDrive/Desktop/redesign/index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Title
content = content.replace(
    '<title>GlobalTrade India - Connecting India to Global Trade Opportunities</title>',
    '<title>GlobalTrade India - Premium Kitchenware & Steel Bartans</title>'
);

// Hero
content = content.replace(
    '<h1>Connecting India to Global Trade Opportunities</h1>',
    '<h1>Premium Quality Kitchenware & Steel Bars from India</h1>'
);
content = content.replace(
    '<p>Premium export consulting, import services, and worldwide logistics management for businesses looking to scale internationally.</p>',
    '<p>Exporting world-class stainless steel utensils (Bartans), Horeca supplies, houseware, and industrial raw materials to global markets with unmatched quality.</p>'
);
content = content.replace(
    '<a href="services.html" class="btn btn-primary">Explore Services</a>',
    '<a href="kitchenware.html" class="btn btn-primary">Explore Kitchenware</a>'
);

// Counters
content = content.replace(
    '<p>Successful Shipments</p>',
    '<p>Product Varieties</p>'
);

// Services / Verticals
content = content.replace(
    '<h2 class="section-title">Our Trade Services</h2>',
    '<h2 class="section-title">Our Key Product Verticals</h2>'
);
content = content.replace(
    '<p>Comprehensive solutions for seamless international trade</p>',
    '<p>Comprehensive steel product ranges for home, commercial, and industrial use</p>'
);

// Service Card 1
content = content.replace(
    '<div class="service-icon"><i class="fa-solid fa-ship"></i></div>',
    '<div class="service-icon"><i class="fa-solid fa-utensils"></i></div>'
);
content = content.replace(
    '<h3>Export Consulting</h3>',
    '<h3>Kitchenware & Bartans</h3>'
);
content = content.replace(
    '<p>Strategic guidance to expand your business presence in global markets efficiently.</p>',
    '<p>High-grade stainless steel utensils, cookware, and everyday kitchen essentials crafted for durability.</p>'
);

// Service Card 2
content = content.replace(
    '<div class="service-icon"><i class="fa-solid fa-boxes-stacked"></i></div>',
    '<div class="service-icon"><i class="fa-solid fa-bell-concierge"></i></div>'
);
content = content.replace(
    '<h3>Import Services</h3>',
    '<h3>Horeca Supplies</h3>'
);
content = content.replace(
    '<p>End-to-end import solutions handling compliance, logistics, and documentation.</p>',
    '<p>Premium chafing dishes, service trays, and commercial setups for Hotels, Restaurants, and Cafes.</p>'
);

// Service Card 3
content = content.replace(
    '<div class="service-icon"><i class="fa-solid fa-truck-fast"></i></div>',
    '<div class="service-icon"><i class="fa-solid fa-industry"></i></div>'
);
content = content.replace(
    '<h3>Logistics Management</h3>',
    '<h3>Industrial Tubes & Pipes</h3>'
);
content = content.replace(
    '<p>Reliable freight forwarding and supply chain solutions worldwide.</p>',
    '<p>Precision-engineered steel tubes and high-quality raw materials for global manufacturing.</p>'
);

// Services Button
content = content.replace(
    '<a href="services.html" class="btn btn-primary">View All Services</a>',
    '<a href="kitchenware.html" class="btn btn-primary">View Full Catalog</a>'
);

// Footer text
content = content.replace(
    '<p style="margin-bottom: 20px;">Connecting Indian businesses to the world through comprehensive export, import, and logistics services.</p>',
    '<p style="margin-bottom: 20px;">Leading manufacturers and exporters of premium stainless steel kitchenware, Horeca supplies, and industrial tubes.</p>'
);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Homepage updated for Kitchenware theme');
