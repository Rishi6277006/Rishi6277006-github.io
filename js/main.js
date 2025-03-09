document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation item based on current page
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const navLink = item.querySelector('a');
        const navHref = navLink.getAttribute('href');
        
        if (currentLocation.includes(navHref)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Scroll-triggered animations
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});