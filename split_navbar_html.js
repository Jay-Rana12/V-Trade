const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const htmlRegex = /<!-- Premium Navbar -->[\s\S]*?<\/nav>/;

const newHTML = `<!-- Extended Header -->
    <header class="extended-header">
        
        <!-- Top Extra Navbar Banner -->
        <div class="top-navbar-banner">
            <div class="container top-banner-container">
                <!-- Logo -->
                <a href="index.html" class="premium-logo">
                    <div class="logo-icon-glass"><i class="fa-solid fa-gem"></i></div>
                    <span class="logo-text-gradient">INDIATRADE</span>
                </a>

                <!-- Search Bar -->
                <div class="search-bubble top-search">
                    <input type="text" placeholder="Search for products, categories...">
                    <button class="search-btn-icon"><i class="fa-solid fa-search"></i></button>
                </div>

                <!-- Right Actions -->
                <div class="top-nav-actions">
                    <a href="login.html" class="login-link"><i class="fa-regular fa-user"></i> Sign In</a>
                    <a href="join.html" class="action-btn glow-btn">Join Free</a>
                </div>
            </div>
        </div>

        <!-- Main Premium Navbar -->
        <nav class="premium-navbar">
            <div class="container premium-nav-container">
                
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

                <div class="mobile-toggle"><i class="fa-solid fa-bars-staggered"></i></div>
            </div>
        </nav>
    </header>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (htmlRegex.test(content)) {
        content = content.replace(htmlRegex, newHTML);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated HTML in ${file}`);
    } else {
        console.log(`Regex not found in ${file}`);
    }
});
