import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){
            axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLoginAuthProvider(adminText, senhaText){
        const { data: {token} } = await axios.post('/signin', 
            {
                email: adminText,
                senha: senhaText
            }
        );

        localStorage.setItem('token', JSON.stringify(token));
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
    }


    async function handleLogoutAuthProvider(){
        localStorage.removeItem('token');
        axios.defaults.headers.Authorization = undefined;
        setAuthenticated(false);
    } 

    return { loading, authenticated, handleLoginAuthProvider, handleLogoutAuthProvider };
}