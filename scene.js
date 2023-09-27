import * as THREE from 'three';
import { createCube, importGLB } from './3dObjects';


export function initScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    camera.position.y=3;

    scene.background=new THREE.Color('lightblue')

    const cube = createCube();
    cube.position.x=1;
    //scene.add(cube);

    importGLB((house)=>{
        scene.add(house);
    })


    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040,40); // Choose a color for the ambient light
    scene.add(ambientLight);

    //Add directional light
    const dirLight= new THREE.DirectionalLight('white',4)
    dirLight.position.set(5,5,3)
    scene.add(dirLight)

    

    return { scene, camera };
}



export function animate(renderer, scene, camera) {
    function animateLoop() {
        requestAnimationFrame(animateLoop);

        //scene.getObjectByName('myCube').rotation.x += 0.01;

        if(scene.getObjectByName('myHouse')){
           // scene.getObjectByName('myHouse').rotation.y += 0.01;
        }
        


        renderer.render(scene, camera);
    }

    animateLoop();
}

