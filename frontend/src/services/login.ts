import axios, { AxiosResponse } from "axios";
import { signin, auth_user } from "@/lib/interfaces";

const baseUrl="http://localhost:3001/api/login";


const login=async (newObject: signin): Promise<auth_user> => {
    const request: Promise<AxiosResponse<auth_user>>=axios.post(baseUrl, newObject);
    const res=await request;
    return res.data;
};


// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
