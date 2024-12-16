"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { formations } from "@/util/data"
import { FormationCard } from "../components/formation-card"

export function FormationsContent() {
  const [search, setSearch] = useState("")

  const filteredFormations = formations.filter((formation) =>
    formation.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <Input
          type="text"
          placeholder="Recherchez une Collaboration..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFormations.map((formation, index) => (
          <motion.div
            key={formation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <FormationCard formation={formation} />
          </motion.div>
        ))}
      </div>
      {filteredFormations.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Aucune collaborations ne correspond à votre recherche.
        </p>
      )}
    </div>
  )
}

