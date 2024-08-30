import React from "react";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500">
      <div className="w-1/3">
        <Image
          width={300}
          height={300}
          src="/page_not_found.svg"
          alt="Página no encontrada"
          className="mt-4 w-full"
        />
      </div>
      <p className="text-white text-xs sm:text-base md:text-lg lg:text-3xl mt-5">
        Página no encontrada
      </p>
    </div>
  );
};

export default NotFoundPage;
