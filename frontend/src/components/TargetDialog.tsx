import React, { ReactNode } from "react";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface TargetDialogProps {
  ticketNumber: string | number;
  ticketDescipcion: string;
  ticketEstado: string;
  children: ReactNode;
}

function TargetDialog({
  ticketNumber,
  ticketDescipcion,
  ticketEstado,
  children,
}: TargetDialogProps) {
  return (
    <div className="relative w-full h-16 my-2">
      <Dialog>
        <DialogTrigger className="absolute w-full bg-slate-500/5 hover:bg-slate-500/10 border-solid border-l-4 border-purple-500 hover:border-purple-800 h-16 rounded-sm">
          <div className="flex flex-col p-1 items-start gap-2">
            <div className="flex justify-between w-full">
              <p className="text-xs lg:text-sm">
                <span className="font-semibold text-purple-800">Ticket #:</span>{" "}
                {ticketNumber}
              </p>
              <Badge
                className="flex justify-center text-[8px] lg:text-xs bg-orange-600/90 hover:bg-orange-600/90"
                variant="default"
              >
                {ticketEstado}
              </Badge>
            </div>
            <p className="w-full text-xs md:text-sm flex truncate">
              {ticketDescipcion}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}

export default TargetDialog;
