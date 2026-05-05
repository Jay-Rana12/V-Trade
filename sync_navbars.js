const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// This regex targets the entire header area including the closing tag
const headerContainerRegex = /<div class="container header-container">[\s\S]*?<\/header>/;

function getNewHeader(currentFile) {
    const pages = [
        { name: 'HOME', url: 'index.html' },
        { name: 'ABOUT US', url: 'about.html' },
        { name: 'TOP CATEGORY', url: 'services.html' },
        { name: 'NEW ARRIVAL', url: 'products.html' },
        { name: 'TRENDING PRODUCTS', url: 'gallery.html' },
        { name: 'BLOGS', url: 'blog.html' },
        { name: 'CONTACT', url: 'contact.html' }
    ];

    let linksHTML = pages.map(p => {
        const isActive = currentFile === p.url ? 'active' : '';
        return `<li><a href="${p.url}" class="nav-item ${isActive}">${p.name}</a></li>`;
    }).join('\n                    ');

    return `<div class="container header-container">
            <!-- Top Row: Logo, Search, Actions -->
            <div class="header-main-row">
                <a href="index.html" class="premium-logo">
                    <div class="logo-icon-glass"><i class="fa-solid fa-gem"></i></div>
                    <span class="logo-text-gradient">INDIATRADE</span>
                </a>

                <div class="search-bubble top-search">
                    <input type="text" placeholder="Search for products, categories...">
                    <button class="search-btn-icon"><i class="fa-solid fa-search"></i></button>
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
                            <a href="corporates.html" class="data-link corporates">
                                <i class="fa-solid fa-building-user"></i>
                                <span class="link-title">Corporates</span>
                            </a>
                            <a href="distributors.html" class="data-link distributors">
                                <i class="fa-solid fa-dolly"></i>
                                <span class="link-title">Distributors</span>
                            </a>
                        </div>
                    </li>
                    ${linksHTML}
                </ul>
            </nav>
        </div>
    </header>
    <div class="nav-overlay"></div>`;
}

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (headerContainerRegex.test(content)) {
        content = content.replace(headerContainerRegex, getNewHeader(file));
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fully restructured header and added overlay in ${file}`);
    } else {
        console.log(`Header container not found in ${file}`);
    }
});
