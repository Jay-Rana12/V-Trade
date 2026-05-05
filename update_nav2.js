const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldRegex = /<!-- Main Header -->[\s\S]*?<\/header>/;

const newHTML = `<!-- Main Header -->
    <header class="main-header">
        <!-- Top Bar -->
        <div class="header-top">
            <div class="container header-top-container">
                <!-- Logo -->
                <a href="index.html" class="header-logo">
                    <div class="logo-v-icon">
                        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4L12 20L20 4H16L12 14L8 4H4Z" fill="#58595B"/>
                            <path d="M4 10L10 20H14L8 10H4Z" fill="#8C8D8E"/>
                        </svg>
                    </div>
                    <span class="logo-text">INDIATRADE</span>
                </a>
                
                <!-- Search -->
                <div class="header-search-wrapper">
                    <div class="header-search">
                        <input type="text" placeholder="Search Pipes & Tubes...">
                        <i class="fa-solid fa-microphone mic-icon"></i>
                        <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>
                
                <!-- User Actions -->
                <div class="header-actions">
                    <a href="login.html" class="sign-in-link"><i class="fa-regular fa-user"></i> Sign In</a>
                    <a href="join.html" class="btn-gradient header-btn-join"><i class="fa-solid fa-briefcase"></i> Free Join</a>
                </div>
            </div>
        </div>
        
        <!-- Bottom Bar (Nav) -->
        <div class="header-bottom">
            <div class="container header-bottom-container">
                <a href="categories.html" class="btn-gradient btn-categories">
                    <i class="fa-solid fa-border-all"></i> All Categories
                </a>
                
                <div class="mobile-toggle">
                    <i class="fa-solid fa-bars"></i>
                </div>
            
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="services.html">Top Category</a></li>
                    <li><a href="products.html">New Arrival</a></li>
                    <li><a href="gallery.html">Trending Products</a></li>
                    <li><a href="blog.html">Blogs</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </header>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (oldRegex.test(content)) {
        content = content.replace(oldRegex, newHTML);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`Regex not found in ${file}`);
    }
});
