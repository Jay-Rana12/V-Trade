const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const dataPages = ['manufacturers.html', 'dealers.html', 'retailers.html', 'corporates.html', 'distributors.html'];

const pageData = {
    'manufacturers.html': { img: 'images/steel_manufacturing.png', color: '#2563eb' },
    'dealers.html': { img: 'images/curated_pot.png', color: '#10b981' },
    'retailers.html': { img: 'images/curated_thali.png', color: '#f59e0b' },
    'corporates.html': { img: 'images/curated_chafing.png', color: '#ef4444' },
    'distributors.html': { img: 'images/industrial_pipes.png', color: '#06b6d4' }
};

dataPages.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    const { img, color } = pageData[file];
    
    // 1. Update Styles for Medium Animated Banner
    const styleUpdate = `<style>
        :root { --p-color: ${color}; }
        .perso-hero {
            height: 50vh;
            min-height: 400px;
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('${img}') center/cover no-repeat;
            color: white; text-align: center; position: relative;
            overflow: hidden;
            display: flex; align-items: center; justify-content: center;
        }
        .perso-hero::after {
            content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 4px;
            background: var(--p-color); box-shadow: 0 0 20px var(--p-color);
            animation: growLine 2s ease-in-out infinite alternate;
        }
        @keyframes growLine { from { width: 0; left: 50%; } to { width: 100%; left: 0; } }
        
        .perso-icon {
            font-size: 3.5rem; color: var(--p-color); margin-bottom: 20px;
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));
            animation: bounceIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes bounceIn { from { scale: 0; opacity: 0; } to { scale: 1; opacity: 1; } }
        
        .perso-title { 
            font-size: 4rem; font-weight: 800; text-transform: uppercase; 
            letter-spacing: 2px; margin-bottom: 10px;
            text-shadow: 0 10px 30px rgba(0,0,0,0.5);
            animation: fadeInUp 0.8s ease-out;
            color: #FFFFFF;
        }
        .perso-hero p {
            font-size: 1.2rem;
            color: #FFFFFF !important;
            opacity: 1 !important;
            text-shadow: 0 2px 15px rgba(0,0,0,0.4);
            font-weight: 500;
        }
        @keyframes fadeInUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .perso-line { width: 60px; height: 5px; background: var(--p-color); margin: 0 auto 20px; border-radius: 10px; }
        .perso-body { padding: 80px 0; background: white; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 60px; }
        .stat-item { text-align: center; padding: 30px; background: #f8fafc; border-radius: 20px; border-bottom: 4px solid var(--p-color); transition: 0.3s; }
        .stat-item:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .stat-item h2 { font-size: 2.5rem; color: #0f172a; margin-bottom: 5px; }
    </style>`;

    const oldStyleRegex = /<style>[\s\S]*?<\/style>/;
    content = content.replace(oldStyleRegex, styleUpdate);
    
    // 2. Ensure Navbar is synced with the mega menu and uppercase style
    const navLinksRegex = /<ul class="premium-nav-links">[\s\S]*?<\/ul>/;
    const newNavLinks = `<ul class="premium-nav-links">
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
                        <button class="btn-data"><i class="fa-solid fa-database"></i> DATA</button>
                        <div class="data-dropdown-menu">
                            <a href="manufacturers.html" class="data-link manufacturers">
                                <i class="fa-solid fa-industry"></i>
                                <div class="link-info">
                                    <span class="link-title">MANUFACTURERS</span>
                                    <img src="images/steel_manufacturing.png" class="link-preview" alt="Factory">
                                </div>
                            </a>
                            <a href="dealers.html" class="data-link dealers">
                                <i class="fa-solid fa-briefcase"></i>
                                <div class="link-info">
                                    <span class="link-title">DEALERS</span>
                                    <img src="images/curated_pot.png" class="link-preview" alt="Dealers">
                                </div>
                            </a>
                            <a href="retailers.html" class="data-link retailers">
                                <i class="fa-solid fa-store"></i>
                                <div class="link-info">
                                    <span class="link-title">RETAILERS</span>
                                    <img src="images/curated_thali.png" class="link-preview" alt="Retailers">
                                </div>
                            </a>
                            <a href="corporates.html" class="data-link corporates">
                                <i class="fa-solid fa-building-user"></i>
                                <div class="link-info">
                                    <span class="link-title">CORPORATES</span>
                                    <img src="images/curated_chafing.png" class="link-preview" alt="Corporates">
                                </div>
                            </a>
                            <a href="distributors.html" class="data-link distributors">
                                <i class="fa-solid fa-dolly"></i>
                                <div class="link-info">
                                    <span class="link-title">DISTRIBUTORS</span>
                                    <img src="images/industrial_pipes.png" class="link-preview" alt="Distributors">
                                </div>
                            </a>
                        </div>
                    </li>
                    <li><a href="index.html" class="nav-item">HOME</a></li>
                    <li><a href="about.html" class="nav-item">ABOUT US</a></li>
                    <li><a href="services.html" class="nav-item">TOP CATEGORY</a></li>
                    <li><a href="products.html" class="nav-item">NEW ARRIVAL</a></li>
                    <li><a href="gallery.html" class="nav-item">TRENDING PRODUCTS</a></li>
                    <li><a href="blog.html" class="nav-item">BLOGS</a></li>
                    <li><a href="contact.html" class="nav-item">CONTACT</a></li>
                </ul>`;
    content = content.replace(navLinksRegex, newNavLinks);
    
    // 3. Inject Regional Support Hubs Section
    const contactSection = `
    <section class="perso-body" style="background: #f1f5f9; padding: 100px 0;">
        <div class="container">
            <div style="text-align: center; margin-bottom: 60px;">
                <h3 style="font-size: 2.5rem; margin-bottom: 15px;">Regional Support Hubs</h3>
                <p style="color: #64748b; font-size: 1.1rem;">Connect directly with our manufacturing unit owners for immediate assistance.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
                <div style="background: white; padding: 35px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: var(--p-color);"></div>
                    <h4 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 5px;">North India Unit</h4>
                    <p style="color: var(--p-color); font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 20px;">Mr. Rajesh Kumar</p>
                    <div style="margin-bottom: 25px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; color: #475569;">
                            <i class="fa-solid fa-phone" style="color: var(--p-color); width: 20px;"></i>
                            <span>+91 98765 43210</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; color: #475569;">
                            <i class="fa-solid fa-envelope" style="color: var(--p-color); width: 20px;"></i>
                            <span>north.unit@globaltrade.in</span>
                        </div>
                    </div>
                    <a href="https://wa.me/919876543210" style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #25D366; color: white; padding: 12px; border-radius: 12px; font-weight: 700; text-decoration: none;">
                        <i class="fa-brands fa-whatsapp"></i> Chat with Owner
                    </a>
                </div>

                <div style="background: white; padding: 35px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: var(--p-color);"></div>
                    <h4 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 5px;">West India Unit</h4>
                    <p style="color: var(--p-color); font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 20px;">Mr. Sanjay Mehta</p>
                    <div style="margin-bottom: 25px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; color: #475569;">
                            <i class="fa-solid fa-phone" style="color: var(--p-color); width: 20px;"></i>
                            <span>+91 99887 76655</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; color: #475569;">
                            <i class="fa-solid fa-envelope" style="color: var(--p-color); width: 20px;"></i>
                            <span>west.unit@globaltrade.in</span>
                        </div>
                    </div>
                    <a href="https://wa.me/919988776655" style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #25D366; color: white; padding: 12px; border-radius: 12px; font-weight: 700; text-decoration: none;">
                        <i class="fa-brands fa-whatsapp"></i> Chat with Owner
                    </a>
                </div>

                <div style="background: white; padding: 35px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: var(--p-color);"></div>
                    <h4 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 5px;">South India Unit</h4>
                    <p style="color: var(--p-color); font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 20px;">Mr. Arjun Reddy</p>
                    <div style="margin-bottom: 25px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; color: #475569;">
                            <i class="fa-solid fa-phone" style="color: var(--p-color); width: 20px;"></i>
                            <span>+91 88776 65544</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; color: #475569;">
                            <i class="fa-solid fa-envelope" style="color: var(--p-color); width: 20px;"></i>
                            <span>south.unit@globaltrade.in</span>
                        </div>
                    </div>
                    <a href="https://wa.me/918877665544" style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #25D366; color: white; padding: 12px; border-radius: 12px; font-weight: 700; text-decoration: none;">
                        <i class="fa-brands fa-whatsapp"></i> Chat with Owner
                    </a>
                </div>
            </div>
        </div>
    </section>`;

    const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/;
    const currentFooter = content.match(footerRegex);
    if (!content.includes('Regional Support Hubs')) {
        content = content.replace(footerRegex, contactSection + '\n    ' + currentFooter[0]);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated Detail Page: ${file}`);
});
