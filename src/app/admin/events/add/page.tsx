'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { eventSchema } from '@/util/schema/events'
import { Image as ImageLucide } from 'lucide-react'
import Image from 'next/image';

type EventFormValues = z.infer<typeof eventSchema>

export default function AddEventPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: '',
      photo: '',
      startDate: new Date(),
      endDate: new Date(),
      company: '',
      price: 0,
      address: '',
      phone1: '',
      phone2: '',
      numberOfDays: 1,
      numberOfHours: undefined,
      numberOfSessions: undefined,
      sessionDuration: undefined,
      remarks: '',
    },
  })

  async function onSubmit(data: EventFormValues) {
    setIsSubmitting(true)
    try {
      console.log(data)
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Événement ajouté avec succès !')
      form.reset()
      setPreviewImage(null)
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement:', error)
      alert('Une erreur est survenue lors de l\'ajout de l\'événement.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        form.setValue('photo', reader.result as string) // Stocker l'image dans le formulaire
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container px-2 py-10">
      <h1 className="text-3xl font-bold mb-6">Ajouter un événement</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Nom de l'événement"}</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de l'événement" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="space-y-4">
            <FormLabel>{"Photo de l'événement"}</FormLabel>
            <div className="flex items-center gap-4">
              {previewImage && (
                <div className="w-32 h-32 border rounded-lg overflow-hidden flex"> 
                  <Image src={previewImage} alt="Prévisualisation" className="h-full object-contain" />
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-32 h-32 border rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
                <span className="text-gray-500"><ImageLucide /></span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de fin</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Société</FormLabel>
                    <FormControl>
                    <Input placeholder="Nom de la société" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="0" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="Adresse de l'événement" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone 1</FormLabel>
                  <FormControl>
                    <Input placeholder="0556772333" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone 2 (optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="0556772333" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
                control={form.control}
                name="numberOfDays"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Nombre de jours</FormLabel>
                    <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="numberOfHours"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>{"Nombre d'heures (optionnel)"}</FormLabel>
                    <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value, 10) : undefined)} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="numberOfSessions"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Nombre de séances (optionnel)</FormLabel>
                    <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value, 10) : undefined)} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
           </div>
           <FormField
                control={form.control}
                name="sessionDuration"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Durée de chaque séance en heures (optionnel)</FormLabel>
                    <FormControl>
                    <Input type="number" step="0.5" {...field} onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarques (optionnel)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Remarques supplémentaires" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter l\'événement'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
