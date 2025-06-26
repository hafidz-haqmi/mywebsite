document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle.querySelector('i');
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun-fill');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-sun-fill');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-fill');
        }
    });

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            // Validate all fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const consent = document.getElementById('consent');

            // Reset validation
            contactForm.classList.remove('was-validated');
            [name, email, subject, message, consent].forEach(field => {
                field.classList.remove('is-invalid', 'is-valid');
            });

            let isValid = true;

            // Name validation
            if (name.value.trim() === '') {
                name.classList.add('is-invalid');
                isValid = false;
            } else {
                name.classList.add('is-valid');
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.add('is-valid');
            }

            // Subject validation
            if (subject.value === '' || subject.value === null) {
                subject.classList.add('is-invalid');
                isValid = false;
            } else {
                subject.classList.add('is-valid');
            }

            // Message validation
            if (message.value.trim() === '') {
                message.classList.add('is-invalid');
                isValid = false;
            } else {
                message.classList.add('is-valid');
            }

            // Consent validation
            if (!consent.checked) {
                consent.classList.add('is-invalid');
                isValid = false;
            } else {
                consent.classList.add('is-valid');
            }

            if (isValid) {
                contactForm.classList.add('was-validated');
                contactForm.reset();
                formSuccess.classList.remove('d-none');
                formSuccess.style.animation = 'fadeIn 0.5s ease-out';
                
                setTimeout(() => {
                    formSuccess.classList.add('d-none');
                }, 5000);
                
                formSuccess.scrollIntoView({ behavior: 'smooth' });
            } else {
                contactForm.classList.add('was-validated');
            }
        });

        // Real-time email validation
        const emailField = document.getElementById('email');
        emailField.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
            }
        });
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Section animations
    function animateSections() {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (sectionBottom >= windowTop && sectionTop <= windowBottom) {
                section.classList.add('show');
            if (section.id === 'references') {
                const referenceItems = section.querySelectorAll('.reference-item');
                referenceItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, index * 150);
                });
            }
        }
    });
}

    // Initialize animations
    window.addEventListener('load', animateSections);
    window.addEventListener('scroll', animateSections);

    // Button animations
    const downloadBtn = document.querySelector('.btn-custom');
    if (downloadBtn) {
        downloadBtn.addEventListener('mouseenter', () => {
            downloadBtn.style.animation = 'pulse 1s infinite';
        });
        downloadBtn.addEventListener('mouseleave', () => {
            downloadBtn.style.animation = '';
        });
    }

    // Dark mode toggle animation
    darkModeToggle.addEventListener('mouseenter', () => {
        darkModeToggle.style.transform = 'scale(1.1)';
    });
    darkModeToggle.addEventListener('mouseleave', () => {
        darkModeToggle.style.transform = '';
    });
});