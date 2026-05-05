const fs = require('fs');
const path = require('path');

const cssFile = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

const regex = /\/\* Extended Header Styles - Clean & Modern \*\/[\s\S]*?(?=\/\* Hero Section \*\/)/;

const newCSS = `/* Extended Header Styles - Advanced Iconic Design */
body {
  padding-top: 150px;
}
.hero {
  margin-top: 0;
  height: calc(100vh - 150px);
}

.extended-header {
  position: fixed;
  top: 15px;
  left: 2%;
  width: 96%;
  z-index: 1000;
  transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 10px 40px rgba(10, 37, 64, 0.1);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

.extended-header.scrolled {
  top: 0;
  width: 100%;
  left: 0;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-color: transparent;
}

/* Top Banner */
.top-navbar-banner {
  padding: 15px 0;
  background: transparent;
  border-bottom: 1px solid transparent;
}

.extended-header.scrolled .top-navbar-banner {
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.top-banner-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 40px;
  gap: 30px;
}

/* Logo Setup */
.premium-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  position: relative;
  z-index: 2;
}

.logo-icon-glass {
  width: 50px;
  height: 50px;
  background: #0A2540;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: inset 0 0 10px rgba(255,255,255,0.2), 0 8px 20px rgba(10,37,64,0.3);
  overflow: hidden;
}

/* Three.js Logo Animation Effect from JS will target this container */

.logo-text-gradient {
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: 1.8rem;
  color: #0A2540;
  letter-spacing: -1px;
  transition: all 0.3s ease;
}

.logo-text-gradient span {
  color: #F59E0B;
}

/* Hide Search Bar Completely as requested */
.top-search, .search-bubble {
  display: none !important;
}

/* Right Actions */
.top-nav-actions {
  display: flex;
  align-items: center;
  gap: 30px;
}

.login-link {
  color: #4b5563;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  font-size: 1rem;
}

.login-link i {
  color: #0A2540;
  font-size: 1.2rem;
  transition: transform 0.4s ease;
}

.login-link:hover {
  color: #F59E0B;
}

.login-link:hover i {
  transform: rotateY(180deg) scale(1.1);
  color: #F59E0B;
}

.action-btn.glow-btn {
  background: linear-gradient(135deg, #0A2540, #1A365D);
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 10px 20px rgba(10, 37, 64, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.action-btn.glow-btn::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, #F59E0B, #ea580c);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.action-btn.glow-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 15px 30px rgba(245, 158, 11, 0.3);
}

.action-btn.glow-btn:hover::before {
  opacity: 1;
}

/* Main Navbar Navigation Links */
.premium-navbar {
  padding: 5px 0 15px 0;
  width: 100%;
}

.premium-nav-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.premium-nav-links {
  display: flex;
  gap: 35px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  color: #6b7280;
  padding: 10px 5px;
  text-decoration: none;
  display: block;
  position: relative;
  transition: all 0.4s ease;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.nav-item span {
  display: inline-block;
  transition: transform 0.3s ease;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #F59E0B;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.86, 0, 0.07, 1);
}

.nav-item:hover, .nav-item.active {
  color: #0A2540;
  font-weight: 700;
}

.nav-item:hover::before, .nav-item.active::before {
  opacity: 1;
  top: 2px;
  transform: translateX(-50%) scale(2);
}

.nav-item:hover span, .nav-item.active span {
  transform: translateY(8px);
}

/* Deep Dropdown that was marked as 'hidden' earlier */
.categories-dropdown {
  display: none !important; /* Fully disabled */
}

.mobile-toggle {
  display: none;
  font-size: 1.8rem;
  color: #0A2540;
  cursor: pointer;
  padding: 10px;
  background: #f3f4f6;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.mobile-toggle:hover {
  background: #e5e7eb;
}

@media (max-width: 992px) {
  .extended-header {
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 0;
  }
  body { padding-top: 150px; }
  .hero { height: calc(100vh - 150px); }
  
  .top-banner-container {
    padding: 0 20px;
  }
  .top-nav-actions {
    display: none; /* Hide actions on mobile for cleaner look */
  }
  
  .premium-nav-container {
    justify-content: flex-end;
    padding: 0 20px;
  }
  
  .premium-nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(255,255,255,0.98);
    flex-direction: column;
    gap: 0;
    padding: 20px 0;
    border-top: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
  
  .premium-nav-links.active {
    display: flex;
  }
  
  .nav-item {
    padding: 15px 30px;
    font-size: 1rem;
    color: #0A2540;
  }
  
  .nav-item:hover, .nav-item.active {
    background: rgba(245, 158, 11, 0.05);
  }

  .nav-item::before { display: none; }
  .nav-item:hover span, .nav-item.active span {
    transform: none;
  }
  
  .mobile-toggle {
    display: block;
    margin-top: -50px; /* Pull it up into the header row */
  }
}

`;

if (regex.test(content)) {
    content = content.replace(regex, newCSS);
    fs.writeFileSync(cssFile, content, 'utf8');
    console.log('Fixed CSS style');
} else {
    console.log('Regex not found');
}
