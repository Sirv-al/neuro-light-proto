import './style.css'
import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.z = 4;
orbit.update();

loader.load("./models/brainModel.glb", function (gltf)
{
  gltf.scene.position.set(0.5, -2, 0);
  gltf.scene.scale.set(1,1);
  gltf.scene.rotation.y = -1.5;
  scene.add(gltf.scene);
},
undefined, function (error) {console.error(error);}
);



const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directLight = new THREE.DirectionalLight(0xFFFFFF, 1)
scene.add(directLight);

const dLightHelper = new THREE.DirectionalLight(directLight);
scene.add(dLightHelper);

renderer.setClearColor(0x172d40);

function animate()
{
  renderer.render (scene, camera);
}

renderer.setAnimationLoop(animate);
