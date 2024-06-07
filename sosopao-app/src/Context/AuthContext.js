import { createContext, useState } from "react";
import api from "../api";

const AuthContext = createContext();

function AuthProvider({children}){
    const [authenticated, setAuthenticated] = useState(false);

    async function handleLoginAuthProvider(adminText, senhaText){
        const { data: {token} } = await api.post('/signin', 
            {
                email: adminText,
                senha: senhaText
            }
        );

        console.log(token);
        setAuthenticated(true);
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLoginAuthProvider }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};