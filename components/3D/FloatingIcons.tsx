'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FloatingIcon = ({ position, color = '#F39019', speed = 1 }: { 
  position: [number, number, number], 
  color?: string, 
  speed?: number 
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

const FloatingIcons = () => {
  const icons: { position: [number, number, number], speed: number }[] = [
    { position: [-5, 2, -2], speed: 0.8 },
    { position: [5, -1, -1], speed: 1.2 },
    { position: [-3, -2, 1], speed: 0.6 },
    { position: [3, 3, 0], speed: 1.0 },
    { position: [0, -3, -2], speed: 0.9 },
    { position: [-6, 0, 1], speed: 1.1 },
    { position: [6, 1, -1], speed: 0.7 },
    { position: [2, -1, 2], speed: 1.3 },
    { position: [-2, 2, -3], speed: 0.5 },
    { position: [4, -2, 0], speed: 1.4 },
  ]

  return (
    <group>
      {icons.map((icon, index) => (
        <FloatingIcon
          key={index}
          position={icon.position}
          speed={icon.speed}
        />
      ))}
    </group>
  )
}

export default FloatingIcons