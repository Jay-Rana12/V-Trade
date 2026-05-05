
const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\xampp\\htdocs\\redesign',
    'C:\\Users\\AE\\OneDrive\\Desktop\\redesign'
];

const files = ['about.html', 'contact.html', 'manufacturers.html', 'kitchenware.html', 'index.html', 'results.html'];
const timestamp = Date.now();

dirs.forEach(baseDir => {
    if (!fs.existsSync(baseDir)) return;
    
    files.forEach(file => {
        const filePath = path.join(baseDir, file);
        try {
            if (!fs.existsSync(filePath)) return;
            
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(/\0/g, ''); // Clean NULLs
            
            // 1. Force Cache Refresh for CSS
            content = content.replace(/style\.css\?v=[0-9]+/g, `style.css?v=${timestamp}`);
            
            // 2. Reconstruct Header
            const cleanSearchHTML = `
                <div class="search-bubble top-search intel-search-container" style="position: relative; overflow: visible !important; display: flex !important; align-items: center !important; background: #ffffff !important; border-radius: 50px !important; border: 1px solid #e2e8f0 !important; padding: 4px 15px !important; height: 48px !important; width: 100% !important; max-width: 600px !important;">
                    <!-- Mic Button (Moved to Left) -->
                    <button class="mic-btn-icon" title="Voice Search" style="display: flex !important; color: #f26b43 !important; background: transparent !important; border: none !important; cursor: pointer !important; font-size: 1.2rem !important; padding: 0 10px !important; flex-shrink: 0 !important; z-index: 10 !important;">
                        <i class="fa-solid fa-microphone"></i>
                    </button>
                    
                    <input type="text" id="header-search" class="intel-search" placeholder="Search globally..." autocomplete="off" style="flex: 1 !important; background: transparent !important; border: none !important; outline: none !important; color: #000 !important; font-size: 0.95rem !important; font-weight: 500 !important; padding: 0 10px !important;">
                    
                    <div class="location-indicator" id="header-location-badge" style="position: absolute; right: 65px; pointer-events: none; display: flex; align-items: center; gap: 5px; color: #f26b43; font-size: 0.75rem; font-weight: 700; white-space: nowrap;">
                        <i class="fa-solid fa-location-crosshairs fa-spin"></i>
                        <span class="user-city">Detecting...</span>
                    </div>
                    
                    <button class="search-btn-icon" style="background: transparent !important; border: none !important; color: #0A2540 !important; cursor: pointer !important; font-size: 1.2rem !important; padding: 0 10px !important; flex-shrink: 0 !important;">
                        <i class="fa-solid fa-search"></i>
                    </button>
                    
                    <div id="header-search-autocomplete" class="search-dropdown" style="top: 100%; left: 0; width: 100%;"></div>
                </div>`;

            const headerRowRegex = /<div class="header-main-row">[\s\S]*?<!-- Hamburger Menu Toggle/;
            if (headerRowRegex.test(content)) {
                const logoPart = `
            <div class="header-main-row">
                <a href="index.html" class="premium-logo">
                    <div class="logo-icon-glass"><i class="fa-solid fa-gem"></i></div>
                    <span class="logo-text-gradient">INDIATRADE</span>
                </a>
`;
                const actionPart = `
                <div class="top-nav-actions">
                    <a href="login.html" class="login-link"><i class="fa-regular fa-user"></i> Sign In</a>
                    <a href="join.html" class="action-btn glow-btn">Join Free</a>
                </div>

                <!-- Hamburger Menu Toggle`;
                
                const newHeaderRow = logoPart + cleanSearchHTML + actionPart;
                content = content.replace(headerRowRegex, newHeaderRow);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`SUCCESS: [${baseDir}] ${file} updated.`);
            } else {
                 // Try a simpler search-bubble replacement if the whole row doesn't match
                 if (content.includes('mic-btn-icon')) {
                      console.log(`INFO: [${baseDir}] ${file} already seems to have mic.`);
                 } else {
                      console.log(`WARNING: [${baseDir}] ${file} header row match failed.`);
                 }
            }
        } catch (err) {
            console.error(`ERROR in [${baseDir}] ${file}:`, err.message);
        }
    });
});
