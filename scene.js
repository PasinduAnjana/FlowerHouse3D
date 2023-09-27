import * as THREE from 'three';
import { createCube, createHighlightSquare, createPlane, createSphere, importCrop1, importGLB } from './3dObjects';

let crop1;
let ranRot=Math.PI/2;

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

    importCrop1((crop)=>{
        crop.position.x=3;
        crop1=crop;
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
    //scene.add(grid);

    const highlight=createHighlightSquare();
    highlight.rotation.x=-Math.PI/2;
    highlight.position.set(.5,0.01,.5)
    scene.add(highlight);


    //add raycast
    const mousePosition=new THREE.Vector2();
    const raycaster=new THREE.Raycaster();
    let intersects;

    //highlight the mouse over square
    window.addEventListener('mousemove',function(e){
        mousePosition.x=(e.clientX/this.window.innerWidth)*2-1;
        mousePosition.y=-(e.clientY/this.window.innerHeight)*2+1;
        raycaster.setFromCamera(mousePosition,camera);
        intersects=raycaster.intersectObjects(scene.children);
        intersects.forEach(function(intersect){
            if(intersect.object.name==="ground"){
            const highlightpos=new THREE.Vector3().copy(intersect.point).floor().addScalar(.5);
            highlight.position.set(highlightpos.x,.01,highlightpos.z);

            const cloneExist=clonedObjs.find(function(object){
                return(object.position.x===highlight.position.x)&&
                (object.position.z===highlight.position.z);
            });

            if(cloneExist){
                highlight.material.color.set('red');
            }
            else{
                highlight.material.color.set('green');
            }
        }
        });   
    });

    const clonedObjs=[];
    const reservedSlots=[{x1:1.5,x2:-1.5,z1:1.5,z2:-1.5}];

    //add object on click
    window.addEventListener('mousedown',function(){

        const cloneExist=clonedObjs.find(function(object){
            console.log(object.position.z);
            return(object.position.x===highlight.position.x)&&
            (object.position.z===highlight.position.z) 

        })
        if(!cloneExist){
            intersects.forEach(function(intersect){
            if(intersect.object.name==="ground"){
            const sphereClone=crop1.clone();
            sphereClone.position.copy(highlight.position);
            sphereClone.rotation.y=ranRot;
            scene.add(sphereClone);
            ranRot+=Math.PI/2;
            clonedObjs.push(sphereClone);

            
        }
        });
        }
           //console.log(clonedObjs);
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

