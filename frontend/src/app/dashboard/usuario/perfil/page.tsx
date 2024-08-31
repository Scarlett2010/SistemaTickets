"use client";
import PerfilTarget from "@/components/PerfilTarget";
import { useAuth } from "@/context/AuthContext";
export default function Page() {
  const { userData } = useAuth();
  return (
    <>
      <PerfilTarget
        nombre={userData?.nombre}
        apellido={userData?.apellido}
        cedula={userData?.cedula}
        fecha_nacimiento={userData?.fecha_nacimiento}
        genero={userData?.genero}
        ciudad={userData?.ciudad}
        direccion={userData?.direccion}
        telefono={userData?.telefono}
        email={userData?.email}
      />
    </>
  );
}
