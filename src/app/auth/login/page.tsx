
"use client"
import { useState, useTransition } from 'react';
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { LoginSchema } from '@/util/schema/user';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { login } from '@/actions/login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  const handleSubmit = async (data: any) => {
    login(data)
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">Connexion</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-4">
            {/* Champ Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Entrez votre email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            {/* Champ Mot de passe */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            {/* Bouton de soumission */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Chargement..." : "Se connecter"}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
}