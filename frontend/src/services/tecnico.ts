import { _id } from "@/lib/interfaces";
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
axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
const getUnique=async (id: _id) => {
    const req=await axios.get(`${baseUrl}/descripcionTecnico/${id}`);
    const res=req.data;
    return res;
}
const getAllClients=async (id: _id) => {
    const req=await axios.get(`${baseUrl}/ticketsporTecnico/${id}`);
    const res=req.data;
    return res;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getUnique, getAllClients }