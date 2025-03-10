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