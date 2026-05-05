const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const htmlRegex = /<!-- Premium Navbar -->[\s\S]*?<\/nav>/;

const newHTML = `<!-- Premium Navbar -->
    <nav class="premium-navbar">
        <div class="container premium-nav-container">
            
            <!-- Left Side: Logo + Search -->
            <div class="left-nav-group">
                <a href="index.html" class="premium-logo">
                    <div class="logo-icon-glass"><i class="fa-solid fa-gem"></i></div>
                    <span class="logo-text-gradient">INDIATRADE</span>
                </a>
                <div class="search-bubble">
                    <input type="text" placeholder="Search...">
                    <i class="fa-solid fa-search"></i>
                </div>
            </div>

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
    }
});
