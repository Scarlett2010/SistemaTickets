import axios from "axios";
const baseUrl="http://localhost:3001/api/";

const getUnique=async (id: string) => {
    const req=await axios.get(`${baseUrl}/descripcionCliente/${id}`);
    const res=req.data;
    return res;
}

export default { getUnique }