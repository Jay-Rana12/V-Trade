const fs = require('fs');

const cssFile = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

const regex = /\/\* Navbar \*\/[\s\S]*?(?=\/\* Hero Section \*\/)/;

const newCSS = `/* Main Header Styles */
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #ffffff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

/* Common gradient buttons */
.btn-gradient {
  background: linear-gradient(to right, #FF7B54, #FF5277);
  color: #fff !important;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-family: var(--heading-font);
}
.btn-gradient:hover {
  background: linear-gradient(to right, #FF5277, #FF7B54);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(255, 82, 119, 0.3);
}

/* Header Top */
.header-top {
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}
.header-top-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

/* Logo */
.header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.logo-v-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  color: #333333;
  letter-spacing: 0.5px;
}

/* Search Bar */
.header-search-wrapper {
  flex-grow: 1;
  max-width: 600px;
}
.header-search {
  display: flex;
  align-items: center;
  background: #F3F4F6;
  border-radius: 50px;
  padding: 5px;
  padding-left: 20px;
  position: relative;
}
.header-search input {
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  padding: 10px 0;
  font-family: var(--body-font);
  font-size: 0.95rem;
  color: #333;
}
.mic-icon {
  color: #6b7280;
  margin-right: 15px;
  cursor: pointer;
  transition: 0.3s;
}
.mic-icon:hover {
  color: #FF5277;
}
.search-btn {
  background: linear-gradient(to right, #FF7B54, #FF5277);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}
.search-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(255, 82, 119, 0.3);
}

/* User Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}
.sign-in-link {
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--heading-font);
}
.sign-in-link:hover {
  color: #FF5277;
}
.header-btn-join {
  border-radius: 50px;
}

/* Header Bottom Nav */
.header-bottom {
  background: #ffffff;
}
.header-bottom-container {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 30px;
}
.btn-categories {
  border-radius: 6px;
  padding: 10px 20px;
}

.nav-links {
  display: flex;
  gap: 25px;
  flex-grow: 1;
}
.nav-links a {
  font-family: var(--heading-font);
  font-weight: 500;
  color: #4b5563;
  position: relative;
  font-size: 0.95rem;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #FF7B54, #FF5277);
  transition: width 0.3s ease;
}
.nav-links a:hover,
.nav-links a.active {
  color: #FF5277;
}
.nav-links a:hover::after,
.nav-links a.active::after {
  width: 100%;
}

.mobile-toggle {
  display: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
}

/* Ensure body starts below the new header */
body {
  padding-top: 155px; /* Adjust depending on total header height */
}

/* Need to override the hero margin because body padding already accounts for the fixed header */
.hero {
  height: calc(100vh - 155px);
  margin-top: 0;
}

/* Responsive */
@media (max-width: 992px) {
  .header-actions { display: none; }
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #fff;
    flex-direction: column;
    gap: 0;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  .nav-links.active {
    display: flex;
  }
  .nav-links li {
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
  }
  .nav-links a {
    display: block;
    padding: 15px 20px;
  }
  .mobile-toggle {
    display: block;
    margin-left: auto;
  }
  .header-top-container {
    flex-wrap: wrap;
  }
  .header-search-wrapper {
    order: 3;
    width: 100%;
    max-width: 100%;
    margin-top: 10px;
  }
  body { padding-top: 195px; }
  .hero { height: calc(100vh - 195px); }
}

`;

if (regex.test(content)) {
    content = content.replace(regex, newCSS);
    fs.writeFileSync(cssFile, content, 'utf8');
    console.log('CSS updated successfully');
} else {
    console.log('Regex not found. Maybe it was already substituted?');
}
