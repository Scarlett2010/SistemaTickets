import axios, { AxiosResponse } from "axios";
import { signin, auth_user } from "@/lib/interfaces";
import { getCookie } from "cookies-next";
const baseUrl=process.env.NEXT_PUBLIC_API_BASE;
const token=getCookie('authToken');
if (token) {
    axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
    console.log('Token found');
} else {
    console.warn('No token found');
}

const login=async (newObject: signin): Promise<auth_user> => {
    console.log(newObject.rol);

    if (newObject.rol==="tecnico") {
        const request: Promise<AxiosResponse<auth_user>>=axios.post(`${baseUrl}/login`, newObject)
        const res=await request;
        return res.data;
    }
    if (newObject.rol==="cliente") {
        const request: Promise<AxiosResponse<auth_user>>=axios.post(`${baseUrl}/loginCliente`, newObject)
        const res=await request;
        return res.data;
    }
    throw new Error(`Invalid rol value: ${newObject.rol}`);
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
