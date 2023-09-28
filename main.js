import * as THREE from 'three';
import "./style.css"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { animate, initScene } from './scene';
import { importGLB } from './3dObjects';




const scene=initScene();


//screen size
const sizes={
  width:window.innerWidth,
  height:window.innerHeight,
}


function main(){
  

  const renderer = new THREE.WebGLRenderer({antialias:true});


  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  renderer.pixelRatio=2;

  const camera=scene.camera;

  const controls = new OrbitControls( camera, renderer.domElement );



  //resize
window.addEventListener("resize",()=>{
  //update size
  sizes.width=window.innerWidth;
  sizes.height=window.innerHeight;

  //update camera
  camera.aspect=sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width,sizes.height)

})


  animate(renderer, scene.scene, camera);
}

main();

