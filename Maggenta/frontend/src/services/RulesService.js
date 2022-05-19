import { axiosBase as axios } from "./Config";

//Muestra usuario con id
export const GetRules = async (id) => {
    try {
        const response = await axios.get(`/Reglas/${id}`);
        if (response.status = 200) {
            return response.data;
        }

        console.log("Reglas" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}