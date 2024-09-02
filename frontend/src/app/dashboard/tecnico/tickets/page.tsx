import TicketCardDialog from "@/components/TicketCardDialog";

export default function Page() {
  return (
    <div className="gap gap-5 grid lg:grid-cols-3 ">
      <TicketCardDialog
        title="Ticket 1"
        status="Pendiente"
        email="lI8R5@example.com"
        name="David Vela"
        creationDate="2022-01-01"
        UserMessage="lorem ipsum dolor sit amet consectetur adipiscing elit"
      >
        técnico responde el ticket de un usuario
      </TicketCardDialog>
    </div>
  );
}
