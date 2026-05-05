
const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\xampp\\htdocs\\redesign',
    'C:\\Users\\AE\\OneDrive\\Desktop\\redesign'
];

const files = ['about.html', 'contact.html', 'manufacturers.html', 'kitchenware.html', 'index.html', 'results.html', 'gallery.html'];
const timestamp = Date.now();

// The "Working" HTML from gallery.html
const workingSearchHTML = `
                <div class="search-bubble top-search intel-search-container" style="position: relative;">
                    <input type="text" id="header-search" class="intel-search" placeholder="Search globally..."
                        autocomplete="off">
                    <div class="location-indicator" id="header-location-badge"
                        style="position: absolute; right: 85px; pointer-events: none; display: flex; align-items: center; gap: 5px; color: #f26b43; font-size: 0.75rem; font-weight: 700; white-space: nowrap;">
                        <i class="fa-solid fa-location-crosshairs fa-spin"></i>
                        <span class="user-city">Detecting...</span>
                    </div>
                    <button class="mic-btn-icon" title="Voice Search"><i class="fa-solid fa-microphone"></i></button><button class="search-btn-icon"><i class="fa-solid fa-search"></i></button>
                    <div id="header-search-autocomplete" class="search-dropdown"
                        style="top: 100%; left: 0; width: 100%;"></div>
                </div>`;

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
            
            // 2. Reconstruct Header to match the WORKING gallery.html
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
                
                const newHeaderRow = logoPart + workingSearchHTML + actionPart;
                content = content.replace(headerRowRegex, newHeaderRow);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`SUCCESS: [${baseDir}] ${file} synchronized to Gallery style.`);
            }
        } catch (err) {
            console.error(`ERROR in [${baseDir}] ${file}:`, err.message);
        }
    });
});
