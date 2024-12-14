"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, Trash2, User } from 'lucide-react'
import { format } from 'date-fns'

// Simulons des données d'événements
const formations = [
  { id: 1, name: "Conférence Tech", startDate: new Date(2023, 11, 1), endDate: new Date(2023, 11, 3), company: "TechCorp",prix: 12000},
  { id: 2, name: "Conférence Tech", startDate: new Date(2024, 11, 1), endDate: new Date(2024, 11, 22), company: "TechCorp" ,prix: 13222},
  { id: 3, name: "Séminaire Marketing", startDate: new Date(2025, 2, 15), endDate: new Date(2025, 2, 17), company: "MarketPro",prix: 1000 },
  // ... ajoutez plus d'événements ici
]

export default function FormationPage() {
  const currentDate = new Date()

  return (
    <div className="container px-2 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Formations</h1>
        <Link href="/admin/events/event">
          <Button>Ajouter Formation</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formations.slice(0, 20).map((formation) => (
            <TableRow 
              key={formation.id}
              className={
                formation.endDate < currentDate
                  ? 'bg-red-100'
                  : formation.startDate > currentDate
                  ? 'bg-green-100'
                  : 'bg-slate-50'
              }
            >
              <TableCell>{formation.name}</TableCell>
              <TableCell>{format(formation.startDate, 'dd/MM/yyyy')}</TableCell>
              <TableCell>{format(formation.endDate, 'dd/MM/yyyy')}</TableCell>
              <TableCell>{formation.prix}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/events/view/${formation.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/events/edit/${formation.id}`}>
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
                        console.log('Événement supprimé:', formation.id)
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Link href={`/admin/events/client/${formation.id}`}>
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

