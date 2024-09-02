"use client";
import { useAuth } from "@/context/AuthContext";
import clienteSevice from "@/services/cliente";
import CommentBox from "@/components/CommentBox";
import { z } from "zod";
import { useEffect, useState } from "react";
import { _id, tecnico, ticket } from "@/lib/interfaces";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import TicketCardDialog from "@/components/TicketCardDialog";
import { Separator } from "@/components/ui/separator";
import TargetDialog from "@/components/TargetDialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const feedbackSchema = z.object({
  descripcion: z.string().min(1, "El mensaje es obligatorio"),
  // Añadir más campos según lo necesaites
});

const formSchema = z.object({
  descripcion: z.string().min(2, {
    message: "descripcion must be at least 2 characters.",
  }),
});

function Page() {
  const [tickets, setTickets] = useState<ticket[]>([]);
  const [tecnicos, setTecnicos] = useState<tecnico[]>([]);
  const [alert, setAlert] = useState<{
    type: string;
    message: string;
    title: string;
  } | null>(null);
  const { id, isAuthenticated, renderUserData, setRenderUserData } = useAuth();
  const getMyTickets = async (thisId: _id) => {
    try {
      const res = await clienteSevice.getMyTickets(thisId);
      console.log(res);
      setTickets(res.tickets);
    } catch (error) {
      console.error(error);
    }
  };
  const getTecnicos = async () => {
    try {
      const res = await clienteSevice.getAllTecnicos();
      // console.log(res);
      setTecnicos(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getMyTickets(id);
      getTecnicos();
    }
    // setRenderUserData(!renderUserData);
  }, [id, renderUserData]);

  const handleFeedbackSubmit = async (
    values: z.infer<typeof feedbackSchema>,
    ticketId: _id
  ) => {
    try {
      await clienteSevice.updateTicket(ticketId, values);
      setAlert({
        type: "success",
        message: "Puede cerrar esta ventana",
        title: "Actualización exitosa",
      });
      setRenderUserData(!renderUserData);
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    } catch (error) {
      setAlert({
        type: "destructive",
        message: "Error al actualizar tu mensaje",
        title: "Error",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descripcion: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>, tecnicoId: _id) {
    try {
      if (id) {
        const newTicket: {
          descripcion: string;
          cliente: _id;
          tecnico: _id;
          respuesta: string;
        } = {
          ...values,
          cliente: id,
          respuesta: " ",
          tecnico: tecnicoId,
        };
        await clienteSevice.createTicket(newTicket);
        setAlert({
          type: "success",
          message: "Puede cerrar esta ventana",
          title:
            "Ticket creado correctamente, debe esperar a que el tecnico responda",
        });
        setRenderUserData(!renderUserData);
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
    } catch (error) {
      setAlert({
        type: "destructive",
        message: "Error al crear el ticket",
        title: "Error",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      console.error(error);
    }
  }

  if (!id && !isAuthenticated) return;

  if (!tickets || !tecnicos) return <div>Cargando...</div>;
  return (
    <div className="flex flex-col md:grid md:grid-cols-2">
      <Card className="col-span-1 p-5 m-2">
        <h1 className="text-3xl mb-4 border-solid border-b-2 border-b-black">
          Crear ticket
        </h1>
        <p>seleciona uno de nuestros técnicos para abrir un nuevo ticket</p>
        <Separator className="my-4" />
        {/* por cada técnico */}

        <ScrollArea className="max-h-[40vh] h-[600px] w-full rounded-md border p-4">
          {tecnicos.map((tecnico) => (
            <div key={tecnico._id.toString()}>
              <TicketCardDialog
                title={"Técnico"}
                status={`Hola, soy ${tecnico.nombre} y me encargaré de resolver tus dudas`}
                email={tecnico.email}
                name={tecnico.nombre}
                creationDate={"haz click para abrir un ticket conmigo"}
                UserMessage={""}
              >
                {/* Formulario para crear un ticket */}
                {alert && (
                  <Alert variant={alert?.type as any} className="mt-5">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>{alert?.title}</AlertTitle>
                    <AlertDescription>{alert?.message}</AlertDescription>
                  </Alert>
                )}
                <Form {...form}>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      form.handleSubmit((values) =>
                        onSubmit(values, tecnico._id)
                      )();
                    }}
                    className="space-y-8"
                  >
                    <input
                      type="hidden"
                      name="tecnico"
                      value={tecnico._id.toString()}
                    />
                    <FormField
                      control={form.control}
                      name="descripcion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Escribe el problema que desesas que nuestro técnico
                            resuelva
                          </FormLabel>
                          <FormControl>
                            <textarea
                              className="w-full border-solid border-2 border-black rounded h-40"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Escribe tu mensaje aquí
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Enviar</Button>
                  </form>
                </Form>
              </TicketCardDialog>
              <Separator className="my-4" />
            </div>
          ))}
        </ScrollArea>
      </Card>
      <Card className="col-span-1 p-5 m-2">
        <h1 className="text-3xl mb-4 border-solid border-b-2 border-b-black">
          Mis tickets
        </h1>
        <ScrollArea className="h-[300px] sm:h-[400px] ">
          {tickets.map((ticket) => (
            <TargetDialog
              key={ticket._id.toString()}
              ticketNumber={ticket._id.toString()}
              ticketDescipcion={ticket.descripcion}
              ticketEstado={ticket.estado}
            >
              <DialogHeader>
                <DialogTitle>Ticket: {ticket._id.toString()}</DialogTitle>
                <div className="pb-2 flex justify-between">
                  <div className="flex flex-col gap-2">
                    <Badge
                      variant="outline"
                      className="border-solid border-2 border-purple-300"
                    >
                      <span className="font-semibold text-purple-900 mr-2">
                        Creado por:
                      </span>{" "}
                      {ticket.cliente.toString()}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-solid border-2 border-purple-300"
                    >
                      <span className="font-semibold text-purple-900 mr-2">
                        Técnico designado:
                      </span>{" "}
                      {ticket.tecnico.toString()}
                    </Badge>
                  </div>
                  <div className=" flex items-center">
                    <Badge className="bg-orange-600 max-h-10">
                      {ticket.estado}
                    </Badge>
                  </div>
                </div>
                <div className="pt-4">
                  {alert && (
                    <Alert variant={alert?.type as any} className="mb-4">
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      <AlertTitle>{alert?.title}</AlertTitle>
                      <AlertDescription>{alert?.message}</AlertDescription>
                    </Alert>
                  )}
                  <CommentBox
                    fields={[
                      {
                        name: "descripcion",
                        label: "Actualiza tu ticket",
                        description: "Actualiza tu mensaje aquí",
                      },
                    ]}
                    dirigido="técnico"
                    btnText="Actualizar"
                    formSchema={feedbackSchema}
                    onSubmit={(values, ticketId) =>
                      handleFeedbackSubmit(values, ticketId)
                    }
                    thisId={ticket._id}
                    defaultValues={ticket}
                  />
                </div>
              </DialogHeader>
            </TargetDialog>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );
}
export default Page;
