const fs = require('fs');
const path = require('path');

const cssFile = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

// The block to replace:
const regex = /\/\* Extended Header Styles - Restored & Advanced Iconic Design \*\/[\s\S]*?(?=\/\* Hero Section \*\/)/;

const newCSS = `/* Extended Header Styles - Windmill Two-Tier Design */
body {
  padding-top: 130px;
}
.hero {
  margin-top: 0;
  height: calc(100vh - 130px);
}

.extended-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #203544; /* Dark Slate Blue */
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  display: flex !important;
  flex-direction: column;
  align-items: flex-end;
  padding: 15px 40px;
  border-radius: 0;
  border: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  transition: all 0.3s ease;
}

.extended-header.scrolled {
  background: #1b2d3a;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

/* Pop the logo out of flow so it sits on the left */
.premium-logo {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  z-index: 10;
}

.logo-icon-glass {
  width: 55px;
  height: 55px;
  background: #F26B43; /* Match theme orange */
  border-radius: 50%; /* Make it rounded or keep gem look */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.1), 0 5px 15px rgba(242, 107, 67, 0.3);
}

.logo-icon-glass i {
  color: white;
  font-size: 1.5rem;
}

.logo-text-gradient {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  color: #ffffff; /* White text for dark background */
  letter-spacing: 1px;
}

.logo-text-gradient span {
  color: white;
}

/* Subtext if needed, currently not in HTML natively but we can mimic it if we want, ignoring for now */


/* Top Row (Search, Login, Button) */
.top-navbar-banner {
  padding: 0 0 12px 0;
  background: transparent;
  border-bottom: 2px solid rgba(255, 255, 255, 0.05); /* Subtle separator line */
  width: 100%;
}

.extended-header.scrolled .top-navbar-banner {
  border-bottom: 2px solid rgba(255, 255, 255, 0.05); /* retain inner line */
}

/* Override the default max-width container and align to right */
.top-banner-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: none;
  padding: 0;
  gap: 25px;
}

/* Search Bar - Slate style */
.top-search {
  flex-grow: 0;
  width: 300px;
}

.search-bubble {
  display: flex;
  align-items: center;
  background: #2a4154; /* Lighter slate */
  border-radius: 4px; /* Boxy look */
  padding: 8px 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.search-bubble:focus-within {
  background: #314b61;
  border-color: #F26B43;
}

.search-bubble input {
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: white;
}

.search-bubble input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-btn-icon {
  background: transparent; /* No orange circle */
  border: none;
  width: auto;
  height: auto;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: none;
}

.search-btn-icon:hover {
  color: #F26B43;
  transform: none;
  background: transparent;
}

/* Right Actions */
.top-nav-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.login-link {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.login-link i {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  transition: none;
  background: transparent;
  padding: 0;
}

.login-link:hover, .login-link:hover i {
  color: white;
  transform: none;
}

.action-btn.glow-btn {
  background: #F26B43; /* Solid Coral Orange */
  color: white;
  padding: 10px 30px;
  border-radius: 4px; /* Boxy Match */
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  display: inline-block;
  box-shadow: none;
  transition: all 0.3s ease;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.action-btn.glow-btn::before {
  display: none;
}

.action-btn.glow-btn:hover {
  transform: none;
  background: #d85732; /* Slightly darker orange */
  box-shadow: none;
}


/* Bottom Row (Nav Links) */
.premium-navbar {
  padding: 15px 0 0 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.premium-nav-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  padding: 0;
}

.premium-nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: white;
  padding: 5px 0;
  text-decoration: none;
  display: inline-block;
  position: relative;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.nav-item::before {
  display: none; /* No orange glowing dots underneath */
}

/* Let's just turn color to orange on hover */
.nav-item:hover, .nav-item.active {
  color: #F26B43;
}


/* Make Categories Button look like standard Nav Link */
.categories-dropdown {
  position: relative;
  display: block;
}

.btn-categories {
  background: transparent;
  color: white;
  border: none;
  padding: 5px 0;
  border-radius: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.btn-categories:hover {
  transform: none;
  background: transparent;
  box-shadow: none;
  color: #F26B43;
}

.categories-dropdown .dropdown-menu {
  position: absolute;
  top: 150%;
  left: -20px;
  background: white;
  min-width: 220px;
  border-radius: 4px; /* boxy */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 1000;
  padding: 10px 0;
  border: 1px solid rgba(0,0,0,0.05);
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
  font-weight: 600;
  color: #203544; /* Dark Slate Blue Text for Dropdown */
  text-decoration: none;
  transition: all 0.2s ease;
}

.dropdown-menu a:hover {
  background: rgba(242, 107, 67, 0.1);
  color: #F26B43;
  padding-left: 30px;
}

.dropdown-menu a::before {
  display: none;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
  padding: 10px;
  transition: all 0.3s ease;
  margin-left: 20px;
}

.mobile-toggle:hover {
  color: #F26B43;
}

@media (max-width: 1100px) {
  .top-search { width: 200px; }
  .extended-header { padding: 15px 20px; }
  .premium-logo { left: 20px; }
  .premium-nav-links { gap: 15px; }
}

@media (max-width: 992px) {
  .extended-header {
    flex-direction: row; /* reset to normal row */
    align-items: center;
    justify-content: space-between;
  }
  
  .premium-logo {
    position: static; /* put back in flow */
    transform: none;
  }
  
  .top-navbar-banner {
    display: none; /* Hide top right block on mobile for simplicity, or we can just hide search */
  }
  
  .premium-nav-container {
    padding: 0;
  }
  
  .premium-nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #203544;
    flex-direction: column;
    padding: 20px 0;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  
  .premium-nav-links.active {
    display: flex;
  }
  
  .nav-item, .btn-categories {
    padding: 15px 30px;
    font-size: 1rem;
    color: white;
    width: 100%;
    text-align: left;
  }
  
  .categories-dropdown {
    width: 100%;
    margin: 0;
  }
  
  .dropdown-menu {
    position: static;
    box-shadow: none;
    background: rgba(0,0,0,0.2);
    display: none;
    opacity: 1; visibility: visible; transform: none;
  }
  
  .categories-dropdown:hover .dropdown-menu {
    display: block;
  }
  
  .dropdown-menu a {
    color: white;
  }
  
  .mobile-toggle {
    display: block;
    margin: 0;
  }
}

`;

if (regex.test(content)) {
    content = content.replace(regex, newCSS);
    fs.writeFileSync(cssFile, content, 'utf8');
    console.log('Successfully applied Windmill Two-Tier Layout Style');
} else {
    console.log('Regex not found');
}
