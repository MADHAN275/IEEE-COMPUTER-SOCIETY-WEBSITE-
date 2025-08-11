'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const ContactParticleField = () => {
  const ref = useRef<THREE.Points>(null)
  const particleCount = 2000

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    
    return positions
  }, [particleCount])

  useFrame((state) => {
    if (!ref.current) return

    const positions = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Create wave motion
      positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.01
      positions[i3 + 0] += Math.cos(state.clock.elapsedTime + i * 0.005) * 0.005
      
      // Wrap around
      if (positions[i3 + 1] > 7.5) positions[i3 + 1] = -7.5
      if (positions[i3 + 1] < -7.5) positions[i3 + 1] = 7.5
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color='#F39019'
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  )
}

export default ContactParticleField