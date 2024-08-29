"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(2).max(50),
  password: z.string().min(2, "Password must be at least 2 characters").max(50),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    //TODO Hacer algo con los valores del formulario
    console.log(values);
  }

  return (
    <div className="w-full mx-auto min-h-screen flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center p-4">
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
            Introduzca su correo electrónico y contraseña para acceder a su
            cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico </FormLabel>
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
                Log in
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
