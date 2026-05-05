// Advanced GSAP & Three.js Navbar Animations (Refined & Subtle)

document.addEventListener("DOMContentLoaded", () => {
    // ---- 1. Three.js Subtle Rotating Logo Gem ----
    const logoContainers = document.querySelectorAll('.logo-icon-glass');

    logoContainers.forEach(container => {
        // Clear existing icon content but keep its layout intact
        container.innerHTML = '';
        container.style.position = 'relative';

        // Setup clear Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
        camera.position.z = 4.5; // Zoomed out slightly to fit within bounds

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        // Set exact dimensions so it doesn't break out of the container
        renderer.setSize(50, 50);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Ensure the canvas fully centers and acts strictly as a background/icon visual
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.pointerEvents = 'none';

        container.appendChild(renderer.domElement);

        // Solid Gem Geometry
        const geometry = new THREE.OctahedronGeometry(1.2, 0);

        // Simple but beautiful material
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xF26B43, // Coral Orange match
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 1.0,
            transparent: true,
            opacity: 0.9,
        });

        const gem = new THREE.Mesh(geometry, material);
        scene.add(gem);

        // Basic ambient and directional lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
        dLight1.position.set(5, 5, 5);
        scene.add(dLight1);

        // Smooth Animation Loop
        let rotationSpeed = 0.01;
        const animateGem = function () {
            requestAnimationFrame(animateGem);
            gem.rotation.y += rotationSpeed;
            gem.rotation.x += rotationSpeed * 0.5;
            renderer.render(scene, camera);
        };
        animateGem();

        // Speed up rotation on hover gently
        const parentLink = container.closest('a');
        if (parentLink) {
            parentLink.addEventListener('mouseenter', () => {
                gsap.to(gem.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.4, ease: 'back.out(1.5)' });
                gsap.to({ value: rotationSpeed }, {
                    value: 0.04, duration: 0.5, onUpdate: function () { rotationSpeed = this.targets()[0].value; }
                });
            });
            parentLink.addEventListener('mouseleave', () => {
                gsap.to(gem.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: 'power2.out' });
                gsap.to({ value: rotationSpeed }, {
                    value: 0.01, duration: 0.5, onUpdate: function () { rotationSpeed = this.targets()[0].value; }
                });
            });
        }
    });

    // ---- 2. GSAP Clean Initial Navbar Entrance ----
    // Make sure we only animate elements that actually exist
    const hasHeader = document.querySelector('.extended-header');
    if (hasHeader) {
        // Only run entrance animation on fresh entry or reload (sync with preloader logic)
        const isInitial = !sessionStorage.getItem('notFirstEntry');
        
        if (isInitial) {
            const navTimeline = gsap.timeline();

            navTimeline.from('.nav-item', {
                    y: -10,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'power2.out',
                    clearProps: 'all'
                })
                .from('.top-nav-actions', {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    clearProps: 'all'
                }, "-=0.3");
        } else {
            // Ensure visibility if animation is skipped
            gsap.set('.nav-item, .top-nav-actions', { opacity: 1, y: 0, visibility: 'visible' });
        }
    }
});
