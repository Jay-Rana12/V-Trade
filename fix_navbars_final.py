import os
import re

dir_path = "c:\\Users\\AE\\OneDrive\\Desktop\\redesign"

header_regex = re.compile(r'<header class="extended-header">.*?<\/header>', re.DOTALL)
overlay_regex = re.compile(r'<div class="nav-overlay"><\/div>(\s*<div class="nav-overlay"><\/div>)*', re.DOTALL)

def get_header(active_page):
    links = [
        ("index.html", "HOME"),
        ("about.html", "ABOUT US"),
        ("services.html", "TOP CATEGORY"),
        ("products.html", "NEW ARRIVAL"),
        ("gallery.html", "TRENDING PRODUCTS"),
        ("blog.html", "BLOGS"),
        ("contact.html", "CONTACT")
    ]
    
    links_html = ""
    for url, name in links:
        active_class = " active" if active_page == url else ""
        links_html += f'                    <li><a href="{url}" class="nav-item{active_class}">{name}</a></li>\n'
    
    return f'''<header class="extended-header">
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
{links_html.rstrip()}
                </ul>
            </nav>
        </div>
    </header>'''

for f in os.listdir(dir_path):
    if f.endswith('.html'):
        pth = os.path.join(dir_path, f)
        with open(pth, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace header
        if header_regex.search(content):
            content = header_regex.sub(get_header(f), content)
        
        # Strip all nav overlays and then add exactly one
        content = overlay_regex.sub('', content)
        content = content.replace('</header>', '</header>\n    <div class="nav-overlay"></div>\n')
        
        with open(pth, 'w', encoding='utf-8') as file:
            file.write(content)

print("Done")
