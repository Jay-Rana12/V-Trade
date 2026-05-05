const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// This regex matches the entire search bubble content more robustly
const fullBubbleRegex = /<div class="search-bubble top-search intel-search-container"[\s\S]*?<div id="header-search-autocomplete"/g;

const cleanBubbleStart = `<div class="search-bubble top-search intel-search-container" style="position: relative;">
                    <input type="text" id="header-search" class="intel-search" placeholder="Search globally..." autocomplete="off">
                    <div class="location-indicator" id="header-location-badge" style="position: absolute; right: 105px; pointer-events: none; display: flex; align-items: center; gap: 5px; color: #f26b43; font-size: 0.75rem; font-weight: 700; white-space: nowrap;">
                        <i class="fa-solid fa-location-crosshairs fa-spin"></i>
                        <span class="user-city">Detecting...</span>
                    </div>
                    <button class="search-btn-icon"><i class="fa-solid fa-search"></i></button>
                    <button class="mic-btn-icon" id="voice-search-btn" title="Voice Search"><i class="fa-solid fa-microphone"></i></button>
                    <div id="header-search-autocomplete"`;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (fullBubbleRegex.test(content)) {
        content = content.replace(fullBubbleRegex, cleanBubbleStart);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned up duplicate mics in ${file}`);
    }
}
