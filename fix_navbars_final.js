const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const headerRegex = /<header class="extended-header">[\s\S]*?<\/header>/g;
const overlayRegex = /<div class="nav-overlay"><\/div>(\s*<div class="nav-overlay"><\/div>)*/g;

function getHeader(activePage) {
    const links = [
        { url: "index.html", name: "HOME" },
        { url: "about.html", name: "ABOUT US" },
        { url: "services.html", name: "TOP CATEGORY" },
        { url: "products.html", name: "NEW ARRIVAL" },
        { url: "gallery.html", name: "TRENDING PRODUCTS" },
        { url: "blog.html", name: "BLOGS" },
        { url: "contact.html", name: "CONTACT" }
    ];
    
    let linksHtml = "";
    for (const link of links) {
        const activeClass = activePage === link.url ? " active" : "";
        linksHtml += `                    <li><a href="${link.url}" class="nav-item${activeClass}">${link.name}</a></li>\n`;
    }
    
    return `<header class="extended-header">
        <div class="container header-container">
            <!-- Top Row: Logo, Search, Actions -->
            <div class="header-main-row">
                <a href="index.html" class="premium-logo">
                    <div class="logo-icon-glass"><i class="fa-solid fa-gem"></i></div>
                    <span class="logo-text-gradient">INDIATRADE</span>
                </a>

                <div class="search-bubble top-search intel-search-container" style="position: relative;">
                    <input type="text" id="header-search" class="intel-search" placeholder="Search globally..." autocomplete="off">
                    <div class="location-indicator" id="header-location-badge" style="position: absolute; right: 55px; pointer-events: none; display: flex; align-items: center; gap: 5px; color: #f26b43; font-size: 0.75rem; font-weight: 700; white-space: nowrap;">
                        <i class="fa-solid fa-location-crosshairs fa-spin"></i>
                        <span class="user-city">Detecting...</span>
                    </div>
                    <button class="search-btn-icon"><i class="fa-solid fa-search"></i></button>
                    <div id="header-search-autocomplete" class="search-dropdown" style="top: 100%; left: 0; width: 100%;"></div>
                </div>

                <div class="top-nav-actions">
                    <a href="login.html" class="login-link"><i class="fa-regular fa-user"></i> Sign In</a>
                    <a href="join.html" class="action-btn glow-btn">Join Free</a>
                </div>
                
                <!-- Hamburger Menu Toggle (Visible on Mobile/Tablet) -->
                <div class="mobile-toggle"><i class="fa-solid fa-bars-staggered"></i></div>
            </div>

            <!-- Bottom Row: Navigation links (Side drawer on mobile) -->
            <nav class="header-nav-row">
                <ul class="premium-nav-links">
                    <li class="categories-dropdown">
                        <button class="btn-categories"><i class="fa-solid fa-border-all"></i> ALL CATEGORIES <i class="fa-solid fa-chevron-down"></i></button>
                        <div class="dropdown-menu">
                            <a href="kitchenware.html">KITCHENWARE</a>
                            <a href="horeca.html">HORECA</a>
                            <a href="houseware.html">HOUSEWARE</a>
                            <a href="tubes-pipes.html">TUBES & PIPES</a>
                            <a href="raw-materials.html">RAW MATERIALS</a>
                        </div>
                    </li>
                    <li class="data-dropdown">
                        <button class="btn-data">
                            <i class="fa-solid fa-database"></i> Data
                        </button>
                        <div class="data-dropdown-menu">
                            <a href="manufacturers.html" class="data-link manufacturers">
                                <i class="fa-solid fa-industry"></i>
                                <span class="link-title">Manufacturers</span>
                            </a>
                            <a href="dealers.html" class="data-link dealers">
                                <i class="fa-solid fa-briefcase"></i>
                                <span class="link-title">Dealers</span>
                            </a>
                            <a href="retailers.html" class="data-link retailers">
                                <i class="fa-solid fa-store"></i>
                                <span class="link-title">Retailers</span>
                            </a>
                            <a href="distributors.html" class="data-link distributors">
                                <i class="fa-solid fa-dolly"></i>
                                <span class="link-title">Distributors</span>
                            </a>
                            <a href="wholesalers.html" class="data-link wholesalers">
                                <i class="fa-solid fa-boxes-stacked"></i>
                                <span class="link-title">Wholesalers</span>
                            </a>
                            <a href="traders.html" class="data-link traders">
                                <i class="fa-solid fa-clipboard-list"></i>
                                <span class="link-title">Traders</span>
                            </a>
                            <a href="importers.html" class="data-link importers">
                                <i class="fa-solid fa-file-import"></i>
                                <span class="link-title">Importers</span>
                            </a>
                            <a href="exporters.html" class="data-link exporters">
                                <i class="fa-solid fa-file-export"></i>
                                <span class="link-title">Exporters</span>
                            </a>
                        </div>
                    </li>
${linksHtml.replace(/\n$/, '')}
                </ul>
            </nav>
        </div>
    </header>`;
}

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let modified = false;
    if (headerRegex.test(content)) {
        content = content.replace(headerRegex, getHeader(file));
        modified = true;
    }
    
    if (overlayRegex.test(content)) {
        content = content.replace(overlayRegex, '');
        content = content.replace('</header>', '</header>\n    <div class="nav-overlay"></div>\n');
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated header for \${file}`);
    }
}
