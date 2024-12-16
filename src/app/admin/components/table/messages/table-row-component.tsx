"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface TableRowComponentProps {
  message: {
    id: string;
    name: string;
    email: string;
    message: string;
    date: Date;
    open: boolean;
  };
}

export default function TableRowComponent({ message }: TableRowComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    message.open=true
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <TableRow
        className={
          !message.open
            ? "bg-red-300 hover:bg-red-100"
            : "hover:bg-slate-50"
        }
      >
        <TableCell className="font-medium">{message.name}</TableCell>
        <TableCell>{message.email}</TableCell>
        <TableCell>{format(message.date, "dd/MM/yyyy")}</TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={handleOpenDialog}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <DialogHeader>
            <h2 className="text-lg font-medium">{message.name}</h2>
          </DialogHeader>
          <p>{message.message}</p>
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
