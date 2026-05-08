import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Track() {
  const points = useMemo(() => [
    new THREE.Vector3(-12, 0, -2),
    new THREE.Vector3(-6, 0, 1),
    new THREE.Vector3(0, 0, 1.5),
    new THREE.Vector3(6, 0, -0.5),
    new THREE.Vector3(12, 0, 2),
  ], [])

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  const geo = useMemo(() => new THREE.TubeGeometry(curve, 200, 0.04, 8, false), [curve])

  return (
    <mesh geometry={geo}>
      <meshStandardMaterial color="#9a7840" metalness={0.9} roughness={0.2} />
    </mesh>
  )
}

function MovingLoco() {
  const ref = useRef()
  const tRef = useRef(0)

  const points = useMemo(() => [
    new THREE.Vector3(-12, 0.15, -2),
    new THREE.Vector3(-6, 0.15, 1),
    new THREE.Vector3(0, 0.15, 1.5),
    new THREE.Vector3(6, 0.15, -0.5),
    new THREE.Vector3(12, 0.15, 2),
  ], [])

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])

  useFrame((_, delta) => {
    tRef.current = (tRef.current + delta * 0.04) % 1
    const pos = curve.getPoint(tRef.current)
    const tan = curve.getTangent(tRef.current)
    if (ref.current) {
      ref.current.position.copy(pos)
      ref.current.lookAt(pos.clone().add(tan))
    }
  })

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.2, 0.4, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} emissive="#e8c070" emissiveIntensity={0.05} />
      </mesh>
      <pointLight position={[0.7, 0, 0]} intensity={2} color="#e8c070" distance={3} />
      <mesh position={[-0.3, 0.3, 0]}>
        <boxGeometry args={[0.35, 0.25, 0.38]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.5} />
      </mesh>
    </group>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
      <planeGeometry args={[60, 30]} />
      <meshStandardMaterial color="#080808" roughness={1} />
    </mesh>
  )
}

function SmokeParticles() {
  const ref = useRef()
  const count = 120
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 0.5
      arr[i * 3 + 1] = Math.random() * 3
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5
    }
    return arr
  }, [])

  const speeds = useMemo(() => Array.from({ length: count }, () => 0.003 + Math.random() * 0.006), [])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i]
      if (pos[i * 3 + 1] > 3) pos[i * 3 + 1] = 0
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#444" size={0.08} transparent opacity={0.5} />
    </points>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 4, 10], fov: 45 }}
      gl={{ antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#e8c070" />
      <directionalLight position={[-8, 4, -4]} intensity={0.2} color="#4040aa" />

      <Stars radius={80} depth={50} count={4000} factor={3} saturation={0} fade speed={0.8} />
      <fog attach="fog" args={['#080808', 12, 35]} />

      <Ground />
      <Track />
      <MovingLoco />
      <SmokeParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2.5}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
  )
}
