import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DoubleSide } from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
//torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

//light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight);
//orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
//background
const textureLoader = new THREE.TextureLoader();
const bg = new THREE.Mesh(
  new THREE.SphereGeometry(900, 100, 100),
  new THREE.MeshStandardMaterial({
    map: textureLoader.load("sky.jpg"),
    side: DoubleSide,
  })
);
scene.add(bg);
//earth
const earthTexture = new THREE.TextureLoader().load("earth.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
scene.add(earth);

//moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture })
);

scene.add(moon);

//pivot

//function

function animate() {
  requestAnimationFrame(animate);
  const time = 0.0001 * performance.now();
  torus.rotation.x += 0.0;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.0;
  moon.position.x = -Math.cos(1 * time) * 27;
  moon.position.z = Math.sin(1 * time) * 27;
  moon.rotation.y += 0.0017;

  earth.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
}
document.body.onscroll = moveCamera;

animate();
