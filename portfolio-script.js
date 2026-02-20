// ========================================
// Portfolio JavaScript - Language Toggle & Interactions
// ========================================

// Language Management
let currentLang = localStorage.getItem('portfolioLang') || 'en';

// Translation data
const translations = {
    en: {
        // Elements that need translation are handled via data attributes in HTML
    },
    fr: {
        // Elements that need translation are handled via data attributes in HTML
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
});

// Initialize Language
function initLanguage() {
    const langToggle = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');
    
    // Set initial language
    setLanguage(currentLang);
    
    // Language toggle click
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLang = currentLang === 'en' ? 'fr' : 'en';
            setLanguage(currentLang);
            localStorage.setItem('portfolioLang', currentLang);
        });
    }
}

// Set Language
function setLanguage(lang) {
    const langLabel = document.getElementById('langLabel');
    if (langLabel) {
        langLabel.textContent = lang.toUpperCase();
    }
    
    // Update all elements with data-en and data-fr attributes
    const elements = document.querySelectorAll('[data-en][data-fr]');
    elements.forEach(element => {
        const text = element.getAttribute('data-' + lang);
        if (text) {
            element.textContent = text;
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^=\"#\"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        // Header shadow on scroll
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        // Fade-in animations for elements
        animateOnScroll();
    });
    
    // Initial check
    animateOnScroll();
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.info-card, .timeline-item, .skill-category, .project-card, .education-card, .contact-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Add initial styles for animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.info-card, .timeline-item, .skill-category, .project-card, .education-card, .contact-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + currentSection) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Print friendly
window.addEventListener('beforeprint', function() {
    document.querySelectorAll('.nav-menu, .mobile-toggle, .lang-toggle').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    document.querySelectorAll('.nav-menu, .mobile-toggle, .lang-toggle').forEach(el => {
        el.style.display = '';
    });
});
