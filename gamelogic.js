import * as THREE from 'three';
import { importCrop1, importFlower1 } from './3dObjects';
import { gsap } from 'gsap';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';



let ranRot=0;
let crop1;
let flower1;
let activeAni;
let flower1ani;
let crop1Ani;
let cropCount=0;
var cropCountElement=document.getElementById("count");
let activeCrop;


var CropBtn = document.getElementById("cropSel");
var FlowerBtn = document.getElementById("flowerSel");

clicCrop();
CropBtn.addEventListener('click',clicCrop );
FlowerBtn.addEventListener('click',clicFlower );

importCrop1((crop,animations)=>{
    crop.position.x=3;
    crop1Ani=0;
    crop1=crop;
    //console.log(crop1);
});

importFlower1((flower,animations)=>{
    flower.position.x=2;
    flower1ani=animations[0];
    flower1=flower;
  }    
);


function clicCrop(){
    activeCrop=crop1;
    activeAni=crop1Ani;
}

function clicFlower(){
  activeCrop=flower1;
    activeAni=flower1ani;
}


export function spawnOnClick(highlight,scene,clonedObjs,mixers){

  if(!activeCrop){
    clicCrop();
  }
    
    //const sphereClone=crop1.clone();
    const sphereClone=SkeletonUtils.clone(activeCrop);
          sphereClone.position.copy(highlight.position);
          sphereClone.rotation.y=ranRot;
          sphereClone.scale.set(.1,.1,.1)
          scene.add(sphereClone);

          //animation
          if(activeAni){
            const mixer=new THREE.AnimationMixer(sphereClone);
            const clip= mixer.clipAction(activeAni);
            clip.play();
            mixers.push(mixer);
          }
          
          

          gsap.to(sphereClone.scale,{
            x:.5,y:.5,z:.5,
            duration:.3
          })
          //ranRot+=Math.PI/2;
          clonedObjs.push(sphereClone);
          cropCount=clonedObjs.length;
          cropCountElement.innerHTML=cropCount;
}


export function clearObjects(scene,clonedObjs){
  // Iterate through all objects in the scene
  clonedObjs.forEach(function (crop) {
    
    console.log(crop.children[0].children[0] instanceof THREE.Mesh);


    if (crop.children[0] instanceof THREE.Mesh) {
      console.log('fst');
      scene.remove(crop);  
      crop.children[0].geometry.dispose(); 
      crop.children[0].material.dispose();

    }
    if (crop.children[0].children[0] instanceof THREE.Mesh) {
      console.log('snd');
      scene.remove(crop);  
      crop.children[0].children[0].geometry.dispose(); 
      crop.children[0].children[0].material.dispose();

    }

  });

  clonedObjs.length=0;
  cropCountElement.innerHTML=0;
}