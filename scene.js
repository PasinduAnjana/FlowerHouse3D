import * as THREE from 'three';
import { createCube, createHighlightSquare, createPlane, importGLB } from './3dObjects';
import { gsap } from 'gsap';
import { setupRaycasting } from './raycast';

const mixers=[];

export function initScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    camera.position.y=3;

    scene.background=new THREE.Color('lightblue');

    

    const cube = createCube();
    cube.position.x=0;
    cube.scale.set(2,.2,4)
    scene.add(cube);
    cube.visible=false

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

    //add ground
    const ground= createPlane();
    ground.rotation.x=Math.PI/2
    scene.add(ground);

    const grid=new THREE.GridHelper(20,20);
    //scene.add(grid);

    const highlight=createHighlightSquare();
    highlight.rotation.x=-Math.PI/2;
    highlight.position.set(.5,0.01,.5)
    scene.add(highlight);



    setupRaycasting(scene, camera, highlight,mixers);

    return { scene, camera };
}



const clock=new THREE.Clock();

export function animate(renderer, scene, camera) {
    function animateLoop() {
        requestAnimationFrame(animateLoop);
        const delta=clock.getDelta();

        //scene.getObjectByName('myCube').rotation.x += 0.01;

        if(scene.getObjectByName('myHouse')){
           // scene.getObjectByName('myHouse').rotation.y += 0.01;
        }

        //if(mixer) mixer.update(clock.getDelta());
        mixers.forEach(function(mixer) {
            mixer.update(delta/2);
        })


        renderer.render(scene, camera);
    }

    animateLoop();
}

