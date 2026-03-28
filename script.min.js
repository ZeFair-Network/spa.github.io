document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен. Скрипты инициализируются.");

    // Запускаем немедленно — не ждём компонентов
    initCustomCursor();
    initParticles();
    initDotGrid();

    // --- Load Components ---
    const loadComponent = (url, placeholderId) => {
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                }
            });
    };

    const componentsToLoad = [
        loadComponent('header.html', 'header-placeholder'),
        loadComponent('footer.html', 'footer-placeholder'),
        loadComponent('background.html', 'background-placeholder')
    ];

    Promise.all(componentsToLoad).then(() => {
        console.log("All components loaded.");
        initializeSmoothScroll();
        initializeAuroraBackground();
        initializeAlbumPopup();
        // --- Premium Animations ---
        initAuroraTracking();
        initMagneticButtons();
        initScrollReveal();
        initStickyHero();
        initTextScramble();
        initAmbientParticles();
    });

    function initializeSmoothScroll() {
        document.body.addEventListener('click', function(e) {
            const link = e.target.closest('header nav ul li a');
            if (link) {
                const href = link.getAttribute('href');
                const [path, anchor] = href.split('#');
                if (path === window.location.pathname.split('/').pop() && anchor) {
                    e.preventDefault();
                    const targetElement = document.getElementById(anchor);
                    if (targetElement) {
                        const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset - (document.querySelector('header')?.offsetHeight || 0);
                        window.scrollTo({
                            top: topOffset,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    }

    // --- Ripple Effect for Buttons ---
    document.body.addEventListener('click', function(e) {
        const button = e.target.closest('.md-button, .md-button--icon');
        if (button) {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${e.clientX - rect.left - radius}px`;
            ripple.style.top = `${e.clientY - rect.top - radius}px`;
            ripple.classList.add('ripple');
            const oldRipple = button.querySelector('.ripple');
            if (oldRipple) {
                oldRipple.remove();
            }
            button.appendChild(ripple);
        }
    });

    // --- Audio Player Logic ---
    const playPauseBtn = document.querySelector('.play-pause');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            const icon = this.querySelector('.material-icons');
            if (icon.textContent === 'play_arrow') {
                icon.textContent = 'pause';
            } else {
                icon.textContent = 'play_arrow';
            }
        });
    }

    // --- Gallery Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const closeBtn = document.querySelector('.close-lightbox');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = item.src;
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // --- Popup Logic for Modes ---
    function initializeAlbumPopup() {
        const albumPopup = document.getElementById('album-popup');
        if (!albumPopup) return;

        const albumCards = document.querySelectorAll('.album-card');
        const closePopupBtn = albumPopup.querySelector('.close-popup');

        albumCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.dataset.title;
                const year = card.dataset.year;
                const summary = card.dataset.summary;
                const cover = card.dataset.cover;
                const features = card.dataset.features ? JSON.parse(card.dataset.features) : [];

                albumPopup.querySelector('#popup-title').textContent = title;
                albumPopup.querySelector('#popup-year').textContent = year;
                albumPopup.querySelector('#popup-summary').textContent = summary;
                albumPopup.querySelector('#popup-cover').src = cover;

                const featuresList = albumPopup.querySelector('#popup-features');
                if (featuresList) {
                    featuresList.innerHTML = '';
                    features.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature;
                        featuresList.appendChild(li);
                    });
                }

                albumPopup.classList.add('visible');
            });
        });

        const closePopup = () => {
            albumPopup.classList.remove('visible');
        };

        closePopupBtn.addEventListener('click', closePopup);
        albumPopup.addEventListener('click', (e) => {
            if (e.target === albumPopup) {
                closePopup();
            }
        });
    }

    // --- Aurora Background Logic ---
    function initializeAuroraBackground() {
        if (document.querySelector('.aurora-background')) {
            document.body.addEventListener('click', function(e) {
                const splash = document.createElement('div');
                splash.className = 'click-splash';
                splash.style.left = `${e.clientX}px`;
                splash.style.top = `${e.clientY}px`;
                document.body.appendChild(splash);
                setTimeout(() => {
                    splash.remove();
                }, 600);
            });
        }
    }
});

// --- Preloader and Scroll Animation Logic ---
window.onload = () => {
    console.log("Страница полностью загружена.");
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');

    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        const elementsToAnimate = document.querySelectorAll('.md-card, .feed-item, .photo-grid img, .video-container, .album-card, .tour-item, .gallery-item, .social-button, .professional-contacts');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });

        elementsToAnimate.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('visible');
            }
        });

    }, 500);
};

// =============================================================
// PREMIUM ANIMATIONS
// =============================================================

// --- Custom Cursor ---
function initCustomCursor() {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let rafActive = false;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
        if (!rafActive) {
            rafActive = true;
            requestAnimationFrame(tickRing);
        }
    });

    function tickRing() {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        if (Math.abs(rx - mx) > 0.4 || Math.abs(ry - my) > 0.4) {
            requestAnimationFrame(tickRing);
        } else {
            rafActive = false;
        }
    }

    const interactSel = 'a, button, input, .album-card, .launcher-feature-card, .step-card, .gallery-item, .social-button, [class*="btn-download"]';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactSel)) {
            dot.classList.add('hovering');
            ring.classList.add('hovering');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactSel)) {
            dot.classList.remove('hovering');
            ring.classList.remove('hovering');
        }
    });
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });
}

// --- Magnetic Buttons ---
function initMagneticButtons() {
    const btns = document.querySelectorAll('.md-button--filled, .btn-download');
    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width  / 2) * 0.3;
            const y = (e.clientY - r.top  - r.height / 2) * 0.3;
            btn.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
            btn.style.transition = 'transform 0.08s linear';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
        });
    });
}

// --- Scroll Reveal with Stagger ---
function initScrollReveal() {
    // Section headings
    document.querySelectorAll('section > h2, section > h1').forEach(el => {
        if (!el.closest('#hero')) el.classList.add('anim-reveal');
    });

    // Launcher feature cards — stagger
    document.querySelectorAll('.launcher-feature-card').forEach((el, i) => {
        el.classList.add('anim-reveal', 'anim-delay-' + Math.min(i + 1, 5));
    });

    // Step cards — stagger
    document.querySelectorAll('.step-card').forEach((el, i) => {
        el.classList.add('anim-reveal', 'anim-delay-' + Math.min(i + 1, 5));
    });

    // Feed items — slide from left with stagger
    document.querySelectorAll('.feed-item').forEach((el, i) => {
        el.classList.add('anim-reveal-left', 'anim-delay-' + Math.min(i + 1, 5));
    });

    // Album / mode cards — scale in with stagger
    document.querySelectorAll('.album-card').forEach((el, i) => {
        el.classList.add('anim-reveal-scale', 'anim-delay-' + Math.min(i + 1, 5));
    });

    // Gallery items — fade up with stagger
    document.querySelectorAll('.gallery-item').forEach((el, i) => {
        el.classList.add('anim-reveal', 'anim-delay-' + Math.min((i % 4) + 1, 5));
    });

    // Social buttons используют чистые CSS-анимации — не трогаем

    // Launcher download block
    const dlBlock = document.querySelector('.launcher-download-block');
    if (dlBlock) dlBlock.classList.add('anim-reveal');

    // About и Contact используют чистые CSS-анимации — не трогаем

    // Observe all reveal elements
    // Двойной rAF нужен, чтобы браузер успел отрисовать opacity:0 ДО
    // того, как мы добавим anim-revealed — иначе анимация не проигрывает
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-revealed');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.querySelectorAll('.anim-reveal, .anim-reveal-left, .anim-reveal-right, .anim-reveal-scale').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    el.classList.add('anim-revealed');
                } else {
                    revealObs.observe(el);
                }
            });
        });
    });
}

// --- Particle Burst on Click ---
function initParticles() {
    const colors = ['var(--color-primary)', 'var(--color-accent)', '#60a5fa', '#a78bfa', '#f0abfc'];
    document.addEventListener('click', (e) => {
        const count = 10;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'anim-particle';
            const angle = (Math.PI * 2 * i / count) + (Math.random() - 0.5) * 0.6;
            const dist  = 38 + Math.random() * 55;
            const dur   = 0.32 + Math.random() * 0.32;
            p.style.setProperty('--tx', (Math.cos(angle) * dist) + 'px');
            p.style.setProperty('--ty', (Math.sin(angle) * dist - 15) + 'px');
            p.style.setProperty('--dur', dur + 's');
            p.style.left       = e.clientX + 'px';
            p.style.top        = e.clientY + 'px';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            const size = (2.5 + Math.random() * 3.5) + 'px';
            p.style.width  = size;
            p.style.height = size;
            document.body.appendChild(p);
            setTimeout(() => p.remove(), dur * 1000 + 60);
        }
    });
}

// --- Aurora Mouse Parallax ---
function initAuroraTracking() {
    const aurora = document.querySelector('.aurora-background');
    if (!aurora) return;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
        tx = (e.clientX / window.innerWidth  - 0.5) * 28;
        ty = (e.clientY / window.innerHeight - 0.5) * 28;
    });

    (function tick() {
        cx += (tx - cx) * 0.045;
        cy += (ty - cy) * 0.045;
        aurora.style.transform = `translate(${cx}px, ${cy}px)`;
        requestAnimationFrame(tick);
    })();
}

// --- Ambient Particles in Hero ---
function initAmbientParticles() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const colors = [
        'rgba(208,188,255,0.85)',
        'rgba(51,78,255,0.85)',
        'rgba(96,165,250,0.85)',
        'rgba(167,139,250,0.85)',
        'rgba(240,171,252,0.85)'
    ];

    function spawn() {
        const p = document.createElement('div');
        p.className = 'ambient-particle';
        const size  = 1.5 + Math.random() * 2.5;
        const dur   = 4.5 + Math.random() * 5;
        const drift = (Math.random() - 0.5) * 80;

        p.style.width      = size + 'px';
        p.style.height     = size + 'px';
        p.style.left       = (5 + Math.random() * 90) + '%';
        p.style.bottom     = (Math.random() * 20) + '%';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.boxShadow  = `0 0 ${size * 3}px ${p.style.background}`;
        p.style.setProperty('--drift', drift + 'px');
        p.style.setProperty('--dur', dur + 's');

        hero.appendChild(p);
        setTimeout(() => p.remove(), dur * 1000 + 100);
    }

    // Первые частицы сразу
    for (let i = 0; i < 8; i++) setTimeout(spawn, i * 200);
    // Дальше — постоянно
    setInterval(spawn, 450);
}

// --- L: Dot Grid Background ---
function initDotGrid() {
    const grid = document.createElement('div');
    grid.className = 'dot-grid-bg';
    document.body.insertBefore(grid, document.body.firstChild);
}

// --- F: Scroll-Shrink Hero ---
function initStickyHero() {
    const heroH1      = document.querySelector('#hero h1');
    const heroActions = document.querySelector('#hero .hero-actions');
    const heroIP      = document.querySelector('#hero .hero-server-ip');
    if (!heroH1) return;

    let ready = false;
    setTimeout(() => {
        // Drop the one-shot fadeInUp fill so JS can freely control transform
        heroH1.style.animation    = 'anim-gradientFlow 7s -0.2s linear infinite';
        heroH1.style.transformOrigin = 'center top';
        if (heroActions) heroActions.style.animation = 'none';
        ready = true;
    }, 1100);

    window.addEventListener('scroll', () => {
        if (!ready) return;
        const p = Math.min(window.scrollY / 280, 1);

        heroH1.style.transform = `scale(${1 - p * 0.38}) translateY(${-p * 36}px)`;

        if (heroActions) {
            heroActions.style.opacity   = Math.max(0, 1 - p * 1.8).toString();
            heroActions.style.transform = `translateY(${-p * 20}px)`;
        }
        if (heroIP) {
            heroIP.style.opacity = Math.max(0, 1 - p * 2).toString();
        }
    }, { passive: true });
}

// --- Text Scramble for Hero H1 ---
function initTextScramble() {
    const hero = document.querySelector('#hero h1');
    if (!hero) return;
    const original = hero.textContent.trim();
    const charset  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!?';
    let frame = 0;
    const totalFrames = original.length * 5;

    function tick() {
        hero.textContent = original.split('').map((char, idx) => {
            if (char === ' ' || char === '.') return char;
            if (idx < Math.floor(frame / 5)) return char;
            return charset[Math.floor(Math.random() * charset.length)];
        }).join('');
        frame++;
        if (frame <= totalFrames) {
            requestAnimationFrame(tick);
        } else {
            hero.textContent = original;
        }
    }

    // Delay until fadeIn finishes
    setTimeout(tick, 450);
}
