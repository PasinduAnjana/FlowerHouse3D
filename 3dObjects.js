import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//import glb
export function importGLB(callback){
    const loader = new GLTFLoader();

    //load house glb
    loader.load( 'public/house.glb', function ( gltf ) {
        const house=gltf.scene;
        house.name = 'myHouse';


        if (typeof callback === 'function') {
                    callback(house);
                }
});
}

export function createPlane(){
    const planeMesh=new THREE.Mesh(
        new THREE.PlaneGeometry(20,20),
        new THREE.MeshStandardMaterial({
        side:THREE.DoubleSide,
        color:'lightgreen'
        })
    );
    planeMesh.name='ground';
    return planeMesh;
  
}

export function createHighlightSquare(){
    const highlight=new THREE.Mesh(
        new THREE.PlaneGeometry(1,1),
        new THREE.MeshBasicMaterial({
        color:'white'
        })
    );
    return highlight;
  
}



export function createCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.name = 'myCube'; // Set a name for the cube for later reference
    return cube;
}


