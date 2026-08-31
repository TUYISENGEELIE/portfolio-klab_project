// Basic interactions: mobile nav toggle, smooth scroll, form validation/clear
document.addEventListener('DOMContentLoaded', function () {
    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        if (mainNav.hasAttribute('open')) {
            mainNav.removeAttribute('open');
        } else {
            mainNav.setAttribute('open', '');
        }
    });

    // Smooth scroll for same-page links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // close mobile menu if open
                    if (mainNav.hasAttribute('open')) {
                        mainNav.removeAttribute('open');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // Simple form validation and clear
    const form = document.getElementById('contactForm');
    const clearBtn = document.getElementById('clearForm');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            form.reset();
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            // Basic client validation
            const required = form.querySelectorAll('[required]');
            let ok = true;
            required.forEach(field => {
                if (!field.value.trim()) {
                    ok = false;
                    field.style.outline = '2px solid #ffb6d0';
                } else {
                    field.style.outline = 'none';
                }
            });

            if (!ok) {
                e.preventDefault();
                alert('Please complete the required fields before sending.');
            } else {
                emailjs.send('service_17o75sl', 'template_m5ub7ph'), {
                    from_name: this.name.value,
                    from_email: this.email.value,
                    phone: this.phone.value,
                    subject: this.subject.value,
                    message: this.message.value
                }
                // If user has a mail client, the form action will open it (mailto). Otherwise, you can integrate a backend endpoint.
                // No further JS here — allow default mailto behaviour or replace with fetch to your API.
            }
        });
    }
});