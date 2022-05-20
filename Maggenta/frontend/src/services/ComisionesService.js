import { axiosBase as axios } from "./Config";


//Muestra las comisiones por id 
export const GetComisionId = async (id) => {
    
    try {
        
        const response = await axios.get(`Precio/${id}`);  ///Precio/${id}
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


//Muestra las comisiones por id de usuario
export const GetComisionByUserID = async (id) => {
    
    try {
        
        const response = await axios.get(`Precio/usuario/${id}`);  ///Precio/${id}
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

//Muestra las comisiones que te han pedido
export const GetPedidosByUserID = async (id) => {
    
    try {
        
        const response = await axios.get(`Comision/${id}`); 
        if (response.status = 200) {
            return response.data;
        }

        console.log("Pedido" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}

//Muestra las comisiones que tu has pedido
export const GetMisPedidosByUserID = async (id) => {
    
    try {
        
        const response = await axios.get(`Price/pedido/${id}`); 
        if (response.status = 200) {
            return response.data;
        }

        console.log("Pedido" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}

//Muestra si te han pedido esta comisión en especifico
export const UserHasComision = async (user, id) => {
    
    try {
        
        const response = await axios.get(`Comision/${user}/${id}`); 
        if (response.status = 200) {
            return response.data;
        }

        console.log("Pedido" + response.data);
    }
    catch (err) {
        console.log(err);
        return (err);
    }
}