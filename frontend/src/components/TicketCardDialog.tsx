"use client";
import TicketCard from "@/components/TicketCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ticket_card_dialog } from "@/lib/interfaces";
import CommentBox from "./CommentBox";

function TicketCardDialog({
  title,
  status,
  email,
  name,
  creationDate,
  UserMessage,
}: ticket_card_dialog) {
  return (
    <Dialog>
      <div className="relative">
        <DialogTrigger className="absolute w-full h-full hover:bg-blue-500/10 rounded-xl"></DialogTrigger>
        <TicketCard
          title={title}
          status={status}
          email={email}
          name={name}
          creationDate={creationDate}
          UserMessage={UserMessage}
        />
        <DialogContent className="h-[90vh] !w-full !overflow-y-scroll overflow-x-hidden">
          <DialogHeader className="text-sm">
            <div className="flex gap-x-3 items-center">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Your profile picture"
                  className="rounded-full max-w-30"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-3xl">{name}</DialogTitle>
                <div className="text-sm text-muted-foreground">{email}</div>
              </div>
            </div>
            <br />
            {UserMessage}
            <div className="pt-10">
              <CommentBox />
            </div>
          </DialogHeader>
          <DialogFooter className="text-sm">
            <DialogClose onClick={() => console.log("finalizar")}>
              finalizar ticket
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
export default TicketCardDialog;
