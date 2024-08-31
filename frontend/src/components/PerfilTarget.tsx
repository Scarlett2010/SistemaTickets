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
    <div>
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="Your profile picture"
          className="rounded-full max-w-10"
        />
        <AvatarFallback>CN</AvatarFallback>
        <div className="text-center space-y-1">
          <p>
            {nombre} {apellido}
          </p>
          <p>{cedula}</p>
          <p>{fecha_nacimiento}</p>
          <p>{genero}</p>
          <p>{ciudad}</p>
          <p>{direccion}</p>
          <p>{telefono}</p>
          <p>{email}</p>
        </div>
      </Avatar>
    </div>
  );
}
export default PerfilTarget;
