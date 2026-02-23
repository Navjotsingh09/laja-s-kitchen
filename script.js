// ==========================================
// Mobile Navigation
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==========================================
// Smooth Scroll
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==========================================
// Horizontal Carousel Scroll
// ==========================================
const carouselContainers = document.querySelectorAll('.carousel-container');

carouselContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    // Set cursor style
    container.style.cursor = 'grab';
});

// ==========================================
// Scroll Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// ==========================================
// Book a Table Button
// ==========================================
const bookBtn = document.querySelector('.book-btn');
if (bookBtn) {
    bookBtn.addEventListener('click', () => {
        alert('Booking feature coming soon! Please call us to reserve a table at +44 123 456 7890');
    });
}

// ==========================================
// Navbar Scroll Effect
// ==========================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ==========================================
// Menu Link Click Handlers
// ==========================================
const menuLinks = document.querySelectorAll('.menu-link');
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            alert('Menu coming soon!');
        }
    });
});

// ==========================================
// Loading Animation
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// Auto-scroll Carousel on Load (Desktop)
// ==========================================
if (window.innerWidth > 768) {
    carouselContainers.forEach((container, index) => {
        setTimeout(() => {
            const scrollAmount = 100;
            let currentScroll = 0;
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            const autoScroll = setInterval(() => {
                if (currentScroll >= maxScroll) {
                    clearInterval(autoScroll);
                } else {
                    container.scrollLeft += 1;
                    currentScroll = container.scrollLeft;
                }
            }, 30);

            // Clear on user interaction
            container.addEventListener('mousedown', () => clearInterval(autoScroll));
            container.addEventListener('touchstart', () => clearInterval(autoScroll));
        }, 1000 + (index * 500));
    });
}

console.log('🍛 Laja Kitchen - Website loaded successfully!');
