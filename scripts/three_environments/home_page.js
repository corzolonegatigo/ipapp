import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';




const scene = new THREE.Scene();
scene.background = new THREE.Color(0xEECF6D)
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(8, 4, 8)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5, 10, 5)
scene.add(light)

scene.add(new THREE.AmbientLight(0xffffff, 0.8))

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const three_env = document.getElementById('3js-env')
three_env.appendChild( renderer.domElement );



// load custom mesh

const loader = new GLTFLoader();
const gltf = await loader.loadAsync( '/models/test.glb');
const mesh = gltf.scene

// get reference size
const box = new THREE.Box3().setFromObject(mesh)
const size = box.getSize(new THREE.Vector3())

const maxAxis = Math.max(size.x, size.y, size.z);
mesh.scale.multiplyScalar(2.5 / maxAxis);
scene.add(mesh)

const measure = new THREE.Vector3()
console.log(box.getSize(measure))



/*
const geometry = new THREE.BoxGeometry( 2, 2, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x90ffee } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

cube.x = -100
*/
function animate() {

/*
  cube.rotation.x += 0.025;
  cube.rotation.y = 0.06;
*/
    mesh.rotation.y += 0.01
    renderer.render( scene, camera );

}

renderer.setAnimationLoop( animate );