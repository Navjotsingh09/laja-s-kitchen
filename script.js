/* ================================================
   Laja Kitchen — script.js
   ================================================ */

// ---------- Mobile nav ----------
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close nav on link click
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

// ---------- Scroll-triggered fade-in ----------
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(
    '.intro, .drinks__inner, .about__inner, .careers__inner, .contact__inner'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity .8s ease, transform .8s ease';
    io.observe(el);
});

// Add the "visible" class style
const style = document.createElement('style');
style.textContent = `.visible{opacity:1!important;transform:translateY(0)!important}`;
document.head.appendChild(style);

// ---------- Navbar shadow on scroll ----------
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 50
        ? '0 2px 20px rgba(0,0,0,.4)'
        : 'none';
});
