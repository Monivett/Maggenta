//import { Login } from '../services/UserService';
import { axiosBase as axios } from "../services/Config";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const navigate = useNavigate();


    const [user, setUser] = useState(null);

    const login = async (Pmail, Ppassword) => {

        try {
            const response = await axios.get(`/Usuario/${Pmail}/${Ppassword}`);
            if (response.status = 200) {

                if (response.data[0] !== undefined) {
                    const userData = response.data[0];
                    setUser({ userData });
                    alert('Has iniciado sesión correctamente');
                    navigate("/");
                }else{
                    alert('Datos incorrectos');
                }
                return response.data;
            }
            console.log("Login" + response.data);
        }
        catch (err) {
            console.log(err);
            return (err);
        }

    }
    const logout = () => setUser(null);

    const contextvalue = {
        user,
        login,
        logout
    };
    return <AuthContext.Provider value={contextvalue}>{children}</AuthContext.Provider>
}