const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const fullBubbleRegex = /<div class="search-bubble top-search intel-search-container"[\s\S]*?<div id="header-search-autocomplete"/g;

const cleanBubbleHTML = `<div class="search-bubble top-search intel-search-container">
                    <input type="text" id="header-search" class="intel-search" placeholder="Search for products, brands, or categories..." autocomplete="off">
                    <div class="location-indicator" id="header-location-badge">
                        <i class="fa-solid fa-location-crosshairs fa-spin"></i>
                        <span class="user-city">Detecting...</span>
                    </div>
                    <button class="mic-btn-icon" id="voice-search-btn" title="Voice Search"><i class="fa-solid fa-microphone"></i></button>
                    <button class="search-btn-icon"><i class="fa-solid fa-search"></i></button>
                    <div id="header-search-autocomplete"`;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (fullBubbleRegex.test(content)) {
        content = content.replace(fullBubbleRegex, cleanBubbleHTML);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned up inline styles for search bar in ${file}`);
    }
}
