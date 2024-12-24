'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import shinigamiImage from '@/assets/sketches/shinigami.jpg'
import itachiImage from '@/assets/sketches/itachi.jpg'
import grootImage from '@/assets/sketches/groot.jpg'
import captainAmericaImage from '@/assets/sketches/captainAmerica.jpg'
import luffyImage from '@/assets/sketches/luffy.jpg'
import wallEImage from '@/assets/sketches/wallE.webp'
import mizuharaImage from '@/assets/sketches/mizuhara.jpg'
import shawnEdwardImage from '@/assets/sketches/shawnEdward.jpg'
import zoroSanjiImage from '@/assets/sketches/zoroSanji.jpg'
import lisaImage from '@/assets/sketches/lisa.jpg'
import roseImage from '@/assets/sketches/rose.jpg'
import jennieImage from '@/assets/sketches/jennie.jpg'
import jissoImage from '@/assets/sketches/jisso.jpg'
import { Star, Moon, Sun, CompassIcon as Comet, X } from 'lucide-react'
import { useState } from 'react'

const artworks = [
  { 
    id: 1, 
    title: 'Shinigami Ryuk', 
    src: shinigamiImage, 
    icon: Star,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 2, 
    title: 'itachi', 
    src: itachiImage, 
    icon: Moon,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 3, 
    title: 'groot', 
    src: grootImage, 
    icon: Sun,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 4, 
    title: 'Captain America', 
    src: captainAmericaImage, 
    icon: Star,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 5, 
    title: 'luffy', 
    src: luffyImage, 
    icon: Comet,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 6, 
    title: 'wall-E', 
    src: wallEImage, 
    icon: Sun,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 7, 
    title: 'Mizuhara Chizuru', 
    src: mizuharaImage, 
    icon: Star,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 8, 
    title: 'Shawn Edward', 
    src: shawnEdwardImage, 
    icon: Moon,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 9, 
    title: 'zoro-sanji', 
    src: zoroSanjiImage, 
    icon: Comet,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 10, 
    title: 'Lisa', 
    src: lisaImage, 
    icon: X,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 11, 
    title: 'Rose', 
    src: roseImage, 
    icon: X,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 12, 
    title: 'jennie', 
    src: jennieImage, 
    icon: X,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 13, 
    title: 'Jisso', 
    src: jissoImage, 
    icon: X,
    gradient: 'from-purple-600 to-indigo-600'
  },
]

interface ArtworkCardProps {
  artwork: typeof artworks[0]
  onImageClick: () => void
}

const ArtworkCard = ({ artwork, onImageClick }: ArtworkCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/5 rounded-xl overflow-hidden shadow-lg relative backdrop-blur-sm"
    >
      <div className="absolute top-2 right-2 z-10">
        <artwork.icon className="text-yellow-300" size={24} />
      </div>
      <div 
        className="w-full aspect-[4/3] relative cursor-pointer"
        onClick={onImageClick}
      >
        <Image
          src={artwork.src}
          alt={artwork.title}
          fill
          className="object-cover"
        />
      </div>
      <div className={`p-4 bg-gradient-to-r ${artwork.gradient}`}>
        <h2 className="text-xl font-semibold text-white">
          {artwork.title}
        </h2>
      </div>
    </motion.div>
  )
}

const ImageModal = ({ artwork, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 overflow-auto"
      onClick={onClose}
    >
      <motion.button
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
      >
        <X size={32} />
      </motion.button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-full max-h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-w-full max-h-full flex items-center justify-center">
          <Image
            src={artwork.src}
            alt={artwork.title}
            width={800}
            height={400}
            className="max-w-full max-h-screen object-contain rounded-lg"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-2xl font-bold text-white lg:text-3xl">
            {artwork.title}
          </h2>
        </div>
      </motion.div>
    </motion.div>
  );
};


export default function Arts() {
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        ))}
      </div>
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold mb-8 sm:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        My Cosmic Creations
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 w-full max-w-4xl">
        {artworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ArtworkCard 
              artwork={artwork}
              onImageClick={() => setSelectedArtwork(artwork)}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link href="/" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2">
          <Star className="w-5 h-5" />
          <span>Return to Cosmic Hub</span>
        </Link>
      </motion.div>

      <AnimatePresence>
        {selectedArtwork && (
          <ImageModal 
            artwork={selectedArtwork} 
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

