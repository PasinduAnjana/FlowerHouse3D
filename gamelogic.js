import * as THREE from 'three';
import { importCrop1, importFlower1 } from './3dObjects';
import { gsap } from 'gsap';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';
import { selectedButton } from './buttons';


let money=100000;
const cropValue=50;
let ranRot=0;
let crop1;
let flower1;
let activeAni;
let flower1ani;
let crop1Ani;
let cropCount=0;
var cropCountElement=document.getElementById("cropCount");
var flowerCountElement=document.getElementById("flowerCount")
var moneyElement=document.querySelector(".coin-text")
let activeCrop;

export function init(){
  moneyElement.textContent=money;
}


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


export function spawnOnClick(highlight,scene,clonedObjs,mixers,crops,flowers){


  if(selectedButton==null){
  }
  else if(money>=cropValue)
  {
    if(selectedButton.id=="crop"){
      activeCrop=crop1;
      activeAni=crop1Ani;
    }
    else if(selectedButton.id=="flower"){
      activeCrop=flower1;
      activeAni=flower1ani;
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

        if(sphereClone.name === "crop1"){
          crops.push(sphereClone);
        }
        else if(sphereClone.name === "flower1"){
          flowers.push(sphereClone);
        }

        cropCount=clonedObjs.length;
        cropCountElement.innerHTML=crops.length;
        flowerCountElement.innerHTML=flowers.length;

        money-=cropValue;
        moneyElement.textContent=money;
  }

}


export function clearObjects(scene,clonedObjs,crops,flowers){
  // Iterate through all objects in the scene
  clonedObjs.forEach(function (crop) {
    
    //console.log(crop.children[0].children[0] instanceof THREE.Mesh);


    if (crop.children[0] instanceof THREE.Mesh) {

      scene.remove(crop);  
      crop.children[0].geometry.dispose(); 
      crop.children[0].material.dispose();

    }
    if (crop.children[0].children[0] instanceof THREE.Mesh) {

      scene.remove(crop);  
      crop.children[0].children[0].geometry.dispose(); 
      crop.children[0].children[0].material.dispose();

    }
  });
  if(money<100){
    money+=10000;
  }

  clonedObjs.length=0;
  crops.length=0;
  flowers.length=0;
  cropCountElement.innerHTML=0;
  flowerCountElement.innerHTML=0;
}
