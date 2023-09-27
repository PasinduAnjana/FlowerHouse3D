import * as THREE from 'three';
import { createCube, createHighlightSquare, createPlane, importGLB } from './3dObjects';


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

    //add ground
    const ground= createPlane();
    ground.rotation.x=-Math.PI/2
    scene.add(ground);

    const grid=new THREE.GridHelper(20,20);
    scene.add(grid);

    const highlight=createHighlightSquare();
    highlight.rotation.x=-Math.PI/2;
    highlight.position.set(.5,0.01,.5)
    scene.add(highlight);


    //add raycast
    const mousePosition=new THREE.Vector2();
    const raycaster=new THREE.Raycaster();
    let intersects;

    window.addEventListener('mousemove',function(e){
        mousePosition.x=(e.clientX/this.window.innerWidth)*2-1;
        mousePosition.y=-(e.clientY/this.window.innerHeight)*2+1;
        raycaster.setFromCamera(mousePosition,camera);
        intersects=raycaster.intersectObjects(scene.children);
        intersects.forEach(function(intersect){
            if(intersect.object.name==="ground"){
            const highlightpos=new THREE.Vector3().copy(intersect.point).floor().addScalar(.5);
            highlight.position.set(highlightpos.x,.01,highlightpos.z);
        }
        });
        
    });

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

