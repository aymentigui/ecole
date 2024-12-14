"use client"

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contactez-nous
          </motion.h1>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">Informations de contact</h2>
              <p className="mb-2">Téléphone: +33 1 23 45 67 89</p>
              <p className="mb-2">Email: contact@ecole-formation.fr</p>
              <p className="mb-2">Adresse: 123 Rue de la Formation, 75000 Paris</p>
            </div>
            <form className="space-y-4">
              <Input type="text" placeholder="Nom" />
              <Input type="email" placeholder="Email" />
              <Textarea placeholder="Message" />
              <Button type="submit" className="w-full">Envoyer</Button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

