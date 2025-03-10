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
const techGrid = document.querySelector('.tech-grid');
if (techGrid) {
    techStack.forEach((tech) => {
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

        techGrid.appendChild(techItem);
    });
}
// Globe Configuration
const globeRadius = 5; // Radius of the globe
const markerRadius = 0.1; // Radius of the markers
const locations = [
    { name: "Syracuse, NY", lat: 43.0481, lng: -76.1474, color: 0xff0000 }, // Red
    { name: "Mumbai, India", lat: 19.0760, lng: 72.8777, color: 0x00ff00 }, // Green
    { name: "New York, NY", lat: 40.7128, lng: -74.0060, color: 0x0000ff }, // Blue
];

// Set up the Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, 500);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create the globe
const globeGeometry = new THREE.SphereGeometry(globeRadius, 32, 32);
const globeMaterial = new THREE.MeshPhongMaterial({
    color: 0x1e90ff, // Blue color for the globe
    map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_atmos_2048.jpg'), // Earth texture
    bumpMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_bump_2048.jpg'), // Bump map for terrain
    bumpScale: 0.05,
    specularMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_specular_2048.jpg'), // Specular map for water
    specular: 0x222222,
});
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// Add markers for locations
locations.forEach(location => {
    const markerGeometry = new THREE.SphereGeometry(markerRadius, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: location.color });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);

    // Convert lat/lng to 3D coordinates
    const phi = (90 - location.lat) * (Math.PI / 180);
    const theta = (location.lng + 180) * (Math.PI / 180);
    marker.position.set(
        -globeRadius * Math.sin(phi) * Math.cos(theta),
        globeRadius * Math.cos(phi),
        globeRadius * Math.sin(phi) * Math.sin(theta)
    );

    scene.add(marker);
});

// Position the camera
camera.position.z = 15;

// Add rotation animation
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005; // Rotate the globe
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / 500;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 500);
});

// Add tooltips for markers
const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
tooltip.style.color = '#fff';
tooltip.style.padding = '5px 10px';
tooltip.style.borderRadius = '5px';
tooltip.style.display = 'none';
document.body.appendChild(tooltip);

// Raycaster for detecting hover
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / 500) * 2 + 1;

    // Raycast to find intersections
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && intersects[0].object.geometry.type === 'SphereGeometry') {
        const marker = intersects[0].object;
        const location = locations.find(loc => loc.color === marker.material.color.getHex());

        if (location) {
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.clientX + 10}px`;
            tooltip.style.top = `${event.clientY + 10}px`;
            tooltip.textContent = location.name;
        }
    } else {
        tooltip.style.display = 'none';
    }
});