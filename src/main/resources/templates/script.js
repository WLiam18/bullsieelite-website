// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, project cards, team members
document.querySelectorAll('.service-card, .project-card, .team-member, .tech-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    fadeObserver.observe(el);
});

// FIXED: Counter animation for stats
const animateCounter = (counter, target, duration = 2000) => {
    const isDecimal = target % 1 !== 0;
    const fps = 60;
    const totalFrames = (duration / 1000) * fps;
    const increment = target / totalFrames;
    let current = 0;
    let frame = 0;
    
    const updateCounter = () => {
        frame++;
        current += increment;
        
        if (frame < totalFrames) {
            if (isDecimal) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = isDecimal ? target.toFixed(1) : target;
        }
    };
    
    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseFloat(counter.getAttribute('data-target'));
            
            // Animate counter
            animateCounter(counter, target);
            
            // Stop observing once animated
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Initialize counter observers
document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Chart animation observer
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chart = entry.target;
            chart.classList.add('animate');
            chartObserver.unobserve(chart);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.performance-chart').forEach(chart => {
    chartObserver.observe(chart);
});

// Grid dot animations
const gridDots = document.querySelectorAll('.grid-dot');
if (gridDots.length > 0) {
    let dotInterval = setInterval(() => {
        gridDots.forEach((dot, index) => {
            setTimeout(() => {
                const randomOpacity = Math.random() * 0.5 + 0.3;
                dot.style.transition = 'opacity 0.5s ease';
                dot.style.opacity = randomOpacity;
            }, index * 150);
        });
    }, 3000);
}

// Service card interactive effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
    });
});

// Tech items stagger animation
const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.tech-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
            techObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.tech-items').forEach(container => {
    techObserver.observe(container);
});
