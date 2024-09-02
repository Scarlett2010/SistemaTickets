import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { user_card } from "../lib/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Separator } from "@radix-ui/react-menubar";
function TicketCard({
  title,
  status,
  email,
  name,
  creationDate,
  UserMessage,
}: user_card) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{status}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" flex flex-col gap-3">
            <div className="flex gap-x-3">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Your profile picture"
                  className="rounded-full max-w-10"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{name}</div>
                <div className="text-sm text-muted-foreground">{email}</div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-sm text-muted-foreground h-20 overflow-hidden line-clamp-3 ">
            <p>{UserMessage}</p>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">{creationDate}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
export default TicketCard;
