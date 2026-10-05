// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect (hide/show based on scroll direction)
let prevScrollPos = window.scrollY;
let isVisible = true;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScrollPos = window.scrollY;

    // If we're at the top, always show
    if (currentScrollPos < 10) {
        isVisible = true;
    }
    // If scrolling down, hide
    else if (currentScrollPos > prevScrollPos) {
        isVisible = false;
    }
    // If scrolling up, show
    else {
        isVisible = true;
    }

    if (isVisible) {
        navbar.style.transform = 'translateY(0)';
    } else {
        navbar.style.transform = 'translateY(-100%)';
    }

    prevScrollPos = currentScrollPos;
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Here you would typically send the data to a server
        // For now, we'll just show the success message
        console.log('Form submitted:', { name, email, phone, message });
        
        // Show success message
        formSuccess.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);
    });
}


// Add scroll-triggered animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .activity-card, .section-item, .calendar-item, .shop-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});