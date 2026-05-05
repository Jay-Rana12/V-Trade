const fs = require('fs');
const path = require('path');

const cssFile = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

// The block to replace:
const regex = /\/\* Extended Header Styles - Advanced Iconic Design \*\/[\s\S]*?(?=\/\* Hero Section \*\/)/;

const newCSS = `/* Extended Header Styles - Restored & Advanced Iconic Design */
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
  /* Removed overflow:hidden so dropdowns can appear */
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
}

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

/* RESTORED: Search Bar */
.top-search {
  flex-grow: 1;
  max-width: 500px;
  align-self: center;
}

.search-bubble {
  display: flex;
  align-items: center;
  background: rgba(10, 37, 64, 0.05);
  border-radius: 30px;
  padding: 6px 6px 6px 20px;
  border: 1px solid rgba(10, 37, 64, 0.1);
  transition: all 0.4s ease;
}

.search-bubble:focus-within {
  background: white;
  border-color: #F59E0B;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.15);
}

.search-bubble input {
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #333;
}

.search-btn-icon {
  background: #F59E0B;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.search-btn-icon:hover {
  transform: scale(1.1);
  background: #d97706;
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
  position: relative;
}

.premium-nav-links {
  display: flex;
  align-items: center;
  gap: 35px;
  list-style: none;
  margin: 0;
  padding: 0;
  opacity: 1 !important; /* Force visible */
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
  opacity: 1 !important; /* GSAP override */
}

/* Changed hover animation */
.nav-item::before {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #F59E0B;
  transition: all 0.3s ease;
}

.nav-item:hover, .nav-item.active {
  color: #0A2540;
  font-weight: 700;
}

.nav-item:hover::before, .nav-item.active::before {
  width: 100%;
}

/* RESTORED: Categories Dropdown */
.categories-dropdown {
  position: relative;
  display: block !important; /* Force visible */
  margin-right: 15px;
}
.btn-categories {
  background: #F59E0B;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  transition: all 0.3s ease;
}
.btn-categories:hover {
  transform: translateY(-2px);
  background: #fbaf27;
  box-shadow: 0 6px 18px rgba(245, 158, 11, 0.4);
}
.dropdown-menu {
  position: absolute;
  top: 130%;
  left: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  min-width: 240px;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(10, 37, 64, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(15px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1000;
  padding: 15px 0;
  border: 1px solid rgba(10, 37, 64, 0.05);
}
.categories-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.dropdown-menu a {
  display: block;
  padding: 12px 25px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #4b5563;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}
.dropdown-menu a:hover {
  background: rgba(245, 158, 11, 0.05);
  color: #F59E0B;
  padding-left: 32px;
}
.dropdown-menu a::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #F59E0B;
  opacity: 0;
  transition: all 0.3s ease;
}
.dropdown-menu a:hover::before {
  opacity: 1;
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
  position: absolute;
  right: 20px;
  top: -45px; /* Aligned next to logo on mobile */
  z-index: 100;
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
    flex-wrap: wrap; /* Allow wrapping */
  }
  .top-search {
    order: 3;
    width: 100%;
    max-width: 100%;
    margin-top: 10px;
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
    top: calc(100% + 5px);
    left: 20px;
    width: calc(100% - 40px);
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
  
  .mobile-toggle {
    display: block;
    top: -55px; /* Fix mobile toggle position relative to container */
  }
  
  .categories-dropdown {
    width: calc(100% - 40px);
    margin: 5px 20px 15px;
    display: block !important;
  }
  .btn-categories {
    width: 100%;
    justify-content: center;
  }
  .dropdown-menu {
    position: static;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
    opacity: 1;
    visibility: visible;
    transform: none;
    display: none;
    margin-top: 10px;
    border-radius: 12px;
    background: rgba(245, 247, 250, 0.5);
  }
  .categories-dropdown:hover .dropdown-menu,
  .categories-dropdown.active .dropdown-menu {
    display: block;
  }
}

`;

if (regex.test(content)) {
    content = content.replace(regex, newCSS);
    fs.writeFileSync(cssFile, content, 'utf8');
    console.log('Restored Navlinks, Dropdown, Search + fixed styling issues');
} else {
    console.log('Regex not found');
}
