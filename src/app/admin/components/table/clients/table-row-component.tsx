"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { formations } from "@/util/data";
import { collaborations } from "@/util/data";
import { Inscription } from "@/util/types";

interface TableRowComponentProps {
  inscription: Inscription
}

export default function TableRowComponent({ inscription }: TableRowComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [status, setStatus] = useState(inscription.status);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  // Récupérer le nom de la formation ou collaboration
  const entityName =
    inscription.entityType === "formation"
      ? formations.find((f) => f.id === inscription.entityId)?.name || "Non trouvé"
      : collaborations.find((c) => c.id === inscription.entityId)?.name || "Non trouvé";

  const companyName =
    inscription.entityType === "collaboration"
      ? collaborations.find((c) => c.id === inscription.entityId)?.company || "Non spécifié"
      : null;

  return (
    <>
      <TableRow
      className={
        inscription.status === "cancelled"
          ? "bg-red-50 hover:bg-red-100"
          : inscription.status === "confirmed"
          ? "bg-green-50 hover:bg-green-100"
          : "hover:bg-slate-50"
      }>
        <TableCell className="font-medium">{inscription.user.lastName}</TableCell>
        <TableCell>{inscription.user.firstName}</TableCell>
        <TableCell>{inscription.user.email}</TableCell>
        <TableCell>{format(inscription.dateInscription, "dd/MM/yyyy")}</TableCell>
        <TableCell>{entityName}</TableCell>
        <TableCell>
          <div className="flex space-x-2">
            {/* Select pour modifier le statut */}
            <select
              value={status}
              /* @ts-ignore*/
              onChange={(e) => {  inscription.status=e.target.value;setStatus(e.target.value)}}
              className="border p-1 rounded"
            >
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmé</option>
              <option value="cancelled">Annulé</option>
            </select>

            {/* Bouton Voir */}
            <Button variant="ghost" size="icon" onClick={handleOpenDialog}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {/* Dialog avec toutes les informations */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Informations de l'inscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              <strong>Nom : </strong>
              {inscription.user.lastName}
            </p>
            <p>
              <strong>Prénom : </strong>
              {inscription.user.firstName}
            </p>
            <p>
              <strong>Email : </strong>
              {inscription.user.email}
            </p>
            <p>
              <strong>Date d'inscription : </strong>
              {format(inscription.dateInscription, "dd/MM/yyyy")}
            </p>
            <p>
              <strong>Type : </strong>
              {inscription.entityType === "formation" ? "Formation" : "Collaboration"}
            </p>
            <p>
              <strong>Nom : </strong>
              {entityName}
            </p>
            {companyName && (
              <p>
                <strong>Entreprise : </strong>
                {companyName}
              </p>
            )}
            <p>
              <strong>Statut : </strong>
              {status}
            </p>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={handleCloseDialog}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
