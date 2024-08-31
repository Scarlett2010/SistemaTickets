import { perfil_target } from "@/lib/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function PerfilTarget({
  nombre,
  apellido,
  cedula,
  fecha_nacimiento,
  genero,
  ciudad,
  direccion,
  telefono,
  email,
}: perfil_target) {
  return (
    <div className="w-full  grid text-center md:grid-cols-2 md:text-start text-2xl">
      <Avatar className="flex items-center justify-center">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="Your profile picture"
          className="rounded-full max-w-20"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p>
          <span className="font-bold text-blue-900">Nombre:</span> {nombre}{" "}
          {apellido}
        </p>
        <p>
          <span className="font-bold text-blue-900">Email:</span> {email}
        </p>
        <p>
          <span className="font-bold text-blue-900">Ciudad:</span> {ciudad}
        </p>
        <p>
          <span className="font-bold text-blue-900">Dirección:</span>{" "}
          {direccion}
        </p>
        <p>
          <span className="font-bold text-blue-900">Teléfono:</span> {telefono}
        </p>
        <p>
          <span className="font-bold text-blue-900">Cédula:</span> {cedula}
        </p>
        <p>
          <span className="font-bold text-blue-900">Género:</span> {genero}
        </p>
        <p>
          <span className="font-bold text-blue-900">Fecha de nacimiento:</span>{" "}
          {fecha_nacimiento}
        </p>
      </div>
    </div>
  );
}
export default PerfilTarget;
