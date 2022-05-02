import { axiosBase as axios } from "./Config";

//Muestra todas las categorías
export const Getall = async () => {
    try {
        const response = await axios.get('/Categoria');
        if (response.status = 200) {
            return response.data;
        }

        console.log("Categorias" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}