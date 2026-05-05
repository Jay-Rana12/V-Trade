// js/three-bg.js
// Premium Three.js Hero Animation — Particle Field + Floating Rings + Mouse Parallax

let scene, camera, renderer, particles, heroRings = [], mouseX = 0, mouseY = 0;

function initThreeJS() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 55;

  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ─── 1. PREMIUM PARTICLE FIELD ──────────────────────────────────────────────
  const count = 1800;
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);

  const colorA = new THREE.Color(0xF59E0B); // Gold
  const colorB = new THREE.Color(0x4f8ef7); // Blue
  const colorC = new THREE.Color(0xffffff); // White

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 220;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 140;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

    const mix = Math.random();
    const c = mix < 0.4 ? colorA : mix < 0.7 ? colorB : colorC;
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.35,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // ─── 2. FLOATING TORUS RINGS (Hero Right Side) ─────────────────────────────
  const ringData = [
    { r: 8,  t: 0.4, color: 0xF59E0B, x: 22,  y: 0,   z: -5,  speed: 0.003 },
    { r: 5,  t: 0.25, color: 0x4f8ef7, x: 28,  y: 6,   z: -10, speed: 0.005 },
    { r: 12, t: 0.5, color: 0xffffff, x: 18,  y: -8,  z: -8,  speed: 0.002 },
    { r: 3,  t: 0.2, color: 0xF26B43, x: 32,  y: -3,  z: -3,  speed: 0.008 },
  ];

  ringData.forEach(d => {
    const geom = new THREE.TorusGeometry(d.r, d.t, 16, 80);
    const mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
      color: d.color,
      wireframe: false,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    }));
    mesh.position.set(d.x, d.y, d.z);
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.userData.speed = d.speed;
    scene.add(mesh);
    heroRings.push(mesh);
  });

  // ─── 3. ICOSAHEDRON ACCENT (left side floating gem) ────────────────────────
  const icoGeo = new THREE.IcosahedronGeometry(3.5, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0xF26B43,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending
  });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  ico.position.set(-28, 5, -10);
  scene.add(ico);
  heroRings.push(ico);

  // ─── 4. MOUSE INTERACTION ───────────────────────────────────────────────────
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ─── 5. ANIMATION LOOP ──────────────────────────────────────────────────────
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Slowly drift particles
    particles.rotation.y = t * 0.04;
    particles.rotation.x = t * 0.015;

    // Rings float & rotate continuously
    heroRings.forEach((ring, i) => {
      ring.rotation.x += ring.userData.speed || 0.003;
      ring.rotation.y += (ring.userData.speed || 0.003) * 1.5;
      ring.position.y += Math.sin(t * 0.5 + i) * 0.008; // gentle float
    });

    // Smooth camera parallax following mouse
    camera.position.x += (mouseX * 4  - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 3 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  // ─── 6. RESPONSIVE RESIZE ───────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ─── 7. SCROLL FADE — hide canvas after hero section ────────────────────────
  window.addEventListener('scroll', () => {
    const heroH = window.innerHeight;
    const scrolled = window.scrollY;
    const opacity = Math.max(0, 1 - scrolled / (heroH * 0.6));
    canvas.style.opacity = opacity;
  });
}

document.addEventListener('DOMContentLoaded', initThreeJS);
