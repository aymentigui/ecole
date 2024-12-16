import { z } from "zod";

export const formationSchema = z.object({
  name: z.string().min(1, "Le nom de la formation est requis"),
  photo: z.string().url("L'URL de la photo doit être valide").optional(),
  startDate: z.coerce.date({ required_error: "La date de début est requise" }),
  endDate: z.coerce.date({ required_error: "La date de fin est requise" }),
  price: z.number().min(0, "Le prix doit être positif ou nul"),
  address: z.string().min(1, "L'adresse est requise"),
  phone1: z.string().regex(/^\+?[0-9]{10,14}$/, "Le numéro de téléphone 1 doit être valide"),
  phone2: z.string().regex(/^\+?[0-9]{10,14}$/, "Le numéro de téléphone 2 doit être valide").optional(),
  numberOfDays: z.number().int().positive("Le nombre de jours doit être positif").optional(),
  numberOfHours: z.number().int().positive("Le nombre d'heures doit être positif").optional(),
  numberOfSessions: z.number().int().positive("Le nombre de séances doit être positif").optional(),
  sessionDuration: z.number().positive("La durée de la séance doit être positive").optional(),
  remarks: z.string().optional(),
  isRegistrationAllowed: z.boolean().optional(),
}).refine(data => data.endDate >= data.startDate, {
  message: "La date de fin doit être postérieure ou égale à la date de début",
  path: ["endDate"],
});
