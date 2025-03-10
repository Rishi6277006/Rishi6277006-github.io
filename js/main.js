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
    { name: "Python", proficiency: 120, icon: "fab fa-python" },
    { name: "SQL", proficiency: 110, icon: "fas fa-database" },
    { name: "AWS", proficiency: 100, icon: "fab fa-aws" },
    { name: "Tableau", proficiency: 90, icon: "fas fa-chart-bar" },
    { name: "JavaScript", proficiency: 80, icon: "fab fa-js" },
    { name: "TensorFlow", proficiency: 110, icon: "fab fa-tensorflow" },
    { name: "Git", proficiency: 120, icon: "fab fa-git-alt" },
    { name: "Azure AI", proficiency: 90, icon: "fas fa-cloud" },
    { name: "PyTorch", proficiency: 100, icon: "fab fa-python" }, // Use Python icon as placeholder
    { name: "Apache Spark", proficiency: 80, icon: "fas fa-bolt" }, // Use bolt icon as placeholder
    { name: "FastAPI", proficiency: 90, icon: "fas fa-server" }, // Use server icon as placeholder
    { name: "CrewAI", proficiency: 70, icon: "fas fa-robot" }, // Use robot icon as placeholder
    { name: "RAG", proficiency: 80, icon: "fas fa-brain" }, // Use brain icon as placeholder
    { name: "Kafka", proficiency: 70, icon: "fas fa-stream" }, // Use stream icon as placeholder
    { name: "PostgreSQL", proficiency: 100, icon: "fas fa-database" } // Use database icon as placeholder
];

// Generate Tech Stack Bubbles with Icons
const techStackContainer = document.querySelector('.tech-stack-visualization');
if (techStackContainer) {
    techStack.forEach(tech => {
        const bubble = document.createElement('div');
        bubble.className = 'tech-bubble';
        bubble.style.width = `${tech.proficiency}px`;
        bubble.style.height = `${tech.proficiency}px`;

        // Add icon
        const icon = document.createElement('i');
        icon.className = tech.icon;
        bubble.appendChild(icon);

        // Add technology name
        const name = document.createElement('span');
        name.textContent = tech.name;
        bubble.appendChild(name);

        techStackContainer.appendChild(bubble);
    });
}