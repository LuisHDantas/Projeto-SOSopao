import { useEffect, useState } from "react";

import axios from "axios";

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    //Se tiver token valido, set como autenticado e coloca o token no cabeçario das requisições 
    //Se nn, authenticated = false e redireciona para o login
    useEffect(() =>{

        const validadeToken = async () =>{
            const token = localStorage.getItem('token');

            if(token){
                const { data: {valid}} = await axios.get(`expireToken/${JSON.parse(token)}`);
                try{
                    if(valid){
                        //Se token valido, libera entrada
                        axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
                        setAuthenticated(true);
                    }else{
                        //Se o token não é valido, desloga o usuario
                        localStorage.removeItem('token');
                        axios.defaults.headers.Authorization = undefined;
                        setAuthenticated(false);
                    }                    
                }catch(err){
                    localStorage.removeItem('token');
                    axios.defaults.headers.Authorization = undefined;
                    setAuthenticated(false);
                }
                
            }
           
            setLoading(false);
            
        }

        validadeToken();
    }, []);

    //Login - manda a requisição para o back-end
    async function handleLoginAuthProvider(adminText, senhaText){
        const response = await axios.post('/signin', 
            {
                email: adminText,
                senha: senhaText
            }
        );

        if(response === undefined){
            throw new Error("Problema request login");
        }

        const token = response.data.token;
        
        //Coloca o token no localStorage e set como autenticado
        localStorage.setItem('token', JSON.stringify(token));
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
    }

    //logout é basicamente remover o token do localStorage
    async function handleLogoutAuthProvider(){
        localStorage.removeItem('token');
        axios.defaults.headers.Authorization = undefined;
        setAuthenticated(false);
    } 

    return { loading, authenticated, handleLoginAuthProvider, handleLogoutAuthProvider };
}
