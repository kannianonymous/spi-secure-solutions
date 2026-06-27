// Initialize AOS
        AOS.init({
            duration: 500,
            easing: 'ease-out',
            once: true,
            offset: 60
        });

        // Navbar Scroll Effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile Navigation Toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');

        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Counter Animation
        const counters = document.querySelectorAll('.counter');
        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        // Intersection Observer for counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // Back to Top Button
        const backToTop = document.querySelector('.back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth Scroll for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Lightweight premium 3D card tilt.
        const tiltCards = document.querySelectorAll('.service-card, .why-card, .industry-card, .product-card, .testimonial-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (event) => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const rotateY = ((x / rect.width) - 0.5) * 8;
                const rotateX = ((0.5 - (y / rect.height)) * 8);
                card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Compact testimonial auto slider.
        const testimonialCards = document.querySelectorAll('.testimonial-slider .testimonial-card');
        if (testimonialCards.length > 1) {
            let activeTestimonial = 0;
            setInterval(() => {
                testimonialCards[activeTestimonial].classList.remove('active');
                activeTestimonial = (activeTestimonial + 1) % testimonialCards.length;
                testimonialCards[activeTestimonial].classList.add('active');
            }, 3500);
        }

        // Send enquiry details directly to WhatsApp.
        const contactForm = document.querySelector('.contact-form form');
        const whatsappNumber = '919603998358';
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const formData = new FormData(this);
                const serviceSelect = this.querySelector('#service');
                const serviceText = serviceSelect && serviceSelect.selectedOptions.length
                    ? serviceSelect.selectedOptions[0].text
                    : 'Not selected';
                const enquiry = {
                    name: (formData.get('name') || '').trim(),
                    phone: (formData.get('phone') || '').trim(),
                    email: (formData.get('email') || '').trim(),
                    location: (formData.get('location') || '').trim(),
                    service: serviceText,
                    message: (formData.get('message') || '').trim()
                };

                const whatsappMessage = [
                    'New CCTV Enquiry - SPI Secure Solutions',
                    '',
                    `Name: ${enquiry.name}`,
                    `Phone: ${enquiry.phone}`,
                    enquiry.email ? `Email: ${enquiry.email}` : null,
                    `Location: ${enquiry.location}`,
                    `Service Required: ${enquiry.service}`,
                    enquiry.message ? `Message: ${enquiry.message}` : null
                ].filter(Boolean).join('\n');

                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank', 'noopener');
                this.reset();
            });
        }

