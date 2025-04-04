import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

// Configurar escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear habitaciones
const roomGeometry = new THREE.BoxGeometry(5, 3, 5);
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff5733, side: THREE.BackSide }), // Cuarto 1
    new THREE.MeshBasicMaterial({ color: 0x33ff57, side: THREE.BackSide }), // Cuarto 2
    new THREE.MeshBasicMaterial({ color: 0x3357ff, side: THREE.BackSide })  // Cuarto 3
];

const rooms = [];
for (let i = 0; i < materials.length; i++) {
    const room = new THREE.Mesh(roomGeometry, materials[i]);
    room.position.set(0, 1.5, -i * 6);
    scene.add(room);
    rooms.push(room);
}

// Movimiento con scroll
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY / window.innerHeight;
    camera.position.z = 5 - scrollY * 6;
});

// Animación
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Ajustar tamaño de pantalla
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
