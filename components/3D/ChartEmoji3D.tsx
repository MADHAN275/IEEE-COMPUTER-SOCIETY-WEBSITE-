'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

const ChartEmoji3D = () => {
  const chartRef = useRef<THREE.Group>(null)
  const barRefs = useRef<THREE.Mesh[]>([])
  const arrowRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (chartRef.current) {
      chartRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      chartRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
    
    // Animate bars growing
    barRefs.current.forEach((ref, index) => {
      if (ref) {
        const targetHeight = 0.3 + index * 0.3
        const animatedHeight = targetHeight + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1
        ref.scale.y = animatedHeight
        ref.position.y = animatedHeight / 2 - 0.5
      }
    })
    
    if (arrowRef.current) {
      arrowRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }
  })

  const barData = [
    { height: 0.4, color: '#4CAF50' },
    { height: 0.7, color: '#8BC34A' },
    { height: 1.0, color: '#CDDC39' },
    { height: 1.3, color: '#FFC107' },
    { height: 1.6, color: '#FF9800' }
  ]

  return (
    <group ref={chartRef}>
      {/* Chart Base/Grid */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[2.4, 0.05, 1.6]} />
        <meshStandardMaterial 
          color="#37474F" 
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      
      {/* Grid Lines */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={`grid-x-${i}`} position={[-1 + i * 0.5, -0.3, 0]}>
          <boxGeometry args={[0.02, 1, 0.02]} />
          <meshStandardMaterial 
            color="#546E7A" 
            emissive="#546E7A"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`grid-y-${i}`} position={[0, -0.6 + i * 0.3, 0]}>
          <boxGeometry args={[2.2, 0.02, 0.02]} />
          <meshStandardMaterial 
            color="#546E7A" 
            emissive="#546E7A"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      
      {/* Chart Bars */}
      {barData.map((bar, index) => (
        <mesh
          key={index}
          position={[-0.8 + index * 0.4, bar.height / 2 - 0.5, 0]}
          ref={(ref) => {
            if (ref) barRefs.current[index] = ref
          }}
        >
          <boxGeometry args={[0.25, bar.height, 0.25]} />
          <meshStandardMaterial 
            color={bar.color} 
            roughness={0.3}
            metalness={0.2}
            emissive={bar.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
      
      {/* Trend Arrow */}
      <group ref={arrowRef} position={[0.8, 0.5, 0]}>
        {/* Arrow Shaft */}
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial 
            color="#E91E63" 
            emissive="#E91E63"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Arrow Head */}
        <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
          <coneGeometry args={[0.08, 0.15]} />
          <meshStandardMaterial 
            color="#C2185B" 
            emissive="#C2185B"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
      
      {/* Data Points */}
      {barData.map((_, index) => (
        <mesh key={`point-${index}`} position={[-0.8 + index * 0.4, barData[index].height + 0.1, 0.2]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial 
            color="#FF5722" 
            emissive="#FF5722"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      
      {/* Connecting Line */}
      <mesh position={[0, 0.3, 0.2]} rotation={[0, 0, Math.PI / 12]}>
        <cylinderGeometry args={[0.01, 0.01, 1.8]} />
        <meshStandardMaterial 
          color="#FF5722" 
          emissive="#FF5722"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Floating Success Indicators */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 1.5
        return (
          <mesh key={`indicator-${i}`} position={[
            Math.cos(angle) * radius,
            Math.sin(angle) * 0.3 + 0.8,
            Math.sin(angle) * 0.3
          ]}>
            <sphereGeometry args={[0.03]} />
            <meshStandardMaterial 
              color="#4CAF50" 
              emissive="#4CAF50"
              emissiveIntensity={1}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default ChartEmoji3D