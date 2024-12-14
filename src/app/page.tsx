"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from './(public)/components/Navbar'
import { Footer } from './(public)/components/Footer'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { useMediaQuery } from '@mui/material';

const slides = [
  { image: '/slide1.png', text: 'Excellence académique' },
  { image: '/slide2.png', text: 'Innovation pédagogique' },
  { image: '/slide3.png', text: 'Accompagnement personnalisé' },
]

const collaborations = [
  { image: '/formation.png', name: 'TechCorp', description: 'Partenariat pour des stages en entreprise' },
  { image: '/logo.png', name: 'EduSoft', description: 'Développement de logiciels éducatifs' },
  { image: '/formation.png', name: 'FormaPro', description: 'Échanges d\'expertise en formation professionnelle' },
  { image: '/logo.png', name: 'EduSoft1', description: 'Développement de logiciels éducatifs' },
  { image: '/formation.png', name: 'EduSoft2', description: 'Développement de logiciels éducatifs' },
]

const formations = [
  { image: '/formation.png', name: 'Développement Web', dateDebut: '01/09/2023', dateFin: '31/12/2023', prix: '3500', description: 'Formation complète en développement web front-end et back-end' },
  { image: '/logo.png', name: 'Data Science', dateDebut: '15/10/2023', dateFin: '15/03/2024', prix: '4500', description: 'Maîtrisez l\'analyse de données et le machine learning' },
  { image: '/formation.png', name: 'UX/UI', dateDebut: '01/11/2023', dateFin: '28/02/2024', prix: '3000', description: 'Apprenez à créer des interfaces utilisateur intuitives et esthétiques' },
  { image: '/logo.png', name: 'Design UX/UI', dateDebut: '01/11/2023', dateFin: '28/02/2024', prix: '3000', description: 'Apprenez à créer des interfaces utilisateur intuitives et esthétiques' },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentIndexCollaboration, setCurrentIndexCollaboration] = useState(0);
  const [currentIndexFormation, setCurrentIndexFormation] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    const interval = setInterval(() => {
      handleNextCollaboration();
      handleNextFormation();
    }, 3000);
    return () => {
      clearInterval(timer);
      clearInterval(interval);
    }
  }, [currentIndexCollaboration,currentIndexFormation])

  const handleNextCollaboration = () => {
    setCurrentIndexCollaboration((prevIndex) => (prevIndex + 1) % collaborations.length);
  };

  // Fonction pour aller au slide précédent
  const handlePrevCollaboration = () => {
    setCurrentIndexCollaboration((prevIndex) =>
      prevIndex === 0 ? collaborations.length - 1 : prevIndex - 1
    );
  };

  const handleNextFormation = () => {
    setCurrentIndexFormation((prevIndex) => (prevIndex + 1) % formations.length);
  };

  // Fonction pour aller au slide précédent
  const handlePrevFormation = () => {
    setCurrentIndexFormation((prevIndex) =>
      prevIndex === 0 ? formations.length - 1 : prevIndex - 1
    );
  };

  const getVisibleItemsCollaborations = () => {
    if (isSmallScreen) {
      return [collaborations[currentIndexCollaboration],];
    }

    return [
      collaborations[currentIndexCollaboration],
      collaborations[(currentIndexCollaboration + 1) % collaborations.length],
      collaborations[(currentIndexCollaboration + 2) % collaborations.length],
    ];
  };

  const getVisibleItemsFormations = () => {

    if (isSmallScreen) {
      return [formations[currentIndexFormation]];
    }

    return [
      formations[currentIndexFormation],
      formations[(currentIndexFormation + 1) % formations.length],
      formations[(currentIndexFormation + 2) % formations.length],
    ];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image src={slide.image} alt={slide.text} quality={50}  layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">{slide.text}</h1>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Collaborations Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Nos dernières collaborations</h2>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatePresence>
                  {getVisibleItemsCollaborations().map((collab, index) => (
                    <motion.div
                      key={index}
                      className="bg-white flex flex-col items-center rounded-lg shadow-md overflow-hidden"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={collab.image}
                        quality={50}
                        alt={collab.name}
                        width={400}
                        height={200}
                        objectFit="cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-xl mb-2">{collab.name}</h3>
                        <p>{collab.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Boutons pour navigation */}
              <button
                onClick={handlePrevCollaboration}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={handleNextCollaboration}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
       </section>

        {/* Formations Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Nos formations récentes</h2>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatePresence>
                  {getVisibleItemsFormations().map((formation, index) => (
                    <motion.div
                      key={index}
                      className="bg-white flex flex-col items-center rounded-lg shadow-md overflow-hidden"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={formation.image}
                        quality={50}
                        alt={formation.name}
                        width={400}
                        height={200}
                        objectFit="cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-xl mb-2">{formation.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Du {formation.dateDebut} au {formation.dateFin}
                        </p>
                        <p className="font-bold text-lg mb-2">{formation.prix+".00 DA"}</p>
                        <p>{formation.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Boutons pour navigation */}
              <button
                onClick={handlePrevFormation}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={handleNextFormation}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">À propos de notre école</h2>
            <p className="text-lg text-center mb-8">
              {`Notre école de formation s'engage à fournir une éducation de qualité depuis plus de 20 ans. 
              Nous nous efforçons de préparer nos étudiants aux défis du monde professionnel en leur offrant 
              des formations innovantes et adaptées aux besoins du marché.`}
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Contactez-nous</h2>
            <form className="space-y-4">
              <Input type="text" placeholder="Nom" />
              <Input type="email" placeholder="Email" />
              <Textarea placeholder="Message" />
              <Button type="submit" className="w-full">Envoyer</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

