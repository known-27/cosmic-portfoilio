'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Book } from 'lucide-react'
import { useState } from 'react'

const blogPosts = [
  { id: 1, title: 'The Future of Web Development', date: '2023-06-15', excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' },
  { id: 2, title: 'Mastering React Hooks', date: '2023-06-10', excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' },
  { id: 3, title: 'Building Scalable APIs with GraphQL', date: '2023-06-05', excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' },
  { id: 4, title: 'The Art of Clean Code', date: '2023-05-30', excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' },
]

const BlogPostCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const maxLength = 150 // Characters to show when collapsed

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const displayText = isExpanded ? post.excerpt : `${post.excerpt.slice(0, maxLength)}${post.excerpt.length > maxLength ? '...' : ''}`

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative border border-green-500 rounded-lg shadow-lg p-6 transition-transform duration-300"
      style={{
        background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(34, 34, 34, 0.8))',
      }}
    >
      <h2 className="text-xl font-bold mb-2 text-green-400">{post.title}</h2>
      <p className="text-sm text-gray-400 mb-4">{post.date}</p>
      <motion.div className="text-gray-200">
        <p>{displayText}</p>
      </motion.div>
      {post.excerpt.length > maxLength && (
        <button 
          onClick={toggleExpand}
          className="mt-4 px-4 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors duration-300"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </motion.div>
  )
}

export default function Blog() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-start py-16 px-6"
    >
      <h1 className="text-3xl md:text-5xl font-extrabold mb-12 text-gray-800">
        Blog Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12"
      >
        <Link href="/" className="px-6 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition-all duration-300">
          <Book className="w-5 h-5 inline mr-2" />
          Return to Cosmic Hub
        </Link>
      </motion.div>
    </motion.div>
  )
}
