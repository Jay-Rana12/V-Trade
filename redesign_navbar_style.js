const fs = require('fs');
const path = require('path');

const cssFile = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

const regex = /\/\* Extended Header Styles \*\/[\s\S]*?(?=\/\* Hero Section \*\/)/;

const newCSS = `/* Extended Header Styles - Restyled (Floating & Elegant) */
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
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 1300px;
  z-index: 1000;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 10px 40px rgba(10, 37, 64, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  overflow: hidden;
}

.extended-header.scrolled {
  top: 10px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 15px 50px rgba(10, 37, 64, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.9);
}

/* Top Banner */
.top-navbar-banner {
  padding: 12px 0;
  border-bottom: 1px solid rgba(10, 37, 64, 0.08);
  background: transparent;
}

.top-banner-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px;
  gap: 20px;
}

/* Logo */
.premium-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-icon-glass {
  width: 44px;
  height: 44px;
  background: #0A2540;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F59E0B;
  font-size: 1.3rem;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1), 0 5px 15px rgba(10, 37, 64, 0.2);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.logo-icon-glass::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%);
}

.premium-logo:hover .logo-icon-glass {
  transform: rotate(10deg) scale(1.1);
}

.logo-text-gradient {
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: 1.6rem;
  color: #0A2540;
  letter-spacing: -0.5px;
  position: relative;
}

.logo-text-gradient::after {
  content: 'GLOBAL';
  position: absolute;
  font-size: 0.55rem;
  top: -8px;
  left: 2px;
  color: #F59E0B;
  letter-spacing: 2px;
  font-weight: 700;
}

/* Search Bar */
.top-search {
  flex-grow: 1;
  max-width: 500px;
}

.search-bubble {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  padding: 6px 6px 6px 22px;
  border: 1px solid rgba(10, 37, 64, 0.1);
  transition: all 0.4s ease;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}

.search-bubble:focus-within {
  background: #fff;
  border-color: #F59E0B;
  box-shadow: 0 5px 20px rgba(245, 158, 11, 0.15);
  transform: translateY(-2px);
}

.search-bubble input {
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #1F2937;
}

.search-bubble input::placeholder {
  color: #9CA3AF;
}

.search-btn-icon {
  background: #F59E0B;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
}

.search-btn-icon:hover {
  transform: scale(1.1);
  background: #d97706;
}

/* Top Actions */
.top-nav-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.login-link {
  color: #4b5563;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.login-link i {
  font-size: 1.1rem;
  color: #0A2540;
  background: rgba(10, 37, 64, 0.05);
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.login-link:hover {
  color: #F59E0B;
}

.login-link:hover i {
  color: #fff;
  background: #F59E0B;
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
}

.action-btn.glow-btn {
  background: #0A2540;
  color: white;
  padding: 12px 28px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 6px 15px rgba(10, 37, 64, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
}

.action-btn.glow-btn:hover {
  transform: translateY(-3px);
  background: transparent;
  color: #0A2540;
  border-color: #0A2540;
  box-shadow: 0 10px 25px rgba(10, 37, 64, 0.1);
}

/* Main Navbar */
.premium-navbar {
  padding: 8px 0;
  width: 100%;
}

.premium-nav-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 30px;
}

.premium-nav-links {
  display: flex;
  align-items: center;
  gap: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: #4b5563;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  display: block;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;
  background: transparent;
}

.nav-item:hover, .nav-item.active {
  color: #0A2540;
  background: rgba(10, 37, 64, 0.05);
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #F59E0B;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.nav-item:hover::after, .nav-item.active::after {
  opacity: 1;
  bottom: 4px;
}

/* Categories Dropdown in Header */
.categories-dropdown {
  position: relative;
  display: inline-block;
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
.categories-dropdown .dropdown-menu {
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
  font-size: 1.5rem;
  color: #0A2540;
  cursor: pointer;
  padding: 10px;
  background: rgba(10, 37, 64, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
}
.mobile-toggle:hover {
  background: rgba(10, 37, 64, 0.1);
}

/* Responsive */
@media (max-width: 992px) {
  body {
    padding-top: 200px;
  }
  .hero {
    height: calc(100vh - 200px);
  }
  .extended-header {
    width: 100%;
    top: 0;
    border-radius: 0;
  }
  .top-banner-container {
    flex-wrap: wrap;
    padding: 0 20px;
  }
  .top-search {
    order: 3;
    width: 100%;
    max-width: 100%;
    margin-top: 15px;
  }
  .premium-nav-container {
    justify-content: flex-end;
  }
  .premium-nav-links {
    display: none;
    position: absolute;
    top: calc(100% + 5px);
    left: 20px;
    width: calc(100% - 40px);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(15px);
    flex-direction: column;
    gap: 0;
    box-shadow: 0 15px 40px rgba(10, 37, 64, 0.15);
    border-radius: 20px;
    padding: 15px 0;
    border: 1px solid rgba(10, 37, 64, 0.05);
  }
  .premium-nav-links.active {
    display: flex;
  }
  .nav-item {
    border-radius: 0;
    padding: 15px 25px;
    margin: 0 10px;
    border-bottom: 1px dashed rgba(10, 37, 64, 0.1);
  }
  .nav-item:last-child {
    border-bottom: none;
  }
  .nav-item::after {
    display: none;
  }
  .mobile-toggle {
    display: block;
  }
  .categories-dropdown {
    width: calc(100% - 40px);
    margin: 5px 20px 15px;
    display: block;
  }
  .btn-categories {
    width: 100%;
    justify-content: center;
  }
  .categories-dropdown .dropdown-menu {
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
    console.log('CSS elegantly restyled!');
} else {
    console.log('Regex not found. Make sure the markers exist.');
}
