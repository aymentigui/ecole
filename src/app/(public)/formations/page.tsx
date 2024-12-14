"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from "framer-motion";

const formations = [
  { 
    image: '/formation.png', 
    name: 'Développement Web', 
    dateDebut: '01/09/2023', 
    dateFin: '31/12/2023', 
    prix: '3500', 
    description: 'Formation complète en développement web front-end et back-end, couvrant HTML, CSS, JavaScript, React, Node.js, et les bases de données.' 
  },
  { 
    image: '/formation.png', 
    name: 'Data Science', 
    dateDebut: '15/10/2023', 
    dateFin: '15/03/2024', 
    prix: '4500', 
    description: 'Maîtrisez l\'analyse de données et le machine learning avec Python, R, et les outils de visualisation de données.' 
  },
  { 
    image: '/formation.png', 
    name: 'Design UX/UI', 
    dateDebut: '01/11/2023', 
    dateFin: '28/02/2024', 
    prix: '3000', 
    description: 'Apprenez à créer des interfaces utilisateur intuitives et esthétiques, en utilisant des outils comme Figma et Adobe XD.' 
  },
  { 
    image: '/formation.png', 
    name: 'Intelligence Artificielle', 
    dateDebut: '01/02/2024', 
    dateFin: '30/06/2024', 
    prix: '5000', 
    description: 'Plongez dans le monde de l\'IA en apprenant les concepts fondamentaux, le deep learning, et les applications pratiques.' 
  },
  { 
    image: '/formation.png', 
    name: 'Cybersécurité', 
    dateDebut: '15/03/2024', 
    dateFin: '15/08/2024', 
    prix: '4000', 
    description: 'Formez-vous aux meilleures pratiques de sécurité informatique, à la détection des menaces et à la protection des systèmes.' 
  },
];

export default function Formations() {
  const [search, setSearch] = useState('');

  const filteredFormations = formations.filter((formation) =>
    formation.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
        <main className="flex-grow py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">Nos formations</h1>
            <div className="mb-8 flex justify-center">
              <input
                type="text"
                placeholder="Recherchez une formation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFormations.map((formation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Image
                    src={formation.image}
                    alt={formation.name}
                    width={400}
                    height={200}
                    objectFit="cover"
                    className="transition-opacity duration-300 hover:opacity-90"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-xl mb-2">{formation.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Du {formation.dateDebut} au {formation.dateFin}</p>
                    <p className="font-bold text-lg mb-2">{formation.prix+".00 DA"}</p>
                    <p className="text-gray-700">{formation.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredFormations.length === 0 && (
              <p className="text-center text-gray-500 mt-8">Aucune formation ne correspond à votre recherche.</p>
            )}
          </div>
        </main>
      <Footer />
    </div>
  );
}
