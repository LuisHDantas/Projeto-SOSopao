import { createContext } from "react";
import useAuth from "../Hooks/useAuth";

const AuthContext = createContext();

function AuthProvider({children}){

    const { loading, authenticated, handleLoginAuthProvider, handleLogoutAuthProvider } 
    = useAuth();

    return (
        <AuthContext.Provider value={{ loading, authenticated, handleLoginAuthProvider, handleLogoutAuthProvider }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};