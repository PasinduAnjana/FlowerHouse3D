import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//import house
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

export function importCrop1(callback){
    const loader = new GLTFLoader();

    //load crop1 glb
    loader.load( 'public/crop1.glb', function ( gltf ) {
        const crop1=gltf.scene;
        crop1.scale.set(.5,.5,.5);
        crop1.name = 'crop1';


        if (typeof callback === 'function') {
                    callback(crop1);
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
//highlight square for floor grid
export function createHighlightSquare(){
    const highlight=new THREE.Mesh(
        new THREE.PlaneGeometry(1,1),
        new THREE.MeshBasicMaterial({
        color:'lightgreen',
        transparent:true,
        opacity:.25
        })
    );
    return highlight;
  
}
//create a sphere
export function createSphere() {
    const geometry = new THREE.SphereGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 'white' });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.scale.set(.1,.1,.1)
    sphere.name = 'mySphere'; // Set a name for the cube for later reference
    return sphere;
}



export function createCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.name = 'myCube'; // Set a name for the cube for later reference
    return cube;
}


