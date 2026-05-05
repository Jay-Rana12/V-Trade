const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const fullBubbleRegex = /<div class="search-bubble top-search intel-search-container"[\s\S]*?<div id="header-search-autocomplete"/g;

const newBubbleHTML = `<div class="search-bubble top-search intel-search-container" style="position: relative; display: flex; align-items: center;">
                    <input type="text" id="header-search" class="intel-search" placeholder="Search for products, brands, or categories..." autocomplete="off">
                    <div class="location-indicator" id="header-location-badge" style="position: absolute; right: 110px; pointer-events: none; display: flex; align-items: center; gap: 5px; color: #f26b43; font-size: 0.7rem; font-weight: 700; white-space: nowrap; opacity: 0.8;">
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
        content = content.replace(fullBubbleRegex, newBubbleHTML);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Revamped search UI to match reference image in ${file}`);
    }
}
