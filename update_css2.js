const fs = require('fs');

const cssFile = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

const regex = /\/\* Main Header Styles \*\/[\s\S]*?(?=\/\* Hero Section \*\/)/;

const newCSS = `/* Main Header Styles - Colorful & Animated Redesign */
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.main-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #FF5277, #FF7B54, #F59E0B, #10B981, #3B82F6, #8B5CF6);
  background-size: 300% 300%;
  animation: rainbow-border 6s ease infinite;
}

@keyframes rainbow-border {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Header Top */
.header-top {
  padding: 12px 0;
  border-bottom: 1px dashed rgba(0,0,0,0.05);
  background: linear-gradient(to right, rgba(255,255,255,0.9), rgba(245, 247, 250, 0.6));
}
.header-top-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

/* Logo Animation */
.header-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}
.header-logo:hover .logo-v-icon {
  transform: rotateY(180deg) scale(1.1);
}
.logo-v-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.logo-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: 1.8rem;
  background: linear-gradient(45deg, #1F2937, #FF5277);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

/* Animated Gradient Buttons */
.btn-gradient {
  background: linear-gradient(45deg, #FF7B54, #FF5277, #8B5CF6, #FF5277);
  background-size: 300% 300%;
  animation: gradientShift 4s ease infinite;
  color: #fff !important;
  border: none;
  border-radius: 12px;
  padding: 10px 22px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: var(--heading-font);
  box-shadow: 0 4px 15px rgba(255, 82, 119, 0.3);
  position: relative;
  z-index: 1;
  overflow: hidden;
}
.btn-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.5s ease;
  z-index: -1;
}
.btn-gradient:hover::before {
  left: 100%;
}
.btn-gradient:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 10px 25px rgba(255, 82, 119, 0.5);
}
.btn-gradient i {
  transition: transform 0.3s ease;
}
.btn-gradient:hover i {
  transform: scale(1.2) rotate(15deg);
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Search Bar - Animated */
.header-search-wrapper {
  flex-grow: 1;
  max-width: 600px;
}
.header-search {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 50px;
  padding: 6px;
  padding-left: 25px;
  position: relative;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.05), 0 5px 15px rgba(0,0,0,0.03);
  transition: all 0.4s ease;
}
.header-search::before {
  content: '';
  position: absolute;
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  z-index: -1;
  border-radius: 50px;
  background: linear-gradient(45deg, #FF7B54, #FF5277, #3B82F6);
  opacity: 0;
  transition: opacity 0.4s ease;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}
.header-search:focus-within::before {
  opacity: 1;
}
.header-search:focus-within {
  transform: scale(1.02);
  box-shadow: 0 15px 30px rgba(255, 82, 119, 0.15);
}
.header-search input {
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  padding: 10px 0;
  font-family: var(--body-font);
  font-size: 1rem;
  color: #333;
}
.header-search input::placeholder {
  color: #9CA3AF;
  transition: color 0.3s;
}
.header-search input:focus::placeholder {
  color: transparent;
}
.mic-icon {
  color: #6b7280;
  margin-right: 15px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.mic-icon:hover {
  color: #FF5277;
  transform: scale(1.3);
}
.search-btn {
  background: linear-gradient(45deg, #FF7B54, #FF5277);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 10px rgba(255, 82, 119, 0.3);
  position: relative;
  overflow: hidden;
}
.search-btn::after {
  content: '';
  position: absolute;
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  transform: scale(0);
  transition: transform 0.4s ease;
}
.search-btn:hover {
  transform: scale(1.1) rotate(10deg);
  box-shadow: 0 8px 20px rgba(255, 82, 119, 0.5);
}
.search-btn:hover::after {
  transform: scale(2);
  opacity: 0;
}

/* User Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}
.sign-in-link {
  color: #333;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--heading-font);
  transition: all 0.3s ease;
  position: relative;
}
.sign-in-link i {
  font-size: 1.2rem;
  background: linear-gradient(45deg, #FF7B54, #FF5277);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.3s ease;
}
.sign-in-link:hover {
  color: #FF5277;
}
.sign-in-link:hover i {
  transform: translateY(-3px);
}
.header-btn-join {
  border-radius: 50px;
}

/* Header Bottom Nav */
.header-bottom {
  background: transparent;
}
.header-bottom-container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  gap: 40px;
}
.btn-categories {
  border-radius: 8px;
  padding: 10px 24px;
}

/* Navigation Links with Advanced Hover */
.nav-links {
  display: flex;
  gap: 30px;
  flex-grow: 1;
}
.nav-links a {
  font-family: var(--heading-font);
  font-weight: 600;
  color: #374151;
  position: relative;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  z-index: 1;
}

/* Animated Hover Background */
.nav-links a::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, rgba(255, 82, 119, 0.1), rgba(255, 123, 84, 0.1));
  transition: top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: -1;
  border-radius: 8px;
}
.nav-links a:hover::before,
.nav-links a.active::before {
  top: 0;
}

/* Animated Underline Glow */
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(to right, #FF7B54, #FF5277, #8B5CF6);
  border-radius: 2px;
  transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 0 10px rgba(255, 82, 119, 0.5);
}
.nav-links a:hover,
.nav-links a.active {
  color: #FF5277;
  transform: translateY(-2px);
}
.nav-links a:hover::after,
.nav-links a.active::after {
  width: 80%;
}

.mobile-toggle {
  display: none;
  font-size: 1.8rem;
  color: #333;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
}
.mobile-toggle:hover {
  color: #FF5277;
  transform: scale(1.1);
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
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-direction: column;
    gap: 0;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    border-top: 2px solid #FF5277;
    border-radius: 0 0 20px 20px;
    padding: 10px 0;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    transition: clip-path 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .nav-links.active {
    display: flex;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  .nav-links li {
    width: 100%;
    transform: translateX(-20px);
    opacity: 0;
    transition: all 0.4s ease;
  }
  .nav-links.active li {
    transform: translateX(0);
    opacity: 1;
  }
  /* Staggered animation for mobile links */
  .nav-links.active li:nth-child(1) { transition-delay: 0.1s; }
  .nav-links.active li:nth-child(2) { transition-delay: 0.15s; }
  .nav-links.active li:nth-child(3) { transition-delay: 0.2s; }
  .nav-links.active li:nth-child(4) { transition-delay: 0.25s; }
  .nav-links.active li:nth-child(5) { transition-delay: 0.3s; }
  .nav-links.active li:nth-child(6) { transition-delay: 0.35s; }
  .nav-links.active li:nth-child(7) { transition-delay: 0.4s; }
  
  .nav-links a {
    display: block;
    padding: 15px 30px;
    border-left: 4px solid transparent;
    border-radius: 0;
  }
  .nav-links a::after { display: none; }
  .nav-links a:hover {
    border-left: 4px solid #FF5277;
    background: linear-gradient(90deg, rgba(255,82,119,0.1), transparent);
    transform: translateX(10px);
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
    margin-top: 15px;
  }
  body { padding-top: 195px; }
  .hero { height: calc(100vh - 195px); }
}

`;

if (regex.test(content)) {
    content = content.replace(regex, newCSS);
    fs.writeFileSync(cssFile, content, 'utf8');
    console.log('CSS updated successfully with animations!');
} else {
    console.log('Regex not found. Maybe it was already substituted?');
}
