"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from "framer-motion";

const collaborations = [
  { 
    image: '/formation.png', 
    compagne: 'TechCorp', 
    name: 'Formation en technologies émergentes', 
    description: 'Partenariat pour des stages en entreprise et des projets de recherche conjoints dans le domaine des technologies émergentes.', 
    dateDebut: '2024-01-01', 
    dateFin: '2024-12-31', 
    prix: 10000 
  },
  { 
    image: '/formation.png',  
    compagne: 'EduSoft', 
    name: 'Développement de logiciels éducatifs', 
    description: 'Collaboration pour le développement de logiciels éducatifs innovants et l\'intégration de nouvelles technologies dans nos programmes de formation.', 
    dateDebut: '2024-02-01', 
    dateFin: '2024-11-30', 
    prix: 12000 
  },
  { 
    image: '/formation.png', 
    compagne: 'FormaPro', 
    name: 'Formation professionnelle adaptée', 
    description: 'Échanges d\'expertise en formation professionnelle et co-création de programmes de formation adaptés aux besoins du marché du travail.', 
    dateDebut: '2024-03-01', 
    dateFin: '2024-10-31', 
    prix: 9000 
  },
  { 
    image: '/formation.png', 
    compagne: 'InnovLab', 
    name: 'Projets innovants en laboratoire', 
    description: 'Partenariat pour l\'accès à des équipements de pointe et la réalisation de projets innovants dans un environnement de laboratoire.', 
    dateDebut: '2024-04-01', 
    dateFin: '2024-09-30', 
    prix: 15000 
  },
  { 
    image: '/formation.png', 
    compagne: 'GlobalEdu', 
    name: 'Échanges internationaux éducatifs', 
    description: 'Collaboration internationale pour des échanges d\'étudiants et de professeurs, offrant une expérience multiculturelle enrichissante.', 
    dateDebut: '2024-05-01', 
    dateFin: '2024-08-31', 
    prix: 13000 
  },
];


export default function Collaborations() {
  const [search, setSearch] = useState('');

  const filteredCollaborations = collaborations.filter((collaboration) =>
    collaboration.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-8">Nos collaborations</h1>
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Recherchez une Collaboration..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollaborations.map((collaboration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="bg-white flex flex-col items-center rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Image
                  src={collaboration.image}
                  alt={collaboration.compagne}
                  width={400}
                  height={200}
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-90"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-xl mb-2">{collaboration.name}</h3>
                  <p className="text-gray-500 text-sm italic mb-2">Compagne : {collaboration.compagne}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Du {collaboration.dateDebut} au {collaboration.dateFin}
                  </p>
                  <p className="font-bold text-lg text-gray-800 mb-2">{collaboration.prix} DA</p>
                  <p className="text-gray-700 mb-2">{collaboration.description}</p>
                </div>
              </motion.div>
            ))}
          </div>


          {filteredCollaborations.length === 0 && (
            <p className="text-center text-gray-500 mt-8">Aucune collaborations ne correspond à votre recherche.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
