'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BoardCarousel3D = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  const createCard = (position: [number, number, number], color: string) => (
    <mesh position={position}>
      <planeGeometry args={[1, 1.4]} />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  )

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return createCard([x, 0, z], `hsl(${30 + i * 10}, 80%, 60%)`)
      })}
    </group>
  )
}

export default BoardCarousel3D