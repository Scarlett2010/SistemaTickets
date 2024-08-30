//? ***** Services
export interface signin {
  email: string;
  password: string;
}
export interface auth_user {
  token: string;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: number;
  _id: string;
  email: string;
  rol: string;
}

//? ***** Props 
export interface user_card {
  title: string;
  status: string;
  email: string;
  name: string;
  creationDate: string;
  UserMessage: string;
}
export interface ticket_card_dialog {
  title: string;
  status: string;
  email: string;
  name: string;
  creationDate: string;
  UserMessage: string;
}