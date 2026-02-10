import * as THREE from 'three';



const scene = new THREE.Scene();
scene.background = new THREE.Color(0xEECF6D)
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

const three_env = document.getElementById('3js-env')
three_env.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 2, 2, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x90ffee } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

cube.x = -100
function animate() {

  cube.rotation.x += 0.025;
  cube.rotation.y = 0.06;

  renderer.render( scene, camera );

}