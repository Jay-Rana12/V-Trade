const fs = require('fs');
const fp = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let css = fs.readFileSync(fp, 'utf8');

const regexBody = /\.join-modal-body\s*{[^}]+}/;
const newBody = .join-modal-body {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 35px 70px -10px rgba(0,0,0,0.25);
  border: 1px solid rgba(255, 255, 255, 0.6);
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
};
css = css.replace(regexBody, newBody);

const regexClose = /\.join-modal-close\s*{[^}]+}/;
const newClose = .join-modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #64748b;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
};
css = css.replace(regexClose, newClose);

const regexCloseHover = /\.join-modal-close:hover\s*{[^}]+}/;
const newCloseHover = .join-modal-close:hover {
  background: #ff477e;
  color: white;
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 4px 12px rgba(255,71,126,0.3);
};
css = css.replace(regexCloseHover, newCloseHover);

const regexHeader = /\.join-modal-header\s*{[^}]+}/;
const newHeader = .join-modal-header {
  text-align: center;
  margin-bottom: 20px;
};
css = css.replace(regexHeader, newHeader);

const regexSteps = /\.join-steps\s*{[^}]+}/;
const newSteps = .join-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
};
css = css.replace(regexSteps, newSteps);

fs.writeFileSync(fp, css);
console.log('Successfully updated modal CSS directly with Node.js');
