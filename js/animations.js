// js/animations.js

// Initialize GSAP Animations
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    // --- Advanced Hero Redesign GSAP ---
    if (document.querySelector('.hero-advanced')) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        
        // 1.1 Smooth Background Reveal
        tl.from(".hero-bg-image", {
            scale: 1.2,
            filter: "brightness(0.1) blur(10px)",
            duration: 2.2,
        }, 0);

        // Smooth Text Entrance
        tl.from(".hero-text-side h1", {
            x: -100,
            opacity: 0,
            duration: 1.5,
        }, 0.5)
        .from(".hero-text-side p", {
            y: 40,
            opacity: 0,
            duration: 1.2
        }, "-=1.0")
        .from(".hero-btns .btn", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.5)"
        }, "-=0.8");

        // Advanced Hero Showcase Entrance
        tl.from(".hero-main-showcase", {
            x: 150,
            rotationY: 30,
            opacity: 0,
            duration: 1.8,
            ease: "expo.out"
        }, "-=1.2")
        .from(".mini-floating-item", {
            scale: 0,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "back.out(1.7)"
        }, "-=0.8");

        // High-End Mouse Parallax Experience
        const heroSection = document.querySelector('.hero-advanced');
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth) - 0.5;
            const yPos = (clientY / window.innerHeight) - 0.5;

            // Main Showcase 3D Tilt
            gsap.to(".hero-main-showcase", {
                rotationY: -15 + (xPos * 20),
                rotationX: 10 + (yPos * -20),
                x: xPos * 40,
                y: yPos * 40,
                duration: 2,
                ease: "power3.out",
                overwrite: 'auto'
            });

            // Mini Items Parallax
            gsap.to(".item-1", { x: xPos * -60, y: yPos * -60, duration: 2.5, ease: "power3.out" });
            gsap.to(".item-2", { x: xPos * 80, y: yPos * 80, duration: 2.2, ease: "power3.out" });

            // Subtle text parallax
            gsap.to(".hero-text-side", {
               x: xPos * 25,
               y: yPos * 25,
               duration: 2.5,
               ease: "power3.out",
               overwrite: 'auto'
            });
            
            // Parallax glow
            gsap.to(".industrial-glow", {
               x: xPos * -100,
               y: yPos * -100,
               duration: 3,
               ease: "power2.out",
               overwrite: 'auto'
            });
        });
    }

    // Page Header Entrance (Inner Pages)
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        gsap.from(".page-header h1", {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });
        gsap.from(".page-header p", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5
        });
    }

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.glass-card, .service-card, .feature-item, .team-card, .product-card, .blog-card, .contact-info-card, .contact-form');

    revealElements.forEach((el, index) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Section Titles Animation
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // 3. Number Counter Animation for About / Home
    const counterItems = document.querySelectorAll('.counter-number');
    counterItems.forEach(item => {
        const target = item.getAttribute('data-target');

        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
            },
            innerHTML: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            onUpdate: function () {
                item.innerHTML = Math.ceil(item.innerHTML) + (item.getAttribute('data-suffix') || '');
            }
        });
    });

    // 4. Parallax effect for headers
    gsap.utils.toArray('.hero, .page-header').forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            backgroundPosition: "50% 100%",
            ease: "none"
        });
    });

    // --- CONTACT PAGE SPECIFIC GSAP ---
    if (document.querySelector('.contact-main-section')) {

        // Stagger attraction cards
        gsap.from(".attraction-card", {
            scrollTrigger: {
                trigger: ".attraction-cards",
                start: "top 80%",
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Quick contact strip reveal
        gsap.from(".quick-contact-strip", {
            scrollTrigger: {
                trigger: ".quick-contact-strip",
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.6
        });

        // Form container entrance with advanced effects
        gsap.from(".form-container", {
            scrollTrigger: {
                trigger: ".form-container",
                start: "top 75%",
            },
            y: 100,
            scale: 0.9,
            rotationX: -10,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out"
        });

        // Form fields staggered entrance with slide and fade
        gsap.from(".premium-form .form-group, .premium-form .form-row", {
            scrollTrigger: {
                trigger: ".premium-form",
                start: "top 70%",
            },
            y: 40,
            x: -20,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.5
        });

        // Form Header text reveal
        gsap.from(".form-header h3, .form-header p", {
            scrollTrigger: {
                trigger: ".form-header",
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2
        });

        // Special Send Message button ripple/pulse effect on reveal
        gsap.from(".submit-btn", {
            scrollTrigger: {
                trigger: ".submit-btn",
                start: "top 90%",
            },
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: "back.out(2)",
            delay: 1.2
        });

        // Map Section Reveal
        gsap.from(".map-container-premium", {
            scrollTrigger: {
                trigger: ".map-section",
                start: "top 75%",
            },
            y: 100,
            scale: 0.95,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        });

        // Map Info Card Floating Intro
        gsap.from(".map-info-premium", {
            scrollTrigger: {
                trigger: ".map-container-premium",
                start: "top 60%",
            },
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 0.5
        });

        // Map Info Details Stagger
        gsap.from(".map-stat-item", {
            scrollTrigger: {
                trigger: ".map-info-premium",
                start: "top 80%",
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            delay: 1
        });

        // Map Badge Entrance
        gsap.from(".map-badge", {
            scrollTrigger: {
                trigger: ".map-container-premium",
                start: "top 70%",
            },
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.8
        });
    }

    // --- ADVANCED KITCHENWARE GSAP ANIMATIONS (RETAINED & FIXED) ---

    // 1. Manufacturing Process Mask Reveal
    if (document.querySelector('.manufacturing-process')) {
        let mnfTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.manufacturing-process',
                start: 'top 75%',
            }
        });

        mnfTl.to('.img-mask', {
            height: 0,
            duration: 1.2,
            ease: 'power4.inOut'
        })
            .to('.mnf-image img', {
                scale: 1,
                duration: 1.5,
                ease: 'power3.out'
            }, "-=1.0")
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

    // 2. Parallax Quality Assurance Section
    if (document.querySelector('.quality-assurance')) {
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
            .from('.qa-stat-item', {
                y: 60, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'back.out(1.2)'
            }, "-=0.3");

        gsap.to('.qa-badge', {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    // 3. Stagger Gallery Cards
    if (document.querySelectorAll('.gallery-card').length > 0) {
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


    // 5. About Details Entrance
    const aboutImg = document.querySelector('.about-img');
    if (aboutImg) {
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



});
