import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(1);


const pointLight = new THREE.PointLight(0Xffffff);
pointLight.position.set(0,0,0);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const galaxyTexture = new THREE.TextureLoader().load('textures/bg.jpg');
const coneGeometry = new THREE.ConeGeometry( 5, 20, 1000 );
const coneMaterial = new THREE.MeshStandardMaterial({side: THREE.BackSide, map: galaxyTexture});
coneMaterial.map.wrapS = THREE.RepeatWrapping;
coneMaterial.map.wrapT = THREE.RepeatWrapping;
coneMaterial.map.repeat.set(2, 1);
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh.rotateX(Math.PI * 1.5);
coneMesh.position.z -= 2;
scene.add(coneMesh);


var run = false;
const runBtn = document.getElementById('runBtn');
runBtn.onmouseenter = () => {
  run = true;
}
runBtn.onmouseleave = () => {
  run = false;
  i = 0;
  j = 0;
}


var i = 0;
var j = 0;
function prepareToStart() {
  i++;
  coneMesh.material.map.offset.y -= 0.0005;
  coneMesh.scale.y -= 0.0099;
}
function start() {
  j++;
  coneMesh.scale.y += 0.4;
}
function animate() {
  if(run) {
    if (i < 100) {
      prepareToStart();
    }
    else {
      if (j < 75) {
        start();
      }
    }
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();