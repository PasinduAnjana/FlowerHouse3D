import * as THREE from 'three';
import { createCube, createHighlightSquare, createPlane, createSphere, importCrop1, importGLB } from './3dObjects';

import {  clearObjects, spawnOnClick } from './gamelogic';
import { selectedButton } from './buttons';




export function setupRaycasting(scene, camera, highlight,mixers) {
    const mousePosition = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    let intersects;
    const clonedObjs=[];
    const flowers=[];
    const crops=[];

    var ClearBtn = document.getElementById("clearBtn");

    ClearBtn.addEventListener('click',()=>{
       clearObjects(scene,clonedObjs,crops,flowers)
    } );




    //instanceOnGrid(mousePosition,raycaster,scene, camera, highlight, clonedObjs);

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
            //console.log(intersects.length);
            if(intersects[0]){
              if((intersects[0].object.name ==="ground")){
                spawnOnClick(highlight,scene,clonedObjs,mixers,crops,flowers);
                }  
            }
            if(intersects[1]){
                if((intersects[1].object.name ==="ground")){

                    spawnOnClick(highlight,scene,clonedObjs,mixers,crops,flowers);
                  }  
              }
            
        //});
        }

        
           //console.log(clonedObjs);
    });



}

