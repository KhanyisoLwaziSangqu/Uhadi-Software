// ===================================
// MOBILE MENU TOGGLE
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===================================
// ROTATING TAGLINES
// ===================================
const taglines = [
    { text: 'Your AI Meeting Assistant', language: 'English' },
    { text: 'Umsizi Wakho We-AI Wemihlangano', language: 'isiZulu' },
    { text: 'Mothušiša wa Gago wa AI wa Dikopano', language: 'Sepedi' },
    { text: 'Jou AI Vergadering Assistent', language: 'Afrikaans' },
    { text: 'Msaidizi wako wa AI wa Mikutano', language: 'Swahili' },
];

let currentTaglineIndex = 0;
const rotatingTextElement = document.getElementById('rotatingText');

function rotateTagline() {
    if (rotatingTextElement) {
        currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
        const currentTagline = taglines[currentTaglineIndex];

        // Fade out effect
        rotatingTextElement.style.opacity = '0';

        setTimeout(() => {
            rotatingTextElement.textContent = currentTagline.text;
            rotatingTextElement.style.opacity = '0.95';
        }, 300);
    }
}

// Rotate tagline every 3 seconds
setInterval(rotateTagline, 3000);

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVBAR SHADOW ON SCROLL
// ===================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 20) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop;
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards, pricing cards, and step cards
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .step-card, .language-category');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// PRICING CARD HIGHLIGHT
// ===================================
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        pricingCards.forEach(c => {
            if (c !== card) {
                c.style.opacity = '0.7';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        pricingCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ===================================
// TRACK BUTTON CLICKS (ANALYTICS READY)
// ===================================
function trackEvent(category, action, label) {
    // This is a placeholder for analytics integration
    // Replace with Google Analytics, Mixpanel, or your preferred analytics tool
    console.log(`Event: ${category} - ${action} - ${label}`);

    // Example for Google Analytics (uncomment when GA is set up):
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-large').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('Button Click', 'CTA', buttonText);
    });
});

// Track pricing plan clicks
document.querySelectorAll('.btn-pricing').forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('h3').textContent;
        trackEvent('Pricing', 'Plan Selected', planName);
    });
});

// Track download button clicks
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function() {
        const platform = this.querySelector('.download-platform').textContent;
        trackEvent('Download', 'Store Click', platform);
    });
});

// ===================================
// FEATURE CARD TOOLTIP (Optional Enhancement)
// ===================================
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('click', function() {
        // Optional: Add expandable content or modal for more feature details
        this.classList.toggle('expanded');
    });
});

// ===================================
// LAZY LOADING FOR IMAGES (If Added Later)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// PERFORMANCE: DEBOUNCE FUNCTION
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll event
const debouncedScroll = debounce(function() {
    // Add any scroll-based functionality here if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// EASTER EGG: KONAMI CODE
// ===================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Easter egg activated!
        document.body.style.transform = 'rotate(0.5deg)';
        setTimeout(() => {
            document.body.style.transform = 'rotate(-0.5deg)';
        }, 100);
        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
        }, 200);

        alert('🎉 You found the secret! CoworkAI appreciates curious minds! 🚀');
        konamiCode = [];
    }
});

// ===================================
// INITIALIZE ALL FUNCTIONS
// ===================================
console.log('🚀 CoworkAI Landing Page - Loaded Successfully');
console.log('📱 Supported Languages: 11+ African Languages');
console.log('🌍 Built by Uhadi Technology');
