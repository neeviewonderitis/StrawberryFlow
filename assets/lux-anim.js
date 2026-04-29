document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorCircle = document.getElementById('cursor-circle');
    const cursorDot = document.getElementById('cursor-dot');
    
    if (cursorCircle && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.transform = `translate(${posX - 3}px, ${posY - 3}px)`;
            setTimeout(() => {
                cursorCircle.style.transform = `translate(${posX - 20}px, ${posY - 20}px)`;
            }, 50);
        });

        const interactiveElements = document.querySelectorAll('a, button, .premium-btn, input, textarea, select');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorCircle.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursorCircle.classList.remove('cursor-hover'));
        });
    }

    // Intersection Observer for scroll reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Apply reveal to elements
    const revealElements = document.querySelectorAll('[data-lux-reveal]');
    revealElements.forEach(el => observer.observe(el));

    // Smooth reveal for page transition
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-out';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    // Handle Parallax on Mouse Move for specific elements
    document.addEventListener('mousemove', (e) => {
        const parallaxItems = document.querySelectorAll('[data-lux-parallax]');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        parallaxItems.forEach(item => {
            const speed = item.getAttribute('data-lux-parallax') || 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            item.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});
