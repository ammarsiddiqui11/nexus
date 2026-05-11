import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const ParticleField = () => {
  const ref = useRef()
  const count = 2500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.04
    ref.current.rotation.x = Math.sin(t * 0.02) * 0.1
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

const FloatingGrid = () => {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = -Math.PI / 2.5
    ref.current.position.y = -2 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
  })

  return (
    <mesh ref={ref} position={[0, -2, 0]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial
        color="#00d4ff"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  )
}

const GlowingSphere = () => {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.position.x = Math.sin(t * 0.4) * 3
    ref.current.position.y = Math.cos(t * 0.3) * 1.5
    ref.current.scale.setScalar(1 + Math.sin(t) * 0.1)
  })

  return (
    <mesh ref={ref} position={[3, 0, -3]}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshBasicMaterial
        color="#0066ff"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

const HeroScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingGrid />
        <GlowingSphere />
      </Canvas>
    </div>
  )
}

export default HeroScene
