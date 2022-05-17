import { axiosBase as axios } from "./Config";

//Muestra usuario con id
export const GetComisionId = async (id) => {
    try {
        const response = await axios.get(`/Precio/${id}`);
        if (response.status = 200) {
            return response.data;
        }

        console.log("Comision" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}