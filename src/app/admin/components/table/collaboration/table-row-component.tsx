"use client";

import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, User, Phone } from "lucide-react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";

interface TableRowComponentProps {
  event: any;
}

export default function TableRowComponent({ event }: TableRowComponentProps) {
  return (
    <TableRow
      className={
        event.endDate < new Date()
          ? "bg-red-50 hover:bg-red-100"
          : event.startDate > new Date()
          ? "bg-green-50 hover:bg-green-100"
          : "hover:bg-slate-50"
      }
    >
      <TableCell className="font-medium">{event.name}</TableCell>
      <TableCell>{event.company}</TableCell>
      <TableCell>{format(event.startDate, "dd/MM/yyyy")}</TableCell>
      <TableCell>{format(event.endDate, "dd/MM/yyyy")}</TableCell>
      <TableCell>{event.price.toLocaleString("fr-FR")} DA</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div>
                  <Phone className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{event.phone1}</p>
                {event.phone2 && <p>{event.phone2}</p>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Autres Tooltips */}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Link href={`/admin/events/${event.id}`}>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/admin/events/${event.id}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
                console.log("Événement supprimé:", event.id);
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          {event.isRegistrationAllowed && (
            <Link href={`/admin/events/client/${event.id}`}>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
