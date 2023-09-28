import * as THREE from 'three';
import { createCube, createHighlightSquare, createPlane, createSphere, importCrop1, importGLB } from './3dObjects';
import { gsap } from 'gsap';


export function setupRaycasting(scene, camera, highlight, clonedObjs) {
    const mousePosition = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let intersects;
    let ranRot=Math.PI/2;
    let crop1;



    importCrop1((crop)=>{
        crop.position.x=3;
        crop1=crop;
        console.log(crop1);
    })

    // Add raycasting logic here
    window.addEventListener('mousemove', function (e) {
        mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mousePosition, camera);
        intersects = raycaster.intersectObjects(scene.children);

        if (intersects[0]) {
            if (intersects[0].object.name === "ground") {
                const highlightpos = new THREE.Vector3().copy(intersects[0].point).floor().addScalar(0.5);
                highlight.position.set(highlightpos.x, 0.01, highlightpos.z);

                const cloneExist = clonedObjs.find(function (object) {
                    return (
                        object.position.x === highlight.position.x &&
                        object.position.z === highlight.position.z
                    );
                });

                if (cloneExist) {
                    highlight.material.color.set('red');
                } else {
                    highlight.material.color.set('green');
                }
            }
        }
    });



    //add object on click
    window.addEventListener('mousedown',function(){

        const cloneExist=clonedObjs.find(function(object){
            //console.log(object.position.z);
            return(object.position.x===highlight.position.x)&&
            (object.position.z===highlight.position.z) 

        })
        if(!cloneExist){
            //intersects.forEach(function(intersect){
            //if(intersect.object.name==="ground"){
            console.log(intersects.length);
            if(intersects[0]){
              if((intersects[0].object.name ==="ground")){
                spawnOnClick();
                }  
            }
            if(intersects[1]){
                if((intersects[1].object.name ==="ground")){
                    spawnOnClick();
                  }  
              }
            
        //});
        }

        function spawnOnClick(){
            const sphereClone=crop1.clone();
                  sphereClone.position.copy(highlight.position);
                  sphereClone.rotation.y=ranRot;
                  sphereClone.scale.set(.1,.1,.1)
                  scene.add(sphereClone);
                  gsap.to(sphereClone.scale,{
                    x:.5,y:.5,z:.5,
                    duration:.3
                  })
                  ranRot+=Math.PI/2;
                  clonedObjs.push(sphereClone);
        }
           //console.log(clonedObjs);
    });
    // Add your other event listeners and functions here as needed

}
