const fs = require('fs');
const path = require('path');

const cssFile = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const regex = /\/\* Premium Navbar Styles \*\/[\s\S]*?(?=\/\* Hero Section \*\/)/;

const newCSS = `/* Extended Header Styles */
.extended-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.4s ease;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.extended-header.scrolled {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.98);
}

/* Top Banner */
.top-navbar-banner {
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.top-banner-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  gap: 30px;
}

/* Logo */
.premium-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
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
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

/* Search Bar */
.top-search {
  flex-grow: 1;
  max-width: 600px;
}

.search-bubble {
  display: flex;
  align-items: center;
  background: #F3F4F6;
  border-radius: 30px;
  padding: 6px 6px 6px 20px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.search-bubble:focus-within {
  background: white;
  border-color: #00C9FF;
  box-shadow: 0 4px 15px rgba(0, 201, 255, 0.15);
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
  background: linear-gradient(135deg, #00C9FF, #92FE9D);
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.search-btn-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 201, 255, 0.3);
}

/* Top Actions */
.top-nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.login-link {
  color: #4b5563;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s;
}

.login-link:hover {
  color: #00C9FF;
}

.action-btn.glow-btn {
  background: linear-gradient(135deg, #00C9FF, #92FE9D);
  color: white;
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 6px 15px rgba(0, 201, 255, 0.3);
  transition: all 0.3s ease;
}

.action-btn.glow-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 201, 255, 0.5);
}

/* Main Navbar */
.premium-navbar {
  padding: 0;
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
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: #374151;
  padding: 15px 10px;
  text-decoration: none;
  display: block;
  position: relative;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(to right, #00C9FF, #92FE9D);
  transition: width 0.3s ease;
  border-radius: 2px 2px 0 0;
}

.nav-item:hover, .nav-item.active {
  color: #00C9FF;
}

.nav-item:hover::after, .nav-item.active::after {
  width: 100%;
}

.mobile-toggle {
  display: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  padding: 15px;
}

body {
  padding-top: 150px;
}

.hero {
  height: calc(100vh - 150px);
  margin-top: 0;
}

/* Responsive */
@media (max-width: 992px) {
  .top-banner-container {
    flex-wrap: wrap;
    padding: 0 20px;
  }
  
  .top-search {
    order: 3;
    width: 100%;
    margin-top: 10px;
  }
  
  .premium-nav-container {
    justify-content: flex-end;
  }

  .premium-nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    gap: 0;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  .premium-nav-links.active {
    display: flex;
  }

  .nav-item {
    padding: 15px 20px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .nav-item::after {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }
  
  body {
    padding-top: 190px;
  }
  .hero {
    height: calc(100vh - 190px);
  }
}

`;

if (regex.test(cssContent)) {
    cssContent = cssContent.replace(regex, newCSS);
    fs.writeFileSync(cssFile, cssContent, 'utf8');
    console.log('CSS updated successfully');
}
