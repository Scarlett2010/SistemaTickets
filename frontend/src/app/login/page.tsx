"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";

import loginService from "@/services/login";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { auth_user } from "@/lib/interfaces";

const formSchema = z.object({
  email: z
    .string()
    .email("Dirección de correo electrónico no válida")
    .min(2)
    .max(50),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rol: z.enum(["tecnico", "cliente"], "Seleccione un rol"),
});

export default function LoginPage() {
  const [error, setError] = React.useState<string | null>(null);
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rol: "cliente",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res: auth_user = await loginService.login(values);
      console.log("res", res);
      login(res);
    } catch (err: any) {
      setError(
        err?.response?.data?.msg ||
          "Ha ocurrido un error durante el inicio de sesión"
      );
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }

  return (
    <div className="w-full mx-auto min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
      <Card className="w-full max-w-md bg-black/60 backdrop-blur-sm text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">
            <div className="flex align-middle items-center justify-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={150}
                height={50}
                className="rounded-sm mb-5 bg-slate-300"
              />
            </div>
            Iniciar sesión
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Introduzca su correo electrónico, contraseña y seleccione su rol
            para acceder a su cuenta
          </CardDescription>
          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="rol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="text-black bg-white rounded px-3 py-2"
                      >
                        <option value="tecnico">Técnico</option>
                        <option value="cliente">Cliente</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="correo@example.com"
                        {...field}
                        type="email"
                        className="text-white/90 bg-black/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="**************"
                        {...field}
                        type="password"
                        className="text-white bg-black/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-300">
            ¿No tiene una cuenta? Póngase en contacto con su administrador
          </p>
          <Link
            href="/"
            className="text-sm text-blue-800 ml-2 hover:underline hover:text-blue-500"
          >
            Volver a la página principal
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
