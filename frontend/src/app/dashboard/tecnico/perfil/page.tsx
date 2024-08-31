"use client";
import PerfilTarget from "@/components/PerfilTarget";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
export default function Page() {
  const { userData, renderUserData, setRenderUserData, isAuthenticated } =
    useAuth();

  useEffect(() => {
    setRenderUserData(!renderUserData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userData || !isAuthenticated) return <div className="text-center text-3xl">Cargando...</div>;

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
