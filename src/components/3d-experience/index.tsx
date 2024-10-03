"use client"
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ThreeExperience = () => {

    const meshRef = useRef<THREE.Mesh>(null)

    useEffect(() => {
        const animate = () => {
            if(meshRef.current)
            {
                meshRef.current.rotation.y += 0.006
            }

            requestAnimationFrame(animate)
        }

        animate()
    },[])


  return (
    <Canvas  camera={{position:[3,3,3]}} >
        <OrbitControls />
        <mesh ref={meshRef} >
            <boxGeometry args={[2.5,2.5,2.5]} />
            <meshNormalMaterial />
        </mesh>
    </Canvas>
  )
}

export default ThreeExperience