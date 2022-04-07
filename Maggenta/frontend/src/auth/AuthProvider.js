import { Children, createContext, useState } from "react";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const login = () => {





        setUser({ id: 1 })
    }
    const logout = () => setUser(null)
    const contextvalue = {
        user,
        login,
        logout
    };
    return <AuthContext.Provider value={contextvalue}>{children}</AuthContext.Provider>
}