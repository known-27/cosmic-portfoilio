'use client'

import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend, ThreeEvent } from '@react-three/fiber'
import { Sphere, Text, Ring, OrbitControls as DreiOrbitControls } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

extend({ OrbitControls })

interface PlanetProps {
  color: string
  label: string
  onClick: () => void
  ringColor?: string
  orbitRadius: number
  orbitSpeed: number
  position: [number, number, number]
  scale?: number
}

const createPlanetTexture = (color: string, spots: number = 0, spotColor: string = '#ffffff') => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')!
  context.fillStyle = color
  context.fillRect(0, 0, 256, 256)

  for (let i = 0; i < spots; i++) {
    context.fillStyle = spotColor
    context.beginPath()
    context.arc(
      Math.random() * 256,
      Math.random() * 256,
      Math.random() * 10 + 2,
      0,
      2 * Math.PI
    )
    context.fill()
  }

  return new THREE.CanvasTexture(canvas)
}

const Planet: React.FC<PlanetProps> = ({ color, label, onClick, ringColor, orbitSpeed, position, scale = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!) // Reference for the text
  const [, setHover] = useState(false)
  const groupRef = useRef<THREE.Group>(null!)
  
  const texture = useMemo(() => {
    if (label === 'About') return createPlanetTexture('#4287f5', 100, '#ffffff')
    if (label === 'Projects') return createPlanetTexture('#ff4500', 50, '#8B4513')
    if (label === 'Skills') return createPlanetTexture('#F4C542', 0)
    if (label === 'Contact') return createPlanetTexture('#F79E4D', 200, '#8B4513')
    if (label === 'Blog') return createPlanetTexture('#50C878', 150, '#228B22')
    return createPlanetTexture(color)
  }, [color, label])

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.2
    groupRef.current.rotation.y += delta * orbitSpeed
    
    // Ensure the label always faces the camera
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <group ref={groupRef}>
      <group position={position} scale={scale}>
        <Sphere
          args={[0.8, 64, 64]}
          ref={mesh}
          onClick={handleClick}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <meshStandardMaterial
            map={texture}
            metalness={0.4}
            roughness={0.7}
          />
        </Sphere>
        {ringColor && (
          <Ring
            args={[0.9, 1.1, 64]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial color={ringColor} side={THREE.DoubleSide} transparent opacity={0.7} />
          </Ring>
        )}
        <Text
          ref={textRef} // Attach reference to the Text component
          position={[0, -1.2, 0]}
          color="white"
          fontSize={0.3}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </group>
  )
}


const Sun: React.FC<{ onClick: () => void; scale: number }> = ({ onClick, scale }) => {
  const sunRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!) // Reference for the label
  const [, setHovered] = useState(false)

  const fragmentShader = `
    uniform vec3 colorA;
    uniform vec3 colorB;
    varying vec2 vUv;

    void main() {
      float intensity = 1.0 - length(vUv - 0.5) * 2.0;
      vec3 color = mix(colorB, colorA, intensity);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const uniforms = useMemo(
    () => ({
      colorA: { value: new THREE.Color('#FDB813') }, // Bright yellow
      colorB: { value: new THREE.Color('#FF4500') }, // Deep orange
    }),
    []
  );

  useFrame((state, delta) => {
    sunRef.current.rotation.y += delta * 0.1

    // Ensure the label always faces the camera
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick();
  };  

  return (
    <group scale={scale}>
      <Sphere
        args={[1.5, 64, 64]}
        ref={sunRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </Sphere>
      <Text
        ref={textRef} // Attach reference to the Text component
        position={[0, -2, 0]}
        color="white"
        fontSize={0.3}
        maxWidth={2}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
      >
        Arts
      </Text>
    </group>
  );
};



const CameraControls = () => {
  return (
    <DreiOrbitControls 
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.5}
      enableZoom={false}
    />
  )
}

interface SolarSystemProps {
  onNavigate: (path: string) => void;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ onNavigate }) => {
  const { camera } = useThree()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    return () => {
      window.removeEventListener('resize', checkIsDesktop)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const zoomToPlanet = useCallback((position: [number, number, number], path: string) => {
    if (isAnimating) return

    setIsAnimating(true)
    const startPosition = camera.position.clone()
    const endPosition = new THREE.Vector3(...position).normalize().multiplyScalar(3)
    const duration = 800 
    const startTime = Date.now()

    setTimeout(() => {
      onNavigate(path)
    }, duration * 0.6)

    function animate() {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      camera.position.lerpVectors(startPosition, endPosition, progress)
      camera.lookAt(new THREE.Vector3(...position))
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }
    
    animate()
  }, [camera, onNavigate, isAnimating])

  const baseScale = isDesktop ? 2 : 1.8
  const sunScale = isDesktop ? 2.5 : 2

  return (
    <>
      <CameraControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Planet 
        color="#4287f5"
        label="About" 
        onClick={() => zoomToPlanet([8, 0, 0], '/about')} 
        orbitRadius={8}
        orbitSpeed={0.5}
        position={[8, 0, 0]}
        scale={baseScale}
      />
      <Planet 
        color="#ff4500"
        label="Projects" 
        onClick={() => zoomToPlanet([14, 0, 0], '/projects')} 
        orbitRadius={14}
        orbitSpeed={0.3}
        position={[14, 0, 0]}
        scale={baseScale}
      />
      <Planet 
        color="#F4C542"
        label="Skills" 
        onClick={() => zoomToPlanet([20, 0, 0], '/skills')} 
        ringColor="#A49B72"
        orbitRadius={20}
        orbitSpeed={0.2}
        position={[20, 0, 0]}
        scale={baseScale}
      />
      <Planet 
        color="#F79E4D"
        label="Contact" 
        onClick={() => zoomToPlanet([26, 0, 0], '/contact')} 
        orbitRadius={26}
        orbitSpeed={0.1}
        position={[26, 0, 0]}
        scale={baseScale}
      />
      <Planet 
        color="#50C878"
        label="Blog" 
        onClick={() => zoomToPlanet([32, 0, 0], '/blog')} 
        orbitRadius={32}
        orbitSpeed={0.08}
        position={[32, 0, 0]}
        scale={baseScale}
      />
      <Sun onClick={() => zoomToPlanet([0, 0, 0], '/arts')} scale={sunScale} />
    </>
  )
}

export default function Navigation3D() {
  const router = useRouter()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
      <Canvas camera={{ 
        position: isDesktop ? [0, 35, 45] : [0, 25, 35],
        fov: isDesktop ? 60 : 70
      }}>
        <SolarSystem onNavigate={handleNavigate} />
      </Canvas>
    </div>
  )
}