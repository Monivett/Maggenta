import { axiosBase as axios } from "./Config";

export const GetAll = async () => {
    
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
//Muestra publicaciones por id de usuario
export const GetPostByUserID = async (id) => {
    
    try {
        
        const response = await axios.get(`/Publicacion/usuario/${id}`);  ///usuario/${id}
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

//getOnePublicacion

export const getOnePublicacion = async (id) => {
    
    try {
        
        const response = await axios.get(`/Publicacion/${id}`);  
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

//Muestra publicaciones por categoría
export const GetPostByCategory = async (id) => {
    
    try {
        
        const response = await axios.get(`/Publicacion/category/${id}`); 
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

export const GetComentario = async (idPost) => {
     
    try {
        const response = await axios.get(`/Comentario/${idPost}`);
        if (response.status = 200) {
            return response.data;
        }

        console.log(response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}