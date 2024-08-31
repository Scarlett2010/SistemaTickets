import {
  ReactNode
} from "react";

//? ***** Services
export interface signin {
  email: string;
  password: string;
}

//? ***** AuthContext
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
export interface user_data {
  _id: string;
  nombre: string;
  apellido: string;
  cedula: number;
  fecha_nacimiento: string;
  genero: string;
  ciudad: string;
  direccion: string;
  telefono: number;
  email: string;
  password: string;
  token: string;
  tickets: string[];
  __v: number;
}
export interface decoded_token {
  iat: number;
  exp: number;
  id: string;
  rol: string;
}
export interface auth_context_type {
  isAuthenticated: boolean;
  login: (object: auth_user) => Promise<void>;
  logout: () => void;
  userData: user_data|null;
  token: string|null;
}
export interface auth_provider_props {
  children: ReactNode;
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
export interface perfil_target {
  nombre?: string;
  apellido?: string;
  cedula?: number;
  fecha_nacimiento?: string;
  genero?: string;
  ciudad?: string;
  direccion?: string;
  telefono?: number;
  email?: string
}