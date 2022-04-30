import { axiosBase as axios } from "./Config";

//Muestra todos los usuarios
export const Getall = async () => {
    try {
        const response = await axios.get('/Usuario');
        if (response.status = 200) {
            return response.data;
        }

        console.log("Usuarios" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}
//Muestra usuario con id
export const GetUserId = async (id) => {
    try {
        const response = await axios.get(`/Usuario/id/${id}`);
        if (response.status = 200) {
            return response.data;
        }

        console.log("Usuarios" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}
//Busqueda por username
export const GetUsername = async (username) => {
    try {
        const response = await axios.get(`/Usuario/username/${username}`);
        if (response.status = 200) {
            return response.data;
        }

        console.log("Usuarios" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}
//Login
export const Login = async (Pmail, Ppassword) => {
     
    try {
        const response = await axios.get(`/Usuario/login/${Pmail}/${Ppassword}`);
        if (response.status = 200) {
            return response.data;
        }

        console.log("Login" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}
//Buscar todos los correos
export const GetEmail = async (Pmail) => {
    try {
        const response = await axios.get(`/Usuario/correo/${Pmail}`);
        if (response.status = 200) {
            return response.data;
        }

        console.log("Usuarios" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}