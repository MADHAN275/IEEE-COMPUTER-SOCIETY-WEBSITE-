'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const ParticleSystem = () => {
  const ref = useRef<THREE.Points>(null)
  const particleCount = 5000

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    
    return positions
  }, [particleCount])

  const particlesVelocity = useMemo(() => {
    const velocities = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    
    return velocities
  }, [particleCount])

  useFrame((state) => {
    if (!ref.current) return

    const positions = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Update positions
      positions[i3 + 0] += particlesVelocity[i3 + 0] + Math.sin(state.clock.elapsedTime + i * 0.01) * 0.001
      positions[i3 + 1] += particlesVelocity[i3 + 1] + Math.cos(state.clock.elapsedTime + i * 0.01) * 0.001
      positions[i3 + 2] += particlesVelocity[i3 + 2] + Math.sin(state.clock.elapsedTime * 0.5 + i * 0.02) * 0.001
      
      // Wrap around boundaries
      if (positions[i3 + 0] > 10) positions[i3 + 0] = -10
      if (positions[i3 + 0] < -10) positions[i3 + 0] = 10
      if (positions[i3 + 1] > 10) positions[i3 + 1] = -10
      if (positions[i3 + 1] < -10) positions[i3 + 1] = 10
      if (positions[i3 + 2] > 10) positions[i3 + 2] = -10
      if (positions[i3 + 2] < -10) positions[i3 + 2] = 10
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color='#F39019'
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default ParticleSystem