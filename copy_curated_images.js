const fs = require('fs');
const path = require('path');

const projectDir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const imagesDir = path.join(projectDir, 'images');

const srcImages = [
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/kitchenware_showroom_banner_1773475479848.png',
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/steel_thali_set_1773475499733.png',
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/chef_pot_polished_1773475517714.png',
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/steel_pitcher_set_1773475537048.png',
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/commercial_chafing_dish_1773475552236.png',
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/kitchenware_design_studio_1773475574447.png'
];

const destImages = [
    'about_banner.png',
    'curated_thali.png',
    'curated_pot.png',
    'curated_pitcher.png',
    'curated_chafing.png',
    'about_studio.png'
];

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

srcImages.forEach((src, idx) => {
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(imagesDir, destImages[idx]));
        console.log('Copied:', destImages[idx]);
    } else {
        console.log('Source missing:', src);
    }
});
