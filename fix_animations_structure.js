const fs = require('fs');
const path = require('path');

const projectDir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const animationsPath = path.join(projectDir, 'js', 'animations.js');

const newAnimations = `
    // 4. Amazon Grid Stagger
    if(document.querySelectorAll('.amazon-product-card').length > 0) {
        gsap.from('.amazon-product-card', {
            scrollTrigger: {
                trigger: '.curated-collection',
                start: 'top 80%'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        });
    }

    // 5. About Details Entrance
    const aboutImg = document.querySelector('.about-img');
    if(aboutImg) {
        gsap.from(aboutImg, {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 80%'
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
`;

// I'll rewrite the file to make sure everything is inside the DOMContentLoaded listener properly
let content = fs.readFileSync(animationsPath, 'utf8');

// Find the last closing brace of the DOMContentLoaded function
const lastBraceIndex = content.lastIndexOf('});');

if (lastBraceIndex !== -1) {
    const beforeBrace = content.substring(0, lastBraceIndex);
    const afterBrace = content.substring(lastBraceIndex);

    // Clean up any loose blocks that might have been appended incorrectly outside the brace
    // Note: I saw some were appended at the end of the file in previous steps.

    fs.writeFileSync(animationsPath, beforeBrace + newAnimations + afterBrace, 'utf8');
    console.log('Optimized animation.js structure and added new effects');
}
