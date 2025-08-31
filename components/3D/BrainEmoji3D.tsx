'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BrainEmoji3D = () => {
  const brainRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      brainRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  // Create custom brain geometry with proper wrinkles
  const brainGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(0.8, 32, 32)
    const positions = geometry.attributes.position.array as Float32Array
    
    // Modify vertices to create brain-like wrinkled surface
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]
      
      // Create wrinkles by adding sinusoidal variations
      const wrinkleFreq = 8
      const wrinkleAmp = 0.08
      
      // Horizontal wrinkles
      const horizontalWrinkle = Math.sin(y * wrinkleFreq) * wrinkleAmp
      
      // Vertical wrinkles for more complexity
      const verticalWrinkle = Math.sin(x * wrinkleFreq * 0.7) * wrinkleAmp * 0.5
      
      // Make the brain more oval (wider than tall)
      positions[i] *= 1.1 // Make wider
      positions[i + 1] *= 0.85 // Make less tall
      positions[i + 2] *= 0.9 // Slightly compress depth
      
      // Add the wrinkles
      const radius = Math.sqrt(x * x + y * y + z * z)
      const factor = 1 + horizontalWrinkle + verticalWrinkle
      
      positions[i] *= factor
      positions[i + 1] *= factor
      positions[i + 2] *= factor
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])

  // Create particle positions for neural activity
  const particlePositions = useMemo(() => {
    const positions = []
    const count = 100
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 1.2 + Math.random() * 0.3
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )
    }
    return new Float32Array(positions)
  }, [])

  const particleAttribute = useMemo(() => new THREE.BufferAttribute(particlePositions, 3), [particlePositions]);

  return (
    <group ref={brainRef}>
      {/* Main Brain Body */}
      <group>
        {/* Left Hemisphere */}
        <mesh position={[-0.08, 0, 0]} geometry={brainGeometry}>
          <meshStandardMaterial 
            color="#FFB6C1"
            roughness={0.7}
            metalness={0.05}
            bumpScale={0.005}
          />
        </mesh>
        
        {/* Right Hemisphere */}
        <mesh position={[0.08, 0, 0]} geometry={brainGeometry}>
          <meshStandardMaterial 
            color="#FFB6C1"
            roughness={0.7}
            metalness={0.05}
            bumpScale={0.005}
          />
        </mesh>
        
        {/* Central Fissure (gap between hemispheres) */}
        <mesh position={[0, 0, 0]} scale={[0.02, 1.4, 0.8]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#CD919E"
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* Major Brain Folds/Gyri */}
      {/* Frontal Lobe Gyri */}
      <mesh position={[0.3, 0.3, 0.4]} rotation={[0, 0.3, 0.2]} scale={[0.3, 0.08, 0.15]}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="#E4A0A8" roughness={0.8} />
      </mesh>
      <mesh position={[-0.3, 0.3, 0.4]} rotation={[0, -0.3, -0.2]} scale={[0.3, 0.08, 0.15]}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="#E4A0A8" roughness={0.8} />
      </mesh>
      
      {/* Parietal Lobe Gyri */}
      <mesh position={[0.2, 0.5, 0]} rotation={[0.3, 0, 0]} scale={[0.35, 0.08, 0.15]}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="#E4A0A8" roughness={0.8} />
      </mesh>
      <mesh position={[-0.2, 0.5, 0]} rotation={[0.3, 0, 0]} scale={[0.35, 0.08, 0.15]}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="#E4A0A8" roughness={0.8} />
      </mesh>
      
      {/* Temporal Lobe Gyri */}
      <mesh position={[0.5, -0.2, 0.2]} rotation={[0, 0, 1.2]} scale={[0.25, 0.06, 0.12]}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="#E4A0A8" roughness={0.8} />
      </mesh>
      <mesh position={[-0.5, -0.2, 0.2]} rotation={[0, 0, -1.2]} scale={[0.25, 0.06, 0.12]}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="#E4A0A8" roughness={0.8} />
      </mesh>
      
      {/* Occipital Lobe Gyri */}
      <mesh position={[0, 0.2, -0.5]} rotation={[1.5, 0, 0]} scale={[0.3, 0.06, 0.1]}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="#E4A0A8" roughness={0.8} />
      </mesh>
      
      {/* Additional Surface Details */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 0.6 + Math.random() * 0.2
        const height = (Math.random() - 0.5) * 0.6
        return (
          <mesh 
            key={`detail-${i}`}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
            rotation={[Math.random() * Math.PI, angle, 0]}
            scale={[0.15, 0.04, 0.08]}
          >
            <capsuleGeometry args={[0.3, 0.6, 4, 8]} />
            <meshStandardMaterial 
              color="#DB8E98"
              roughness={0.85}
            />
          </mesh>
        )
      })}
      
      {/* Cerebellum (bottom/back) */}
      <mesh position={[0, -0.45, -0.3]} scale={[0.7, 0.4, 0.5]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color="#CD919E"
          roughness={0.8}
          metalness={0.02}
        />
      </mesh>
      
      {/* Cerebellum Ridges */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={`cb-ridge-${i}`}
          position={[(i - 3.5) * 0.08, -0.45, -0.3]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[0.3, 0.01, 0.4]}
        >
          <cylinderGeometry args={[0.5, 0.5, 1]} />
          <meshStandardMaterial color="#B87A86" roughness={0.9} />
        </mesh>
      ))}
      
      {/* Brain Stem */}
      <mesh position={[0, -0.75, -0.1]}>
        <cylinderGeometry args={[0.12, 0.15, 0.25]} />
        <meshStandardMaterial 
          color="#DB8E98"
          roughness={0.7}
        />
      </mesh>
      
      {/* Neural Activity Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <primitive object={particleAttribute} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#00CED1"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default BrainEmoji3D