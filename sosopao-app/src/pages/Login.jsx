import { MdEdit } from 'react-icons/md';
import '../styles/login.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login(){
    const { loading, authenticated, handleLoginAuthProvider } = useContext(AuthContext);

    const [adminText, setAdminText] = useState("");
    const [senhaText, setSenhaText] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated) {
            navigate('/');
        }
    }, [authenticated, navigate]);

    async function send(event){
        event.preventDefault();
        
        //back-end
        try{
            await handleLoginAuthProvider(adminText, senhaText);
        }catch(error){
            console.log(error);
        }
        
        setAdminText("");
        setSenhaText("");

        navigate("/");
    }



    return(
        <>
            {loading ? 
                <h1>Loading...</h1>
            :
            <div className='login-background'>
                <h2>LOGIN</h2>

                <form onSubmit={send}>
                    <div className='login-container'>
                        <div className='login-admin-label'>
                            <label>Email Administrador:</label>
                            <input placeholder="email" name="email" value={adminText} onChange={event => setAdminText(event.target.value)}/>
                            <MdEdit className='login-icon-edit'/>
                        </div>
                        
                        <div className='login-password-label'>
                            <label>Senha:</label>
                            <input placeholder="Senha" name="password" type='password' value={senhaText} onChange={event => setSenhaText(event.target.value)}/>
                            <MdEdit className='login-icon-edit'/>
                        </div>

                        <button type='submit'>Entrar</button>
                    </div>
                </form>
                
            </div>}
        </>
    );
}