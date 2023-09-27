import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//import glb
export function importGLB(callback){
    const loader = new GLTFLoader();

    loader.load( 'public/house.glb', function ( gltf ) {
        const house=gltf.scene;
        house.name = 'myHouse';


        if (typeof callback === 'function') {
                    callback(house);
                }
});
}



  export function createCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.name = 'myCube'; // Set a name for the cube for later reference
    return cube;
}


