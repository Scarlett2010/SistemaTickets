import React from "react";
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
import {
  useForm,
  FieldValues,
  SubmitHandler,
  DefaultValues,
  Path,
} from "react-hook-form";
import { z, ZodSchema } from "zod";
import { Button } from "@/components/ui/button";
import { _id } from "@/lib/interfaces"; // Asegúrate de importar la interfaz _id

interface CommentBoxProps<T extends FieldValues> {
  fields: Array<{
    name: keyof T;
    label: string;
    description?: string;
  }>;
  dirigido: string;
  btnText: string;
  formSchema: ZodSchema<T>;
  onSubmit: (values: T, thisId: _id) => void; // Modificado para incluir thisId
  defaultValues?: DefaultValues<T>;
  thisId: _id; // Nuevo prop para thisId
}

const CommentBox = <T extends FieldValues>({
  fields,
  dirigido,
  btnText,
  formSchema,
  onSubmit,
  defaultValues,
  thisId, // Añadido thisId a los props
}: CommentBoxProps<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit: SubmitHandler<T> = (values) => {
    onSubmit(values, thisId); // Pasamos thisId junto con los valores del formulario
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={field.name as string}
            control={form.control}
            name={field.name as Path<T>}
            render={({ field: formField }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <textarea
                    className="h-20 sm:h-32 md:h-52 p-3 border border-gray-300 rounded-md"
                    {...formField}
                  />
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <p>Este mensaje será dirigido al {dirigido}</p>
        <Button type="submit" className="w-full mt-4">
          {btnText}
        </Button>
      </form>
    </Form>
  );
};

export default CommentBox;
