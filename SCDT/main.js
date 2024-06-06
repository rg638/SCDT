import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(document.getElementById('3d-model').offsetWidth, document.getElementById('3d-model').offsetWidth);
document.getElementById('3d-model').appendChild(renderer.domElement)
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, document.getElementById('3d-model').offsetWidth / document.getElementById('3d-model').offsetWidth, 1, 1000);
camera.position.set(50, 30, 50);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 10;
controls.maxDistance = 200;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 5, 0);
controls.update();



const spotLight = new THREE.SpotLight(0xffffff, 70000, 0, 1, 1);
spotLight.position.set(0, 100, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.00001;
scene.add(spotLight);

const bottomLight = new THREE.SpotLight(0xffffff, 5000, 0, 1, 1);
bottomLight.position.set(0, -100, 0); // Position the light below the model
spotLight.castShadow = true;
spotLight.shadow.bias = -0.00001;
scene.add(bottomLight);

const loader = new GLTFLoader().setPath('public/low-polyish_satellite/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.position.set(0, 1.05, -1);
  scene.add(mesh);

}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

window.addEventListener('resize', () => {
  camera.aspect = document.getElementById('3d-model').offsetWidth / document.getElementById('3d-model').offsetWidth;
  camera.updateProjectionMatrix();
  renderer.setSize(document.getElementById('3d-model').offsetWidth, document.getElementById('3d-model').offsetWidth);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("load", () => {
  for (let i of document.querySelectorAll(".collapsible ol, .collapsible ul")) {
    let t = document.createElement("div");
    t.innerHTML = i.previousSibling.textContent;
    t.className = "toggle";
    t.onclick = () => t.classList.toggle("open");
    i.parentElement.removeChild(i.previousSibling);
    i.parentElement.insertBefore(t, i);
  }
});

const xValues = [100,200,300,400,500,600,700,800,900,1000];

const myChart = new Chart("myChart", {
    type: "line",
    data: {
    labels: xValues,
    datasets: [{
      pointRadius: 4,
      pointBackgroundColor: "white",
      data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
    }]
  },
    options: {
      legend: {display:false}
    }
  });


  const myChart1 = new Chart("myChart1", {
    type: "line",
    data: {
    labels: xValues,
    datasets: [{
      pointRadius: 4,
      pointBackgroundColor: "white",
      data: [100,90,85,85,70,60,55,60,65,60],
    }]
  },
    options: {
      legend: {display:false}
    }
  });