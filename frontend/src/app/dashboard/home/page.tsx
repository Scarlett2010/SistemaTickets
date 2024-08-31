import Image from "next/image";
export default function Page() {
  return (
    <div className="flex items-center justify-center gap gap-x-5">
      <h1 className="text-4xl">Bienvenido a Ticket Plus</h1>
      <Image
        width={50}
        height={50}
        src="/favicon.ico"
        alt="Página no encontrada"
      />
    </div>
  );
}
