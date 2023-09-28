import * as THREE from 'three';
import { importCrop1 } from './3dObjects';
import { gsap } from 'gsap';

let ranRot=Math.PI/2;
let crop1;
let cropCount=0;
var cropCountElement=document.getElementById("count");

importCrop1((crop)=>{
    crop.position.x=3;
    crop1=crop;
    //console.log(crop1);
})


export function spawnOnClick(highlight,scene,clonedObjs){
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
          cropCount=clonedObjs.length;
          cropCountElement.innerHTML=cropCount;
}


export function clearObjects(scene,clonedObjs){
  // Iterate through all objects in the scene
  clonedObjs.forEach(function (crop) {
    if (crop.children[0] instanceof THREE.Mesh) {

      scene.remove(crop);  
      crop.children[0].geometry.dispose(); 
      crop.children[0].material.dispose();

    }
  });

  clonedObjs.length=0;
  cropCountElement.innerHTML=0;
}