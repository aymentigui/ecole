"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, Trash2, User } from 'lucide-react'
import { format } from 'date-fns'

// Simulons des données d'événements
const events = [
  { id: 1, name: "Conférence Tech", startDate: new Date(2023, 11, 1), endDate: new Date(2023, 11, 3), company: "TechCorp",prix: 12000},
  { id: 2, name: "Conférence Tech", startDate: new Date(2024, 11, 1), endDate: new Date(2024, 11, 22), company: "TechCorp" ,prix: 13222},
  { id: 3, name: "Séminaire Marketing", startDate: new Date(2025, 2, 15), endDate: new Date(2025, 2, 17), company: "MarketPro",prix: 1000 },
  // ... ajoutez plus d'événements ici
]

export default function EventsPage() {
  const currentDate = new Date()

  return (
    <div className="container px-2 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link href="/admin/events/add">
          <Button>Ajouter Event</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead>Société</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.slice(0, 20).map((event) => (
            <TableRow 
              key={event.id}
              className={
                event.endDate < currentDate
                  ? 'bg-red-100'
                  : event.startDate > currentDate
                  ? 'bg-green-100'
                  : 'bg-slate-50'
              }
            >
              <TableCell>{event.name}</TableCell>
              <TableCell>{format(event.startDate, 'dd/MM/yyyy')}</TableCell>
              <TableCell>{format(event.endDate, 'dd/MM/yyyy')}</TableCell>
              <TableCell>{event.company}</TableCell>
              <TableCell>{event.prix}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/events/view/${event.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/events/edit/${event.id}`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
                        // Logique de suppression ici
                        console.log('Événement supprimé:', event.id)
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Link href={`/admin/events/client/${event.id}`}>
                    <Button variant="ghost" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination placeholder */}
      <div className="mt-4 flex justify-center">
        <Button variant="outline" className="mx-1">Précédent</Button>
        <Button variant="outline" className="mx-1">1</Button>
        <Button variant="outline" className="mx-1">2</Button>
        <Button variant="outline" className="mx-1">3</Button>
        <Button variant="outline" className="mx-1">Suivant</Button>
      </div>
    </div>
  )
}

