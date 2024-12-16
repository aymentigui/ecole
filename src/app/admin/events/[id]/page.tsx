import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { collaborations } from '@/util/data'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, PhoneIcon, ClockIcon, BuildingIcon, EuroIcon, InfoIcon } from 'lucide-react'

export default async function EventPage({ params }: { params: { id: string } }) {
  const collaboration = collaborations.find((c) => c.id === params.id)

  if (!collaboration) {
    notFound()
  }

  const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number | undefined }) => {
    if (value === undefined) return null;
    return (
      <div className="flex items-center space-x-2">
        {icon}
        <span className="font-semibold">{label}:</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{collaboration.name}</CardTitle>
          {collaboration.company && (
            <Badge variant="secondary" className="text-lg">
              <BuildingIcon className="w-4 h-4 mr-1" />
              {collaboration.company}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {collaboration.photo && (
              <Image
                src={collaboration.photo}
                alt={collaboration.name}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-64 mb-4"
              />
            )}
            <Card>
              <CardContent className="space-y-4 pt-6">
                {collaboration.startDate && collaboration.endDate && (
                  <InfoItem
                    icon={<CalendarIcon className="w-5 h-5 text-blue-500" />}
                    label="Dates"
                    value={`${format(collaboration.startDate, 'dd MMMM yyyy', { locale: fr })} - ${format(collaboration.endDate, 'dd MMMM yyyy', { locale: fr })}`}
                  />
                )}
                <InfoItem
                  icon={<EuroIcon className="w-5 h-5 text-green-500" />}
                  label="Prix"
                  value={collaboration.price !== undefined ? `${collaboration.price} €` : undefined}
                />
                <InfoItem
                  icon={<MapPinIcon className="w-5 h-5 text-red-500" />}
                  label="Adresse"
                  value={collaboration.address}
                />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <InfoItem
                  icon={<PhoneIcon className="w-5 h-5 text-indigo-500" />}
                  label="Téléphone 1"
                  value={collaboration.phone1}
                />
                <InfoItem
                  icon={<PhoneIcon className="w-5 h-5 text-indigo-500" />}
                  label="Téléphone 2"
                  value={collaboration.phone2}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Détails de l'événement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <InfoItem
                  icon={<CalendarIcon className="w-5 h-5 text-orange-500" />}
                  label="Nombre de jours"
                  value={collaboration.numberOfDays}
                />
                <InfoItem
                  icon={<ClockIcon className="w-5 h-5 text-purple-500" />}
                  label="Nombre d'heures"
                  value={collaboration.numberOfHours}
                />
                <InfoItem
                  icon={<CalendarIcon className="w-5 h-5 text-orange-500" />}
                  label="Nombre de séances"
                  value={collaboration.numberOfSessions}
                />
                <InfoItem
                  icon={<ClockIcon className="w-5 h-5 text-purple-500" />}
                  label="Durée de chaque séance"
                  value={collaboration.sessionDuration ? `${collaboration.sessionDuration} heures` : undefined}
                />
              </CardContent>
            </Card>
            {collaboration.remarks && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Remarques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-2">
                    <InfoIcon className="w-5 h-5 text-yellow-500 mt-1" />
                    <p className="text-gray-600">{collaboration.remarks}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
