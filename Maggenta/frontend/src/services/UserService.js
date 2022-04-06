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