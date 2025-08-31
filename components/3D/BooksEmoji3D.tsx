'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

interface Book {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  thickness: number;
}

const BooksEmoji3D = () => {
  const booksRef = useRef<THREE.Group>(null)
  const bookRefs = useRef<THREE.Mesh[]>([])
  const pagesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (booksRef.current) {
      booksRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2
      booksRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1
    }
    
    // Animate individual books
    bookRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.05
        ref.position.y = Math.sin(state.clock.elapsedTime * 1.2 + index * 0.5) * 0.05
      }
    })
    
    if (pagesRef.current) {
      pagesRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  const books: Book[] = [
    { color: '#E53E3E', position: [-0.6, -0.3, 0], rotation: [0, 0.1, 0], thickness: 0.3 },
    { color: '#3182CE', position: [0, -0.1, -0.1], rotation: [0, 0, 0], thickness: 0.35 },
    { color: '#38A169', position: [0.6, -0.2, 0.1], rotation: [0, -0.1, 0], thickness: 0.25 },
    { color: '#D69E2E', position: [-0.2, 0.2, 0.2], rotation: [0, 0.2, 0], thickness: 0.4 },
    { color: '#9F7AEA', position: [0.3, 0.3, -0.2], rotation: [0, -0.15, 0], thickness: 0.3 }
  ]

  return (
    <group ref={booksRef}>
      {/* Stack of Books */}
      {books.map((book, index) => (
        <group key={index}>
          {/* Book Cover */}
          <mesh
            position={book.position}
            rotation={book.rotation}
            ref={(ref) => {
              if (ref) bookRefs.current[index] = ref
            }}
          >
            <boxGeometry args={[0.8, book.thickness, 1.2]} />
            <meshStandardMaterial 
              color={book.color} 
              roughness={0.4}
              metalness={0.1}
              emissive={book.color}
              emissiveIntensity={0.05}
            />
          </mesh>
          
          {/* Book Spine */}
          <mesh position={[book.position[0] - 0.4, book.position[1], book.position[2]]} rotation={book.rotation}>
            <boxGeometry args={[0.05, book.thickness, 1.2]} />
            <meshStandardMaterial 
              color={new THREE.Color(book.color).multiplyScalar(0.7)} 
              roughness={0.6}
            />
          </mesh>
          
          {/* Book Pages */}
          <mesh position={[book.position[0] + 0.35, book.position[1], book.position[2]]} rotation={book.rotation}>
            <boxGeometry args={[0.1, book.thickness - 0.05, 1.15]} />
            <meshStandardMaterial 
              color="#F7FAFC" 
              roughness={0.8}
            />
          </mesh>
        </group>
      ))}
      
      {/* Floating Knowledge Particles */}
      <group ref={pagesRef}>
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const radius = 1.8
          const height = Math.sin(angle * 2) * 0.5
          return (
            <mesh key={i} position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}>
              <boxGeometry args={[0.1, 0.15, 0.05]} />
              <meshStandardMaterial 
                color="#F7FAFC" 
                roughness={0.3}
                emissive="#FEB2B2"
                emissiveIntensity={0.3}
              />
            </mesh>
          )
        })}
      </group>
      
      {/* Open Book */}
      <group position={[0, 0.8, 0]} rotation={[-0.3, 0, 0]}>
        {/* Left Page */}
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.7, 0.02, 1]} />
          <meshStandardMaterial 
            color="#F7FAFC" 
            roughness={0.6}
          />
        </mesh>
        
        {/* Right Page */}
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.7, 0.02, 1]} />
          <meshStandardMaterial 
            color="#F7FAFC" 
            roughness={0.6}
          />
        </mesh>
        
        {/* Book Spine/Binding */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1]} />
          <meshStandardMaterial 
            color="#2D3748" 
            roughness={0.7}
          />
        </mesh>
        
        {/* Text Lines on Pages */}
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={`line-${i}`} position={[
            -0.4 + (i % 2) * 0.8,
            0.02,
            -0.3 + (Math.floor(i / 2) * 0.15)
          ]}>
            <boxGeometry args={[0.5, 0.01, 0.02]} />
            <meshStandardMaterial 
              color="#4A5568" 
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>
      
      {/* Glowing Wisdom Orbs */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 2.2
        return (
          <mesh key={`orb-${i}`} position={[
            Math.cos(angle) * radius,
            Math.sin(angle * 1.5) * 0.8 + 0.5,
            Math.sin(angle) * radius
          ]}>
            <sphereGeometry args={[0.06]} />
            <meshStandardMaterial 
              color="#FBD38D" 
              emissive="#FBD38D"
              emissiveIntensity={0.8}
            />
          </mesh>
        )
      })}
      
      {/* Bookmark */}
      <mesh position={[0.3, 0.1, 0.6]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.02]} />
        <meshStandardMaterial 
          color="#E53E3E" 
          roughness={0.3}
          emissive="#E53E3E"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}

export default BooksEmoji3D