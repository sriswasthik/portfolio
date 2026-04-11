import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'

function Box() {
  return (
    <Float speed={2} rotationIntensity={1}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#00f0ff" />
      </mesh>
    </Float>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <directionalLight position={[2, 2, 2]} />
      <Box />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}