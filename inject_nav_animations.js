const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const jsDir = path.join(dir, 'js');

if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
}

// 1. Create nav_animations.js
const navAnimationsScript = `
// Advanced GSAP & Three.js Navbar Animations

document.addEventListener("DOMContentLoaded", () => {
    // ---- 1. Three.js Rotating 3D Logo Gem ----
    const logoContainers = document.querySelectorAll('.logo-icon-glass');
    
    logoContainers.forEach(container => {
        // Clear existing icon content
        container.innerHTML = '';
        container.style.overflow = 'visible'; // Let the 3D element shine
        container.style.background = 'transparent';
        container.style.boxShadow = 'none';

        // Setup Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(60, 60); // slightly larger than container
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Center the canvas inside the container
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '50%';
        renderer.domElement.style.left = '50%';
        renderer.domElement.style.transform = 'translate(-50%, -50%)';
        renderer.domElement.style.pointerEvents = 'none'; // So clicks pass through to the link
        
        container.appendChild(renderer.domElement);

        // Create a stylish Gemstone / Octahedron Geometry
        const geometry = new THREE.OctahedronGeometry(1.5, 0); // 0 detail = sharp angles
        
        // Premium glass/gold material
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xF59E0B,      // Amber gold
            metalness: 0.8,
            roughness: 0.1,
            envMapIntensity: 1.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            transparent: true,
            opacity: 0.9,
            reflectivity: 1,
            transmission: 0.5 // Glassy effect
        });

        const gem = new THREE.Mesh(geometry, material);
        scene.add(gem);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const dLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
        dLight1.position.set(5, 5, 5);
        scene.add(dLight1);

        const dLight2 = new THREE.DirectionalLight(0xff5277, 1);
        dLight2.position.set(-5, -5, -5);
        scene.add(dLight2);

        // Animation Loop
        let rotationSpeed = 0.01;
        const animateGem = function () {
            requestAnimationFrame(animateGem);
            gem.rotation.y += rotationSpeed;
            gem.rotation.x += rotationSpeed * 0.5;
            renderer.render(scene, camera);
        };
        animateGem();

        // Speed up rotation on container hover using GSAP
        const parentLink = container.closest('a');
        if (parentLink) {
            parentLink.addEventListener('mouseenter', () => {
                gsap.to(gem.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.5, ease: 'back.out(2)' });
                gsap.to({ value: rotationSpeed }, {
                    value: 0.05, duration: 0.5, onUpdate: function() { rotationSpeed = this.targets()[0].value; }
                });
            });
            parentLink.addEventListener('mouseleave', () => {
                gsap.to(gem.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'power2.out' });
                gsap.to({ value: rotationSpeed }, {
                    value: 0.01, duration: 1, onUpdate: function() { rotationSpeed = this.targets()[0].value; }
                });
            });
        }
    });

    // ---- 2. GSAP Navbar Entrance Animation ----
    const isInitial = !sessionStorage.getItem('notFirstEntry');
    if (isInitial) {
        const navTimeline = gsap.timeline();
        
        // Animate entire header down
        navTimeline.from('.extended-header', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            delay: 0.1
        })
        // Bounce staggered entrance for the main nav links
        .from('.nav-item, .btn-categories', {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'back.out(1.5)'
        }, "-=0.5")
        // Pop in search bubble
        .from('.search-bubble', {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        }, "-=0.4")
        // Slide in right actions
        .from('.top-nav-actions > *', {
            x: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, "-=0.3");
    } else {
        // Skip animation and ensure initial state is visible
        gsap.set('.extended-header, .nav-item, .btn-categories, .search-bubble, .top-nav-actions > *', {
            opacity: 1, y: 0, x: 0, scale: 1, visibility: 'visible'
        });
    }


    // ---- 3. GSAP Magnetic Hover Effect (Advanced) ----
    const magneticItems = document.querySelectorAll('.nav-item, .action-btn, .search-btn-icon');
    
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const position = item.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            gsap.to(item, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: 'power3.out',
                force3D: true
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // ---- 4. Categories Hover Elastic Spring ----
    const catBtn = document.querySelector('.btn-categories');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const catDropdown = document.querySelector('.categories-dropdown');

    if (catBtn && dropdownMenu && catDropdown) {
        catDropdown.addEventListener('mouseenter', () => {
            gsap.fromTo(dropdownMenu, 
                { scale: 0.9, opacity: 0, transformOrigin: "top center", y: 15 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "elastic.out(1, 0.6)" }
            );
            
            // Stagger dropdown items
            gsap.fromTo(dropdownMenu.querySelectorAll('a'), 
                { x: -15, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
        });
    }
});
`;

fs.writeFileSync(path.join(jsDir, 'nav_animations.js'), navAnimationsScript, 'utf8');
console.log('Created nav_animations.js');

// 2. Inject script into all HTML files
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Only inject if it's not already there
    if (!content.includes('nav_animations.js')) {
        // Find existing scripts
        const scriptPoint = content.lastIndexOf('</script>');
        if (scriptPoint > -1) {
            const injectIndex = scriptPoint + 9;
            content = content.slice(0, injectIndex) + '\n    <script src="js/nav_animations.js"></script>' + content.slice(injectIndex);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Injected into ' + file);
        }
    }
});
