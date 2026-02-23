/* ================================================
   Laja Kitchen — script.js
   ================================================ */

// ---------- Mobile nav toggle ----------
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---------- Drag-to-scroll on food rows ----------
document.querySelectorAll('.food__track').forEach(track => {
    let isDown = false, startX, scrollL;

    track.addEventListener('mousedown', e => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollL = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
    track.addEventListener('mouseup',    () => { isDown = false; track.style.cursor = 'grab'; });
    track.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        track.scrollLeft = scrollL - ((e.pageX - track.offsetLeft) - startX) * 1.5;
    });

    track.style.cursor = 'grab';
});

// ---------- Auto-scroll food rows (alternating directions) ----------
document.querySelectorAll('.food__track').forEach(track => {
    const dir = track.dataset.direction;
    const speed = 0.4; // px per frame

    // Start rows that scroll right at the end
    if (dir === 'right') {
        track.scrollLeft = track.scrollWidth - track.clientWidth;
    }

    let paused = false;
    track.addEventListener('mouseenter', () => paused = true);
    track.addEventListener('mouseleave', () => paused = false);
    track.addEventListener('touchstart', () => paused = true, { passive: true });
    track.addEventListener('touchend',   () => paused = false);

    function step() {
        if (!paused) {
            if (dir === 'left') {
                track.scrollLeft += speed;
                if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
                    track.scrollLeft = 0;
                }
            } else {
                track.scrollLeft -= speed;
                if (track.scrollLeft <= 0) {
                    track.scrollLeft = track.scrollWidth - track.clientWidth;
                }
            }
        }
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
});

// ---------- Scroll-triggered fade-in ----------
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(
    '.intro__inner, .drinks__inner, .shop__inner, .events__inner, .news__inner, .about__inner, .careers__inner'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    io.observe(el);
});

// Inject visible class
const style = document.createElement('style');
style.textContent = `.visible{opacity:1!important;transform:translateY(0)!important}`;
document.head.appendChild(style);

// ---------- Nav shadow on scroll ----------
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 60
        ? '0 2px 24px rgba(0,0,0,.5)'
        : 'none';
}, { passive: true });
