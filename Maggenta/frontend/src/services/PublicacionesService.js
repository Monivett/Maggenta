import { axiosBase as axios } from "./Config";


//Muestra publicaciones por id de usuario
export const GetPostByUserID = async (id) => {
    
    try {
        
        const response = await axios.get(`/Publicacion`);  ///usuario/${id}
        if (response.status = 200) {
            return response.data;
        }

        console.log("Publicacion" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}