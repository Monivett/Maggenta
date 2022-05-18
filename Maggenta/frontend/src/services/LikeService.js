import { axiosBase as axios } from "./Config";

//Checar si el usuario actual ya sigue al artitsta
export const IsLiked = async (userId, postId) => {
    try {
        const response = await axios.get(`/Like/user/${userId}/${postId}`);
        if (response.status = 200) {
            return response.data;
        }

        console.log("Seguidor" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}

//Mostrar la cantidad de Likes de la publicación
export const LikesNumber = async (post) => {
    try {
        const response = await axios.get(`/Like/${post}`);
        if (response.status = 200) {
            return response.data;
        }

        console.log("Seguidores" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}

