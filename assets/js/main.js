// ============================================
// LOADER AMÉLIORÉ
// ============================================
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
                // Déclencher les animations initiales
                triggerInitialAnimations();
            }, 500);
        }, 800);
    }
});

function triggerInitialAnimations() {
    // Animation du titre hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.querySelector('.word')) {
        const words = heroTitle.textContent.trim().split(/\s+/);
        heroTitle.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    }
    
    // Ajouter des interactions au schéma du processus dans le hero
    const schemaSteps = document.querySelectorAll('.schema-step');
    schemaSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            // Animer tous les steps précédents
            for (let i = 0; i <= index; i++) {
                schemaSteps[i].style.background = 'rgba(212, 175, 55, 0.15)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            schemaSteps.forEach(s => {
                s.style.background = 'rgba(255, 255, 255, 0.05)';
            });
        });
    });
}

// ============================================
// NAVIGATION AMÉLIORÉE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // Menu mobile avec animation
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            // Animation des barres du menu burger
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
    
    // Fermer le menu au clic sur un lien
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer le menu au clic en dehors
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navbar scroll effect avec hide/show
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
});

// ============================================
// INTERSECTION OBSERVER AVANCÉ
// ============================================
const createObserver = (options = {}) => {
    const defaultOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animations spécifiques
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('process-timeline')) {
                    entry.target.classList.add('animated');
                    animateProcessSteps(entry.target);
                }
                
                if (entry.target.classList.contains('progress-line')) {
                    entry.target.classList.add('animated');
                }
                
                if (entry.target.classList.contains('animated-icon')) {
                    animateSvgIcon(entry.target);
                }
            }
        });
    }, { ...defaultOptions, ...options });
};

const observer = createObserver();
const slowObserver = createObserver({ threshold: 0.3 });

// ============================================
// ANIMATION DU PROCESSUS DE REPRISE
// ============================================
function animateProcessSteps(timeline) {
    const steps = timeline.querySelectorAll('.process-step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('visible');
            
            // Animation des icônes SVG
            const icon = step.querySelector('.animated-icon');
            if (icon) {
                animateSvgIcon(icon);
            }
        }, index * 200);
    });
}

function animateSvgIcon(icon) {
    icon.classList.add('visible');
    const paths = icon.querySelectorAll('path, circle, rect, line');
    paths.forEach((path, index) => {
        const length = path.getTotalLength ? path.getTotalLength() : 200;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.animation = `drawSvg 1s ease-out ${index * 0.2}s forwards`;
    });
}

// ============================================
// OBSERVER LES ÉLÉMENTS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Éléments avec fade-in-up
    const fadeElements = document.querySelectorAll('.approach-card, .stat-item, .team-member, .why-point, .highlight-box, .stat-card');
    fadeElements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        observer.observe(el);
    });
    
    // Process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(el => {
        observer.observe(el);
    });
    
    // Process timeline
    const processTimelines = document.querySelectorAll('.process-timeline');
    processTimelines.forEach(el => {
        observer.observe(el);
    });
    
    // Progress lines
    const progressLines = document.querySelectorAll('.progress-line');
    progressLines.forEach(el => {
        observer.observe(el);
    });
    
    // Value items
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(el);
    });
    
    // Section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(el => {
        el.classList.add('scale-in');
        observer.observe(el);
    });
    
    // CTA content
    const ctaContents = document.querySelectorAll('.cta-content');
    ctaContents.forEach(el => {
        el.classList.add('scale-in');
        observer.observe(el);
    });
    
    // Animated icons
    const animatedIcons = document.querySelectorAll('.animated-icon');
    animatedIcons.forEach(el => {
        slowObserver.observe(el);
    });
});

// ============================================
// ANIMATION DES CHIFFRES (COUNTER)
// ============================================
function animateCounter(element) {
    const statNumber = element.querySelector('.stat-number, .stat-card-number');
    if (!statNumber || element.classList.contains('counted')) return;
    
    element.classList.add('counted');
    const originalText = statNumber.textContent;
    const target = parseInt(originalText.replace(/[^0-9]/g, ''));
    
    if (isNaN(target)) return;
    
    const duration = 2000;
    const startTime = performance.now();
    const suffix = originalText.replace(/[0-9]/g, '');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);
        
        statNumber.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            statNumber.textContent = originalText;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ============================================
// EFFET PARALLAX SUR HERO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (hero && heroContent) {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    
                    if (scrolled < hero.offsetHeight && window.innerWidth > 768) {
                        const rate = scrolled * 0.4;
                        const opacityRate = 1 - (scrolled / hero.offsetHeight) * 0.6;
                        
                        heroContent.style.transform = `translateY(${rate}px)`;
                        heroContent.style.opacity = Math.max(opacityRate, 0.4);
                        
                        if (heroOverlay) {
                            heroOverlay.style.transform = `translateY(${scrolled * 0.2}px)`;
                        }
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
});

// ============================================
// MICRO-INTERACTIONS SUR LES BOUTONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Effet ripple au clic
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Effet de suivi du curseur (tilt effect)
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(500px) rotateX(${deltaY * -3}deg) rotateY(${deltaX * 3}deg) translateY(-3px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Ajouter le style ripple dynamiquement
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes drawSvg {
        to {
            stroke-dashoffset: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// SMOOTH SCROLL AMÉLIORÉ
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// FORMULAIRE DE CONTACT AMÉLIORÉ
// ============================================
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    // Animation des labels flottants
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showMessage('Veuillez corriger les erreurs dans le formulaire.', 'error');
            return;
        }
        
        // Animation de soumission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Envoi en cours...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simuler l'envoi
        setTimeout(() => {
            showMessage('Merci pour votre message. Nous vous contacterons dans les plus brefs délais.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '';
            inputs.forEach(input => input.parentElement.classList.remove('focused'));
        }, 1500);
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    field.classList.remove('error');
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Ce champ est obligatoire.';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Veuillez entrer une adresse email valide.';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        field.parentElement.appendChild(errorDiv);
        
        // Animation de shake
        field.style.animation = 'shake 0.5s ease-out';
        setTimeout(() => field.style.animation = '', 500);
    }
    
    return isValid;
}

function showMessage(message, type) {
    // Supprimer les messages existants
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.insertBefore(messageDiv, formContainer.firstChild);
        
        // Auto-suppression
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

// Styles pour le formulaire
const formStyle = document.createElement('style');
formStyle.textContent = `
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #e74c3c;
        animation: shake 0.5s ease-out;
    }
    .error-message {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: slideInDown 0.3s ease-out;
    }
    .form-message {
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 8px;
        animation: slideInDown 0.3s ease-out;
        transition: all 0.3s ease-out;
    }
    .form-message.success {
        background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    .form-message.error {
        background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
        margin-right: 8px;
        vertical-align: middle;
    }
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(formStyle);

// ============================================
// EFFET DE HOVER SUR LES CARTES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.approach-card, .team-member, .stat-card, .process-icon');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// ============================================
// GESTION DE LA PERFORMANCE
// ============================================
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimiser les événements
const optimizedResize = debounce(() => {
    // Recalculer si nécessaire
}, 250);

window.addEventListener('resize', optimizedResize, { passive: true });

// ============================================
// DÉTECTION DU MODE PRÉFÉRENCE MOUVEMENT RÉDUIT
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-slow', 'none');
}

// ============================================
// LAZY LOADING DES IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    }, { rootMargin: '50px' });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CURSEUR PERSONNALISÉ (OPTIONNEL)
// ============================================
// Décommentez pour activer le curseur personnalisé
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

function animateCursor() {
    dotX += (cursorX - dotX) * 0.1;
    dotY += (cursorY - dotY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverElements = document.querySelectorAll('a, button, .approach-card, .team-member, .process-icon');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorDot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorDot.classList.remove('hover');
    });
});
*/
