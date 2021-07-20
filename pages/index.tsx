import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Global } from '../styles/style'
import * as THREE from 'three';

export default function Home() {
  let events:any = {
    'keydown': null,
    'keypress' : null,
    'keyup' : null,
  }
  let keys:any = {
  
  }
useEffect(() => {
    const SPEED_CAMERA = 0.1;
    const call_event:any = (event:any , keys:any) => {
      if(events[event]) events[event]()
    }
    const scene:any = new THREE.Scene();
    const canvas:any = document.querySelector('.canvas');
    const camera:any = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight , 0.1, 50)
    const renderer:any = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight - 4)
    const material = new THREE.MeshBasicMaterial({color: 'white'})
    const cube = new THREE.Mesh(new THREE.BoxGeometry(), material)
    scene.add(cube)
    camera.position.z = 5;
    camera.position.y = 1;
    function animate(){
      call_event('keydown', keys)
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()
    window.addEventListener<'keydown'>('keydown', (event:any)=> {
      if (!keys[event.code]) {
				keys[event.code] = true;
				call_event('keypress', keys);
			}
    })
    window.addEventListener<'keyup'>('keyup', (event:any)=> {
      keys[event.code] = false
      call_event('keyup', keys)
    })
    window.addEventListener<'keypress'>('keypress', ()=>{
        if (keys.KeyW)
          camera.position.z -= SPEED_CAMERA;
        else if (keys.KeyS)
          camera.position.z += SPEED_CAMERA;
        else if (keys.KeyA)
          camera.position.x -= SPEED_CAMERA;
        else if (keys.KeyD)
          camera.position.x += SPEED_CAMERA;
    })
    console.log(keys)
}, [])
  return (<>
      <Head>
        <title>Главная траница</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global/>
      <canvas className="canvas"></canvas>
  </>)
}
