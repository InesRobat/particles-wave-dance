import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug GUI
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load("/textures/particles/1.png");
const particlesTexture2 = textureLoader.load("/textures/particles/2.png");
const particlesTexture3 = textureLoader.load("/textures/particles/3.png");
const particlesTexture4 = textureLoader.load("/textures/particles/4.png");
const particlesTexture5 = textureLoader.load("/textures/particles/5.png");
const particlesTexture6 = textureLoader.load("/textures/particles/6.png");
const particlesTexture7 = textureLoader.load("/textures/particles/7.png");
const particlesTexture8 = textureLoader.load("/textures/particles/8.png");
const particlesTexture9 = textureLoader.load("/textures/particles/9.png");
const particlesTexture10 = textureLoader.load("/textures/particles/10.png");
const particlesTexture11 = textureLoader.load("/textures/particles/11.png");
const particlesTexture12 = textureLoader.load("/textures/particles/12.png");
const particlesTexture13 = textureLoader.load("/textures/particles/13.png");

/**
 * Particles
 */
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  color: new THREE.Color("#ff88cc"),
  alphaMap: particlesTexture,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
});

const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const onResize = () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", onResize);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = particlesGeometry.attributes.position.array[i3];
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x
    );
  }

  particlesGeometry.attributes.position.needsUpdate = true;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 * Debug GUI
 */

const params = {
  backgroundColor: "#000000",
};

gui
  .add(particlesMaterial, "size")
  .min(0.01)
  .max(1)
  .step(0.01)
  .name("Particle Size");
gui.addColor(particlesMaterial, "color").name("Particle Color");

gui
  .addColor(params, "backgroundColor")
  .name("Background Color")
  .onChange((value) => {
    scene.background = new THREE.Color(value);
  });

gui
  .add(particlesMaterial, "alphaMap", {
    None: null,
    "Particle 1": particlesTexture,
    "Particle 2": particlesTexture2,
    "Particle 3": particlesTexture3,
    "Particle 4": particlesTexture4,
    "Particle 5": particlesTexture5,
    "Particle 6": particlesTexture6,
    "Particle 7": particlesTexture7,
    "Particle 8": particlesTexture8,
    "Particle 9": particlesTexture9,
    "Particle 10": particlesTexture10,
    "Particle 11": particlesTexture11,
    "Particle 12": particlesTexture12,
    "Particle 13": particlesTexture13,
  })
  .name("Particle Texture")
  .onChange((newParticleTexture) => {
    particlesMaterial.alphaMap = newParticleTexture;
    particlesMaterial.needsUpdate = true;
  });
