document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorCircle = document.getElementById('cursor-circle');
    const cursorDot = document.getElementById('cursor-dot');
    
    if (cursorCircle && cursorDot) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let circleX = mouseX;
        let circleY = mouseY;
        
        let targetScale = 1;
        let currentScale = 1;
        let targetRotate = 45; // Start as a diamond
        let currentRotate = 45;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // The dot is a diamond too
            cursorDot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px) rotate(45deg)`;
        });

        const updateCursor = () => {
            // Snappier follow
            circleX += (mouseX - circleX) * 0.3;
            circleY += (mouseY - circleY) * 0.3;
            
            // Smooth scale & rotate
            currentScale += (targetScale - currentScale) * 0.2;
            currentRotate += (targetRotate - currentRotate) * 0.15;
            
            cursorCircle.style.transform = `translate(${circleX - 12}px, ${circleY - 12}px) rotate(${currentRotate}deg) scale(${currentScale})`;
            requestAnimationFrame(updateCursor);
        };
        requestAnimationFrame(updateCursor);

        const interactiveElements = document.querySelectorAll('a, button, .premium-btn, input, textarea, select, [role="button"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorCircle.classList.add('cursor-hover');
                targetScale = 1.4;
                targetRotate = 135; // Spin 90deg on hover
            });
            el.addEventListener('mouseleave', () => {
                cursorCircle.classList.remove('cursor-hover');
                targetScale = 1;
                targetRotate = 45;
            });
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
    const parallaxItems = document.querySelectorAll('[data-lux-parallax]');
    if (parallaxItems.length > 0) {
        let pMouseX = 0;
        let pMouseY = 0;
        let isParallaxTicking = false;

        document.addEventListener('mousemove', (e) => {
            pMouseX = e.clientX / window.innerWidth - 0.5;
            pMouseY = e.clientY / window.innerHeight - 0.5;
            
            if (!isParallaxTicking) {
                requestAnimationFrame(() => {
                    parallaxItems.forEach(item => {
                        const speed = item.getAttribute('data-lux-parallax') || 20;
                        const x = pMouseX * speed;
                        const y = pMouseY * speed;
                        item.style.transform = `translate(${x}px, ${y}px)`;
                    });
                    isParallaxTicking = false;
                });
                isParallaxTicking = true;
            }
        });
    }
});
