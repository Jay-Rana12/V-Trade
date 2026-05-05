const fs = require('fs');
const path = require('path');

const projectDir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const imagesDir = path.join(projectDir, 'images');

const srcImages = [
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/steel_manufacturing_1773474869099.png',
    'C:/Users/AE/.gemini/antigravity/brain/20e34486-a446-4eaf-8a1a-57ef9b3baab4/quality_assurance_1773474892225.png'
];
const destImages = [
    'steel_manufacturing.png',
    'quality_assurance.png'
];

// Copy images
srcImages.forEach((src, idx) => {
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(imagesDir, destImages[idx]));
    }
});

const indexPath = path.join(projectDir, 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf8');

// The New Content to inject
const newManufacturingHtml = `
    <!-- Dynamic Manufacturing Section -->
    <section class="manufacturing-process section-padding" style="overflow: hidden; background: white;">
        <div class="container" style="display: flex; flex-wrap: wrap; align-items: center; gap: 50px;">
            <div class="mnf-content" style="flex: 1; min-width: 300px;">
                <h4 style="color: #F26B43; font-family: 'Poppins', sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">The Art of Craftsmanship</h4>
                <h2 style="font-size: 2.8rem; color: #0A2540; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 25px; line-height: 1.2;">Forging Perfection in Every Utensil</h2>
                <p style="color: #6b7280; font-size: 1.1rem; margin-bottom: 20px; line-height: 1.7;">From premium raw steel coils to the final mirror-finish thali, our cutting-edge manufacturing facilities utilize advanced German and Japanese metallurgy technology to shape the most durable bartans in India.</p>
                <ul style="list-style: none; padding: 0; margin-bottom: 30px;">
                    <li style="display: flex; align-items: center; margin-bottom: 15px; font-weight: 600; color: #203544;">
                        <i class="fa-solid fa-check-circle" style="color: #F26B43; margin-right: 15px; font-size: 1.2rem;"></i> SS 304 & 202 Grade Stainless Steel 
                    </li>
                    <li style="display: flex; align-items: center; margin-bottom: 15px; font-weight: 600; color: #203544;">
                        <i class="fa-solid fa-check-circle" style="color: #F26B43; margin-right: 15px; font-size: 1.2rem;"></i> Precision Machine Pressing & Molding
                    </li>
                    <li style="display: flex; align-items: center; margin-bottom: 15px; font-weight: 600; color: #203544;">
                        <i class="fa-solid fa-check-circle" style="color: #F26B43; margin-right: 15px; font-size: 1.2rem;"></i> Flawless Mirror Polishing Finish
                    </li>
                </ul>
                <a href="about.html" class="btn btn-primary" style="background:#0A2540; color: white;">Explore Our Journey</a>
            </div>
            <div class="mnf-image" style="flex: 1; min-width: 300px; position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                <div class="img-mask" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #F26B43; z-index: 2;"></div>
                <img src="images/steel_manufacturing.png" alt="Steel Manufacturing Line" style="width: 100%; height: 100%; object-fit: cover; transform: scale(1.2);">
            </div>
        </div>
    </section>

    <!-- Parallax Quality Assurance Section -->
    <section class="quality-assurance" style="position: relative; padding: 120px 0; background: url('images/quality_assurance.png') center center/cover fixed; text-align: center; overflow: hidden; z-index: 1;">
        <!-- Dark Overlay -->
        <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(135deg, rgba(10,37,64,0.95), rgba(32,53,68,0.8)); z-index: -1;"></div>
        
        <div class="container" style="position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center;">
            <div class="qa-badge" style="width: 80px; height: 80px; background: rgba(242, 107, 67, 0.2); border: 2px solid #F26B43; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-bottom: 25px;">
                <i class="fa-solid fa-award" style="font-size: 2.2rem; color: #F26B43;"></i>
            </div>
            <h2 class="qa-title" style="color: white; font-size: 3rem; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 20px; text-transform: uppercase;">100% Food-Grade Certification</h2>
            <p class="qa-desc" style="color: rgba(255,255,255,0.8); max-width: 800px; font-size: 1.2rem; line-height: 1.8; margin-bottom: 40px;">GlobalTrade India guarantees uncompromised hygiene and endurance. Every piece of cutlery, dinnerware, and catering supply under-goes 30+ rigorous quality checks to resist rust, heavy impacts, and thermal shocks.</p>
            
            <div class="qa-stats" style="display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; width: 100%;">
                <div class="qa-stat-item" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 30px; border-radius: 12px; backdrop-filter: blur(10px); flex: 1; min-width: 250px;">
                    <h3 style="color: #F26B43; font-size: 2.5rem; font-family: 'Poppins'; margin-bottom: 10px;">ISO 9001</h3>
                    <p style="color: white; font-weight: 600;">Certified Facilities</p>
                </div>
                <div class="qa-stat-item" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 30px; border-radius: 12px; backdrop-filter: blur(10px); flex: 1; min-width: 250px;">
                    <h3 style="color: #F26B43; font-size: 2.5rem; font-family: 'Poppins'; margin-bottom: 10px;">0%</h3>
                    <p style="color: white; font-weight: 600;">Harmful Leaching</p>
                </div>
                <div class="qa-stat-item" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 30px; border-radius: 12px; backdrop-filter: blur(10px); flex: 1; min-width: 250px;">
                    <h3 style="color: #F26B43; font-size: 2.5rem; font-family: 'Poppins'; margin-bottom: 10px;">Lifetime</h3>
                    <p style="color: white; font-weight: 600;">Rust Resistance</p>
                </div>
            </div>
        </div>
    </section>
`;

// Insert BEFORE "Why Choose Us"
if (!htmlContent.includes('Forging Perfection in Every Utensil')) {
    htmlContent = htmlContent.replace('<!-- Why Choose Us -->', newManufacturingHtml + '\n\n    <!-- Why Choose Us -->');
    fs.writeFileSync(indexPath, htmlContent, 'utf8');
    console.log('Injected extensive Manufacturing and QA content!');
}


// Now Let's add advanced GSAP animations explicitly for these new sections
const animationsPath = path.join(projectDir, 'js', 'animations.js');
let animContent = fs.readFileSync(animationsPath, 'utf8');

const newGSAP = `
    // 🔥 ADVANCED KITCHENWARE GSAP ANIMATIONS 🔥
    
    // 1. Manufacturing Process Mask Reveal
    if(document.querySelector('.manufacturing-process')) {
        let mnfTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.manufacturing-process',
                start: 'top 75%',
            }
        });

        // Unmask the image beautifully
        mnfTl.to('.img-mask', {
            height: 0,
            duration: 1.2,
            ease: 'power4.inOut'
        })
        // Image scale down to normal
        .to('.mnf-image img', {
            scale: 1,
            duration: 1.5,
            ease: 'power3.out'
        }, "-=1.0")
        // Text stuff sliding in
        .from('.mnf-content h4', {
            x: -30, opacity: 0, duration: 0.6, ease: 'power2.out'
        }, "-=1.2")
        .from('.mnf-content h2', {
            y: 30, opacity: 0, duration: 0.6, ease: 'power2.out'
        }, "-=1.0")
        .from('.mnf-content p', {
            y: 20, opacity: 0, duration: 0.6, ease: 'power2.out'
        }, "-=0.8")
        .from('.mnf-content li', {
            x: -20, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out'
        }, "-=0.6")
        .from('.mnf-content .btn', {
            y: 20, opacity: 0, duration: 0.5, scale: 0.9, ease: 'back.out(1.5)'
        }, "-=0.4");
    }

    // 2. Parallax Quality Assurance Section Let's make it POP
    if(document.querySelector('.quality-assurance')) {
        let qaTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.quality-assurance',
                start: 'top 80%',
            }
        });

        qaTl.from('.qa-badge', {
            scale: 0, rotation: 180, duration: 0.8, ease: 'back.out(1.5)', opacity: 0
        })
        .from('.qa-title', {
            y: 50, opacity: 0, duration: 0.7, ease: 'power3.out'
        }, "-=0.4")
        .from('.qa-desc', {
            y: 30, opacity: 0, duration: 0.7, ease: 'power3.out'
        }, "-=0.5")
        // Pop up the stats items staggered
        .from('.qa-stat-item', {
            y: 60, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'back.out(1.2)'
        }, "-=0.3");

        // Tiny floating effect for the badge on hover
        gsap.to('.qa-badge', {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    // 3. Stagger Gallery Cards
    if(document.querySelectorAll('.gallery-card').length > 0) {
        gsap.from('.gallery-card', {
            scrollTrigger: {
                trigger: '.kitchenware-gallery',
                start: 'top 75%'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
    }
`;

if (!animContent.includes('ADVANCED KITCHENWARE GSAP ANIMATIONS')) {
    fs.writeFileSync(animationsPath, animContent + '\n\n' + newGSAP, 'utf8');
    console.log('Appended advanced GSAP animations!');
}

