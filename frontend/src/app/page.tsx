import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRightIcon,
  RocketIcon,
  LockClosedIcon,
  ClockIcon,
} from "@radix-ui/react-icons";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center">{icon}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col items-center justify-center p-4">
      <main className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">
          Bienvenido a Ticket Plus
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          Agilice su proceso de asistencia con nuestro eficaz sistema de gestión
          de tickets
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            icon={<RocketIcon className="h-8 w-8 text-blue-500 " />}
            title="Fácil creación de billetes"
            description="Cree y gestione rápidamente tickets de soporte"
          />
          <FeatureCard
            icon={<LockClosedIcon className="h-8 w-8 text-green-500 " />}
            title="Acceso seguro"
            description="Conéctese de forma segura para acceder a sus entradas"
          />
          <FeatureCard
            icon={<ClockIcon className="h-8 w-8 text-purple-500 " />}
            title="Actualizaciones en tiempo real"
            description="Obtenga actualizaciones instantáneas sobre el estado de su billete"
          />
        </div>

        <Button
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Link href="/login" className="flex items-center hover:underline">
            Acceder a su cuenta
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </main>

      <footer className="mt-16 text-white">
        © {new Date().getFullYear()} Ticket Plus. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Home;
