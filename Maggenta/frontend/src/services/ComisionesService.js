import { axiosBase as axios } from "./Config";


//Muestra publicaciones por id de usuario
export const GetComisionByUserID = async (id) => {
    
    try {
        
        const response = await axios.get(`/Precio`);  ///Precio/${id}
        if (response.status = 200) {
            return response.data;
        }

        console.log("Precio" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}