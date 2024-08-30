import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";

const formSchema = z.object({
  message: z.string().min(1, "El cámpo es obligatorio"),
});

function CommentBox() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    //TODO Hacer algo con los valores del formulario
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Responde a este ticket:</FormLabel>
              <FormControl>
                <textarea
                  typeof="text"
                  className="h-20 sm:h-32 md:h-52 p-3 border-solid border-2 border-gray-300"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Esta respuesta le llegará al usuario
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar respuesta</Button>
      </form>
    </Form>
  );
}
export default CommentBox;
