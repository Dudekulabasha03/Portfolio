/* ==========================================================================
   SUPERNOVA 3D DIGITAL AGENCY — JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. THREE.JS 3D SUPERNOVA HERO CANVAS
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 7;

  // Window Resize
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // A. Core Glowing Supernova Sphere Particles
  const PARTICLE_COUNT = 3500;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scales = new Float32Array(PARTICLE_COUNT);

  const colorCyan = new THREE.Color('#00f0ff');
  const colorViolet = new THREE.Color('#8a2be2');
  const colorPink = new THREE.Color('#ff007f');

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Sphere distribution
    const radius = 2.2 + Math.random() * 0.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Color gradient interpolation based on radius & angle
    const mixFactor = Math.random();
    let mixedColor = colorCyan.clone();
    if (mixFactor > 0.6) {
      mixedColor.lerp(colorPink, Math.random());
    } else if (mixFactor > 0.3) {
      mixedColor.lerp(colorViolet, Math.random());
    }

    colors[i * 3]     = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;

    scales[i] = Math.random() * 0.04 + 0.01;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const pMat = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const supernovaSphere = new THREE.Points(pGeo, pMat);
  scene.add(supernovaSphere);

  // B. Accretion Disk Swirling Ring
  const RING_PARTICLES = 1500;
  const ringPos = new Float32Array(RING_PARTICLES * 3);
  const ringColors = new Float32Array(RING_PARTICLES * 3);

  for (let i = 0; i < RING_PARTICLES; i++) {
    const r = 3.2 + Math.random() * 2.5;
    const angle = Math.random() * Math.PI * 2;

    ringPos[i * 3]     = Math.cos(angle) * r;
    ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
    ringPos[i * 3 + 2] = Math.sin(angle) * r;

    const rColor = (Math.random() > 0.5) ? colorCyan : colorViolet;
    ringColors[i * 3]     = rColor.r;
    ringColors[i * 3 + 1] = rColor.g;
    ringColors[i * 3 + 2] = rColor.b;
  }

  const ringGeo = new THREE.BufferGeometry();
  ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
  ringGeo.setAttribute('color', new THREE.BufferAttribute(ringColors, 3));

  const ringMat = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const accretionRing = new THREE.Points(ringGeo, ringMat);
  accretionRing.rotation.x = Math.PI * 0.25;
  scene.add(accretionRing);

  // C. Background Deep Space Starfield
  const STAR_COUNT = 1200;
  const starPos = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    starPos[i * 3]     = (Math.random() - 0.5) * 50;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.5 });
  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // D. Mouse Parallax Motion
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate3D() {
    requestAnimationFrame(animate3D);
    const elapsedTime = clock.getElapsedTime();

    // Rotate Supernova & Ring
    supernovaSphere.rotation.y = elapsedTime * 0.15;
    supernovaSphere.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

    accretionRing.rotation.y = -elapsedTime * 0.25;
    accretionRing.rotation.z = Math.sin(elapsedTime * 0.15) * 0.1;

    // Smooth Mouse Parallax Lerp
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x = targetX * 1.2;
    camera.position.y = -targetY * 1.2;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate3D();


  // ------------------------------------------------------------------------
  // 2. CUSTOM CURSOR & MAGNETIC BUTTON SYSTEM
  // ------------------------------------------------------------------------
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  const cursorText = document.getElementById('cursor-text');

  let curX = window.innerWidth / 2, curY = window.innerHeight / 2;
  let dotX = curX, dotY = curY;
  let ringX = curX, ringY = curY;

  window.addEventListener('mousemove', (e) => {
    curX = e.clientX;
    curY = e.clientY;
  });

  function renderCursor() {
    dotX += (curX - dotX) * 0.6;
    dotY += (curY - dotY) * 0.6;

    ringX += (curX - ringX) * 0.25;
    ringY += (curY - ringY) * 0.25;

    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states
  document.querySelectorAll('a, button, .service-card, .project-card, .calc-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover-btn'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover-btn'));
  });

  document.querySelectorAll('.cursor-hover-view').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorText.textContent = 'VIEW';
      document.body.classList.add('cursor-hover-view');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover-view');
    });
  });

  document.querySelectorAll('.cursor-hover-drag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorText.textContent = 'DRAG';
      document.body.classList.add('cursor-hover-drag');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover-drag');
    });
  });

  // Magnetic Buttons Effect
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });


  // ------------------------------------------------------------------------
  // 3. NAVBAR SCROLL TRANSFORM
  // ------------------------------------------------------------------------
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // ------------------------------------------------------------------------
  // 4. PORTFOLIO FILTERING & 3D TILT CARDS
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3D Card Tilt Effect
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });


  // ------------------------------------------------------------------------
  // 5. INTERACTIVE PROJECT COST CALCULATOR
  // ------------------------------------------------------------------------
  let selectedBasePrice = 4500;
  let selectedBaseName = 'Business Website';
  let addonsTotal = 0;
  let addonsCount = 0;
  let timelineMult = 1.0;
  let timelineName = 'Standard (4-6 wks)';

  const priceMinEl = document.getElementById('price-min');
  const priceMaxEl = document.getElementById('price-max');
  const resBaseNameEl = document.getElementById('res-base-name');
  const resAddonsCountEl = document.getElementById('res-addons-count');
  const resTimelineNameEl = document.getElementById('res-timeline-name');

  // Base Type Selection
  document.querySelectorAll('#project-type-options .calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#project-type-options .calc-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedBasePrice = parseInt(btn.dataset.price);
      selectedBaseName = btn.textContent.trim();
      updateCalculator();
    });
  });

  // Addons Checkboxes
  document.querySelectorAll('#addons-options input').forEach(input => {
    input.addEventListener('change', () => {
      addonsTotal = 0;
      addonsCount = 0;
      document.querySelectorAll('#addons-options input:checked').forEach(chk => {
        addonsTotal += parseInt(chk.value);
        addonsCount++;
      });
      updateCalculator();
    });
  });

  // Timeline Selection
  document.querySelectorAll('#timeline-options .timeline-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#timeline-options .timeline-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      timelineMult = parseFloat(btn.dataset.mult);
      timelineName = btn.dataset.label;
      updateCalculator();
    });
  });

  function updateCalculator() {
    const rawTotal = (selectedBasePrice + addonsTotal) * timelineMult;
    const minVal = Math.round(rawTotal * 0.9);
    const maxVal = Math.round(rawTotal * 1.2);

    priceMinEl.textContent = `$${minVal.toLocaleString()}`;
    priceMaxEl.textContent = `$${maxVal.toLocaleString()}`;

    resBaseNameEl.textContent = selectedBaseName;
    resAddonsCountEl.textContent = `${addonsCount} Addon${addonsCount === 1 ? '' : 's'}`;
    resTimelineNameEl.textContent = timelineName;
  }
  updateCalculator();


  // ------------------------------------------------------------------------
  // 6. ANIMATED COUNTERS FOR STATS & CASE STUDY
  // ------------------------------------------------------------------------
  const observerOptions = { threshold: 0.4 };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(counter => {
          const target = parseFloat(counter.dataset.count);
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
              clearInterval(timer);
            } else {
              counter.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
            }
          }, stepTime);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('#case-study, #about').forEach(sec => {
    statsObserver.observe(sec);
  });


  // ------------------------------------------------------------------------
  // 7. DRAGGABLE TESTIMONIALS SLIDER
  // ------------------------------------------------------------------------
  const slider = document.querySelector('.testimonials-slider');
  let isDown = false;
  let startX, scrollLeft;

  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => { isDown = false; });
    slider.addEventListener('mouseup', () => { isDown = false; });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }


  // ------------------------------------------------------------------------
  // 8. CONTACT FORM SUBMISSION OVERLAY
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('project-form');
  const successOverlay = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      successOverlay.classList.add('active');

      setTimeout(() => {
        contactForm.reset();
        successOverlay.classList.remove('active');
      }, 5000);
    });
  }

});
