import axios, { AxiosResponse } from "axios";
import { signin, auth_user } from "@/lib/interfaces";

const login=async (newObject: signin): Promise<auth_user> => {
    console.log(newObject.rol);

    if (newObject.rol==="tecnico") {
        const request: Promise<AxiosResponse<auth_user>>=axios.post("http://localhost:3001/api/login", newObject)
        const res=await request;
        return res.data;
    }
    if (newObject.rol==="cliente") {
        const request: Promise<AxiosResponse<auth_user>>=axios.post("http://localhost:3001/api/loginCliente", newObject)
        const res=await request;
        return res.data;
    }
    throw new Error(`Invalid rol value: ${newObject.rol}`);
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
