"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { formations } from "@/util/data"
import { RegisterDialog } from "../../components/register-dialog"
import { Navbar } from "../../components/Navbar"
import { Footer } from "../../components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, PhoneIcon, ClockIcon } from 'lucide-react'

export default function FormationPage() {
  const { id } = useParams()
  const formation = formations.find((c) => c.id === id)

  if (!formation) {
    return <div>Collaboration not found</div>
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="relative p-0">
              {formation.photo && (
                <Image
                  src={formation.photo}
                  alt={formation.name}
                  width={1200}
                  height={400}
                  className="w-full h-80 object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <CardTitle className="text-4xl font-bold text-white mb-2">
                  {formation.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary" className="text-lg py-1 px-3">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDate(formation.startDate)} - {formatDate(formation.endDate)}
                </Badge>
                <Badge variant="destructive" className="text-lg py-1 px-3">
                  {formation.price} DA
                </Badge>
              </div>

              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">{formation.remarks}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoCard
                  icon={<MapPinIcon className="h-5 w-5" />}
                  title="Adresse"
                  content={formation.address}
                />
                <InfoCard
                  icon={<PhoneIcon className="h-5 w-5" />}
                  title="Téléphone"
                  content={
                    <>
                      {formation.phone1}
                      {formation.phone2 && (
                        <>
                          <br />
                          {formation.phone2}
                        </>
                      )}
                    </>
                  }
                />
                {formation.numberOfDays && (
                  <InfoCard
                    icon={<CalendarIcon className="h-5 w-5" />}
                    title="Nombre de jours"
                    content={formation.numberOfDays.toString()}
                  />
                )}
                {formation.numberOfHours && (
                  <InfoCard
                    icon={<ClockIcon className="h-5 w-5" />}
                    title="Nombre d'heures"
                    content={formation.numberOfHours.toString()}
                  />
                )}
                {formation.numberOfSessions && (
                  <InfoCard
                    icon={<CalendarIcon className="h-5 w-5" />}
                    title="Nombre de séances"
                    content={formation.numberOfSessions.toString()}
                  />
                )}
                {formation.sessionDuration && (
                  <InfoCard
                    icon={<ClockIcon className="h-5 w-5" />}
                    title="Durée de la séance"
                    content={`${formation.sessionDuration} heures`}
                  />
                )}
              </div>

              {formation.isRegistrationAllowed && (
                <div className="mt-8">
                  <RegisterDialog />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

function InfoCard({ icon, title, content }: { icon: React.ReactNode; title: string; content: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="flex items-center p-4">
        <div className="mr-4 text-primary">{icon}</div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{content}</p>
        </div>
      </CardContent>
    </Card>
  )
}

