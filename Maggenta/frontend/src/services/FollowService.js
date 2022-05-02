import { axiosBase as axios } from "./Config";

//Checar si el usuario actual ya sigue al artitsta
export const IsFollow = async (follow, follower) => {
    try {
        const response = await axios.get(`/Seguir/${follow}/${follower}`);
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

//Mostrar los seguidores del usuario
export const UserFollowers = async (user) => {
    try {
        const response = await axios.get(`/Seguir/${user}`);
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

//Mostrar los seguidores del usuario
export const UserFollows = async (user) => {
    try {
        const response = await axios.get(`/Usuario/seguidores/${user}`);
        if (response.status = 200) {
            return response.data;
        }

        console.log("Seguidos" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}