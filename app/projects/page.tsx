'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const CollapsibleText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const needsCollapse = text.length > maxLength;

  const displayText = isExpanded ? text : text.slice(0, maxLength) + (needsCollapse ? '...' : '');

  return (
    <div className="relative">
      <p className="text-base font-mono text-gray-300 mb-2">
        {displayText}
      </p>
      {needsCollapse && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 hover:text-blue-300 text-sm font-mono transition-colors duration-300"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

const projects = [
  { 
    id: 1, 
    title: 'First portfolio', 
    description: 'This is the first portfolio I made when I learned Web Development',
    url: 'https://shinigami.free.nf/?i=1'
  },
  { 
    id: 2, 
    title: 'Ape-x', 
    description: 'Ape-x is a browser extension that detects and blocks phishing websites, alerting users and offering an option to delete any personal data stored by such sites. Built with HTML, CSS, and JavaScript, it enhances web security and privacy.',
    url: 'https://github.com/known-27/Ape-x'
  },
  { 
    id: 3, 
    title: 'Ticket App', 
    description: 'A random project I made in the process of learning App Development with flutter',
    url: 'https://github.com/Pravin272k3/ticket_app'
  },
  { 
    id: 4, 
    title: 'Time Warp CMS', 
    description: 'Content management system that predicts and adapts to future trends automatically.',
    url: '/projects/time-warp-cms'
  },
  { 
    id: 5, 
    title: 'Emotion-Driven UI', 
    description: 'User interface that morphs and responds to the user\'s emotional state in real-time.',
    url: '/projects/emotion-ui'
  },
]

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24"
    >
      <h1 className="text-4xl sm:text-5xl font-black mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
        Futuristic Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-8 sm:mb-12">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: project.id * 0.1 }}
            className="group relative"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="absolute inset-0 border border-white rotate-1 transform transition-transform duration-300 group-hover:rotate-2" />
            <div className="relative bg-black border border-white p-6 h-64 flex flex-col transform transition-all duration-300 hover:-translate-x-2 hover:-translate-y-2">
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-green-400 rounded-full" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full" />
              
              <h2 className="text-xl font-black mb-4 text-white underline decoration-green-400 decoration-2 underline-offset-4">
                {project.title}
              </h2>
              
              <CollapsibleText text={project.description} />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: hoveredProject === project.id ? 1 : 0,
                  y: hoveredProject === project.id ? 0 : 20 
                }}
                className="mt-auto"
              >
                <Link 
                  href={project.url}
                  className="inline-block px-4 py-2 bg-white text-black font-bold border border-white hover:bg-black hover:text-white transition-all duration-300 text-sm"
                >
                  {">> Explore <<"}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      <Link 
        href="/" 
        className="px-6 py-3 bg-white text-black font-bold border border-white hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1"
      >
        Return to Cosmic Hub
      </Link>
    </motion.div>
  )
}