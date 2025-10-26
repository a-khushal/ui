import { motion } from 'motion/react'
import { useState } from 'react'

function BookCover({ title, author, image }: {
  title: string;
  author: string;
  image: string;
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative h-65 w-40"
      style={{ perspective: '800px' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gray-200 rounded-xs shadow-lg z-10 flex flex-col items-center justify-center cursor-pointer p-2"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          x: isOpen ? 4 : 0,
          z: isOpen ? 4 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 90,
        }}
      >
        <h1 className="ml-1 text-black font-black text-sm text-center leading-tight mb-1">
          {title}
        </h1>
        <p className="text-gray-500 font-medium text-xs text-center">
          {author}
        </p>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-xs cursor-pointer z-30 flex"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        animate={{ rotateY: isOpen ? -76 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 90,
        }}
      >
        <div
          className="h-full w-2 rounded-l-xs"
          style={{
            background: 'transparent',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.4), inset 1px 0 1px rgba(255,255,255,0.2)',
            borderRight: '1px solid rgba(0,0,0,0.15)'
          }}
        />

        <div
          className="absolute bottom-0 left-0 w-full h-1/4 rounded-b-xs pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.12), rgba(255,255,255,0))',
            zIndex: 40,
          }}
        />
      </motion.div>

    </div>
  )
}

function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex justify-center items-center gap-5 px-15 py-20 border border-gray-600/30 rounded-3xl">
        <BookCover
          title="Metamorphosis"
          author="Franz Kafka"
          image="/src/assets/kafka.jpeg"
        />
        <BookCover
          title="1984"
          author="George Orwell"
          image="/src/assets/orwell.jpeg"
        />
        <BookCover
          title="Anti-fragile"
          author="Nassim Taleb"
          image="/src/assets/taleb.jpeg"
        />
      </div>
    </div>
  )
}

export default App
