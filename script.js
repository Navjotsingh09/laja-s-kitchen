/* ================================================
   Laja Kitchen — script.js
   ================================================ */

// ---------- Mobile nav ----------
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ---------- Set marquee durations from data-speed ----------
document.querySelectorAll('.food__marquee').forEach(m => {
    const speed = m.dataset.speed || 30;
    m.style.setProperty('--dur', speed + 's');
});

// ---------- News scroll navigation ----------
const newsList = document.getElementById('newsList');
const newsUp = document.getElementById('newsUp');
const newsDown = document.getElementById('newsDown');

if (newsList && newsUp && newsDown) {
    newsUp.addEventListener('click', () => {
        newsList.scrollBy({ top: -120, behavior: 'smooth' });
    });
    newsDown.addEventListener('click', () => {
        newsList.scrollBy({ top: 120, behavior: 'smooth' });
    });
}

// ---------- Shop next button (cycle items) ----------
const shopList = document.getElementById('shopList');
const shopNext = document.getElementById('shopNext');
if (shopList && shopNext) {
    shopNext.addEventListener('click', () => {
        const first = shopList.querySelector('.shop__item');
        if (first) {
            first.style.transition = 'opacity .3s, transform .3s';
            first.style.opacity = '0';
            first.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                first.style.removeProperty('transition');
                first.style.removeProperty('opacity');
                first.style.removeProperty('transform');
                shopList.appendChild(first);
            }, 300);
        }
    });
}

// ---------- Scroll-triggered fade-in ----------
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.intro__inner, .split__inner, .shop__inner, .events__inner, .news__inner, .careers__inner'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    io.observe(el);
});

// Inject visible state
const style = document.createElement('style');
style.textContent = '.visible{opacity:1!important;transform:translateY(0)!important}';
document.head.appendChild(style);

// ---------- Nav shadow on scroll ----------
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 50
        ? '0 2px 20px rgba(0,0,0,.5)'
        : 'none';
}, { passive: true });
