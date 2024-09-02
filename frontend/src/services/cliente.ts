import { _id, ticket, ticket_update } from "@/lib/interfaces";
import axios from "axios";
import { getCookie } from "cookies-next";
const baseUrl=process.env.NEXT_PUBLIC_API_BASE;
const token=getCookie('authToken');
if (token) {
    axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
    console.log('Token found');
} else {
    console.warn('No token found');
}

const getUnique=async (id: _id) => {
    const req=await axios.get(`${baseUrl}/descripcionCliente/${id}`);
    const res=req.data;
    return res;
}
const getMyTickets=async (id: _id) => {
    const req=await axios.get(`${baseUrl}/ticketsporCliente/${id}`);
    const res=req.data;
    return res;
}
const getAllTecnicos=async () => {
    const req=await axios.get(`${baseUrl}/listarTecnicos`);
    const res=req.data;
    return res;
}

const createTicket=async (newObject: { descripcion: string; cliente: _id; tecnico: _id, respuesta: string }) => {
    const req=await axios.post(`${baseUrl}/ticket/registro`, newObject);
    const res=req.data;
    return res;
}

const getUniqueTicket=async (id: _id) => {
    const req=await axios.get(`${baseUrl}/ticket/${id}`);
    const res=req.data;
    return res;
}

const updateTicket=async (id: _id, newObject: ticket_update) => {
    const req=await axios.put(`${baseUrl}/actualizarTicket/${id}`, newObject);
    const res=req.data;
    return res;
}

const deleteTicket=async (id: _id) => {
    const req=await axios.delete(`${baseUrl}/eliminarTicket/${id}`);
    const res=req.data;
    return res;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getUnique, getMyTickets, getAllTecnicos, createTicket, getUniqueTicket, updateTicket, deleteTicket }