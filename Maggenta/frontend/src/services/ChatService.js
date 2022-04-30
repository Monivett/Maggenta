import { axiosBase as axios } from "./Config";

export const GetChats = async (Preceiver, Psender) => {
     
    try {
        const response = await axios.get(`/Chat/${Preceiver}/${Psender}`);
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

