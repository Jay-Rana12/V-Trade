const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// 1. HTML Update
const htmlRegex = /<!-- Main Header -->[\s\S]*?<\/header>/;
const newHTML = `<!-- Premium Navbar -->
    <nav class="premium-navbar">
        <div class="container premium-nav-container">
            
            <!-- Logo -->
            <a href="index.html" class="premium-logo">
                <div class="logo-icon-glass"><i class="fa-solid fa-gem"></i></div>
                <span class="logo-text-gradient">INDIATRADE</span>
            </a>

            <!-- Navigation Links -->
            <ul class="premium-nav-links">
                <li><a href="index.html" class="nav-item">Home</a></li>
                <li><a href="about.html" class="nav-item">About Us</a></li>
                <li><a href="services.html" class="nav-item">Top Category</a></li>
                <li><a href="products.html" class="nav-item">New Arrival</a></li>
                <li><a href="gallery.html" class="nav-item">Trending Products</a></li>
                <li><a href="blog.html" class="nav-item">Blogs</a></li>
                <li><a href="contact.html" class="nav-item">Contact</a></li>
            </ul>

            <!-- Right Actions -->
            <div class="premium-nav-actions">
                <div class="search-bubble">
                    <input type="text" placeholder="Search...">
                    <i class="fa-solid fa-search"></i>
                </div>
                <a href="join.html" class="action-btn glow-btn">Join Free</a>
                <div class="mobile-toggle"><i class="fa-solid fa-bars-staggered"></i></div>
            </div>
            
        </div>
    </nav>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (htmlRegex.test(content)) {
        content = content.replace(htmlRegex, newHTML);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated HTML in ${file}`);
    } else if (content.includes('<!-- Premium Navbar -->')) {
        console.log(`Already updated HTML in ${file}`);
    } else if (content.includes('class="navbar"')) {
        content = content.replace(/<!--\s*Navbar\s*-->\s*<nav class="navbar">([\s\S]*?)<\/nav>/, newHTML);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated old Navbar HTML in ${file}`);
    }
});

// 2. CSS Update
const cssFile = path.join(dir, 'css', 'style.css');
let cssContent = fs.readFileSync(cssFile, 'utf8');
const cssRegex = /\/\* Main Header Styles[\s\S]*?(?=\/\* Hero Section \*\/)/;
const cssRegexFallback = /\/\* Navbar \*\/[\s\S]*?(?=\/\* Hero Section \*\/)/;

const newCSS = `/* Premium Navbar Styles */
.premium-navbar {
    position: fixed;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 1200px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 50px;
    padding: 12px 25px;
    z-index: 1000;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255,255,255,0.4);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.premium-navbar.scrolled {
    top: 15px;
    width: 95%;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    padding: 10px 30px;
}

.premium-nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

/* Logo */
.premium-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    z-index: 10;
}
.logo-icon-glass {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, #00C9FF, #92FE9D);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    box-shadow: 0 8px 20px rgba(0, 201, 255, 0.4);
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.premium-logo:hover .logo-icon-glass {
    transform: rotate(360deg) scale(1.1);
    background: linear-gradient(135deg, #92FE9D, #00C9FF);
}
.logo-text-gradient {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    background: linear-gradient(to right, #2b2b2b, #00C9FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
    transition: all 0.3s ease;
}

/* Nav Links */
.premium-nav-links {
    display: flex;
    gap: 5px;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
}
.nav-item {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    color: #4b5563;
    padding: 10px 18px;
    border-radius: 30px;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: inline-block;
}
.nav-item:hover, .nav-item.active {
    color: #fff;
    background: #00C9FF;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 201, 255, 0.3);
}

/* Actions */
.premium-nav-actions {
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 10;
}
.search-bubble {
    display: flex;
    align-items: center;
    background: rgba(243, 244, 246, 0.8);
    border-radius: 30px;
    padding: 8px 15px;
    border: 1px solid rgba(0,0,0,0.05);
    transition: all 0.3s ease;
}
.search-bubble:focus-within {
    background: white;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    border-color: rgba(0, 201, 255, 0.3);
    width: 220px;
}
.search-bubble input {
    border: none;
    background: transparent;
    outline: none;
    width: 140px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    transition: width 0.3s ease;
}
.search-bubble:focus-within input {
    width: 170px;
}
.search-bubble i {
    color: #9CA3AF;
    cursor: pointer;
}
.search-bubble i:hover {
    color: #00C9FF;
}

.action-btn.glow-btn {
    background: linear-gradient(135deg, #00C9FF, #92FE9D);
    color: white;
    padding: 10px 24px;
    border-radius: 30px;
    font-weight: 700;
    text-decoration: none;
    position: relative;
    box-shadow: 0 6px 15px rgba(0, 201, 255, 0.3);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
}
.action-btn.glow-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.5s;
}
.action-btn.glow-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 201, 255, 0.5);
}
.action-btn.glow-btn:hover::before {
    left: 100%;
}

.mobile-toggle {
    display: none;
    font-size: 1.5rem;
    color: #333;
    cursor: pointer;
    transition: 0.3s;
}
.mobile-toggle:hover {
    color: #00C9FF;
}

body { padding-top: 130px; }
.hero { height: calc(100vh - 130px); margin-top: 0; }

@media (max-width: 1024px) {
    .premium-navbar {
        width: 95%;
        top: 15px;
    }
    .premium-nav-links { display: none; }
    .search-bubble { display: none; }
    .mobile-toggle { display: block; }
    
    .premium-nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: calc(100% + 20px);
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        border: 1px solid rgba(0, 201, 255, 0.2);
    }
    .premium-nav-links.active .nav-item {
        width: 100%;
        text-align: center;
        margin-bottom: 5px;
    }
}

`;

if (cssRegex.test(cssContent)) {
    cssContent = cssContent.replace(cssRegex, newCSS);
    fs.writeFileSync(cssFile, cssContent, 'utf8');
    console.log('Updated CSS');
} else if (cssRegexFallback.test(cssContent)) {
    cssContent = cssContent.replace(cssRegexFallback, newCSS);
    fs.writeFileSync(cssFile, cssContent, 'utf8');
    console.log('Updated CSS (fallback)');
}

// 3. JS Update
const jsFile = path.join(dir, 'js', 'main.js');
let jsContent = fs.readFileSync(jsFile, 'utf8');

if (jsContent.includes('.main-header')) {
    jsContent = jsContent.replace(/\.main-header/g, '.premium-navbar');
    jsContent = jsContent.replace(/\.nav-links/g, '.premium-nav-links');
    fs.writeFileSync(jsFile, jsContent, 'utf8');
    console.log('Updated JS to premium-navbar');
} else if (jsContent.includes('.navbar')) {
    jsContent = jsContent.replace(/\.navbar/g, '.premium-navbar');
    jsContent = jsContent.replace(/\.nav-links/g, '.premium-nav-links');
    fs.writeFileSync(jsFile, jsContent, 'utf8');
    console.log('Updated JS from navbar to premium-navbar');
}
