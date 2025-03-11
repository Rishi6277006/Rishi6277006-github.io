// Set up the Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, 500);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create a basic sphere (globe)
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x1e90ff }); // Blue color
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

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