document.addEventListener('DOMContentLoaded', function () {
    // Dark Mode Toggle
    const darkModeToggleBtn = document.getElementById('dark-mode-toggle-btn');
    const body = document.body;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        darkModeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.setAttribute('data-theme', 'light');
        darkModeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Toggle Dark Mode
    darkModeToggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            darkModeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            darkModeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });

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

    // Scroll-triggered animations for sections
    const sections = document.querySelectorAll('section');
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 }); // Adjust threshold for when the animation triggers

    sections.forEach(section => {
        observer.observe(section);
    });

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add a scroll-to-top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopButton);

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });
});
particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Particles.js loaded!');
});

// Tech Stack Data with Icons
const techStack = [
    { name: "Python", icon: "fab fa-python" },
    { name: "SQL", icon: "fas fa-database" },
    { name: "AWS", icon: "fab fa-aws" },
    { name: "Apache Spark", icon: "fas fa-bolt" },
    { name: "FastAPI", icon: "fas fa-server" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "TensorFlow", icon: "fab fa-tensorflow" },
    { name: "Kafka", icon: "fas fa-stream" },
    { name: "PostgreSQL", icon: "fas fa-database" }
];

// Generate Tech Stack Items
const techCarouselInner = document.querySelector('.tech-carousel-inner');
if (techCarouselInner) {
    const totalItems = techStack.length;
    const angleIncrement = 360 / totalItems; // Calculate angle between items

    techStack.forEach((tech, index) => {
        const techItem = document.createElement('div');
        techItem.className = 'tech-item';

        // Add icon
        const icon = document.createElement('i');
        icon.className = tech.icon;
        techItem.appendChild(icon);

        // Add technology name
        const name = document.createElement('span');
        name.textContent = tech.name;
        techItem.appendChild(name);

        // Position each item in a circle
        const angle = angleIncrement * index;
        techItem.style.transform = `rotateY(${angle}deg) translateZ(200px)`;

        techCarouselInner.appendChild(techItem);
    });
}