import { axiosBase as axios } from "./Config";

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

export const Login = async (Pmail, Ppassword) => {
     
    try {
        const response = await axios.get(`/Usuario/${Pmail}/${Ppassword}`);
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

export const GetEmail = async (Pmail) => {
    try {
        const response = await axios.get(`/Usuario/${Pmail}`);
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