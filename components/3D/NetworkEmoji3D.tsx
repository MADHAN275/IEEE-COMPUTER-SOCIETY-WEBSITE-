'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

const NetworkEmoji3D = () => {
  const globeRef = useRef<THREE.Mesh>(null)
  const networkRef = useRef<THREE.Group>(null)
  const connectionRefs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    
    if (networkRef.current) {
      networkRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    
    connectionRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.2)
      }
    })
  })

  // Create network nodes around globe
  const networkNodes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const radius = 1.8
    const height = (Math.random() - 0.5) * 1.5
    return {
      position: [
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      ] as [number, number, number],
      angle
    }
  })

  return (
    <group>
      {/* Main Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color="#2196F3" 
          roughness={0.2}
          metalness={0.3}
          emissive="#2196F3"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Globe Grid Lines */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={`meridian-${i}`} rotation={[0, (i / 8) * Math.PI, 0]}>
          <torusGeometry args={[0.82, 0.01, 8, 32]} />
          <meshStandardMaterial 
            color="#1976D2" 
            emissive="#1976D2"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`parallel-${i}`} rotation={[Math.PI / 2, 0, 0]} position={[0, (i - 1.5) * 0.4, 0]}>
          <torusGeometry args={[0.82 - Math.abs(i - 1.5) * 0.2, 0.01, 8, 32]} />
          <meshStandardMaterial 
            color="#1976D2" 
            emissive="#1976D2"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Network Connection Points */}
      <group ref={networkRef}>
        {networkNodes.map((node, index) => (
          <mesh 
            key={index} 
            position={node.position}
            ref={(ref) => {
              if (ref) connectionRefs.current[index] = ref
            }}
          >
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial 
              color="#FF9800" 
              emissive="#FF9800"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
        
        {/* Connection Lines */}
        {networkNodes.map((node, index) => {
          const nextIndex = (index + 1) % networkNodes.length
          const nextNode = networkNodes[nextIndex]
          
          const start = new THREE.Vector3(...node.position)
          const end = new THREE.Vector3(...nextNode.position)
          const direction = end.clone().sub(start)
          const length = direction.length()
          const center = start.clone().add(end).multiplyScalar(0.5)
          
          return (
            <mesh key={`connection-${index}`} position={center.toArray()}>
              <cylinderGeometry args={[0.01, 0.01, length]} />
              <meshStandardMaterial 
                color="#4CAF50" 
                emissive="#4CAF50"
                emissiveIntensity={0.4}
              />
            </mesh>
          )
        })}
      </group>
      
      {/* Orbiting Data Packets */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 1.2 + Math.sin(i) * 0.3
        return (
          <mesh key={`packet-${i}`} position={[
            Math.cos(angle) * radius,
            Math.sin(angle * 2) * 0.5,
            Math.sin(angle) * radius
          ]}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial 
              color="#00BCD4" 
              emissive="#00BCD4"
              emissiveIntensity={0.6}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default NetworkEmoji3D