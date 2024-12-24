'use client'

import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export function useTextures() {
  const earthTexture = useLoader(TextureLoader, '/assets/earth_texture.jpg')
  const marsTexture = useLoader(TextureLoader, '/assets/mars_texture.jpg')
  const saturnTexture = useLoader(TextureLoader, '/assets/saturn_texture.jpg')
  const jupiterTexture = useLoader(TextureLoader, '/assets/jupiter_texture.jpg')

  return { earthTexture, marsTexture, saturnTexture, jupiterTexture }
}

