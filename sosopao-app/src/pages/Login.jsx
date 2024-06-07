import { MdEdit } from 'react-icons/md';
import '../styles/login.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

export function Login(){
    const { authenticated, handleLoginAuthProvider } = useContext(AuthContext);

    const [adminText, setAdminText] = useState("");
    const [senhaText, setSenhaText] = useState("");

    async function send(event){
        event.preventDefault();
        
        //back-end
        await handleLoginAuthProvider(adminText, senhaText);
        //
        setAdminText("");
        setSenhaText("");
    }



    return(
        <>
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
                
            </div>
        </>
    );
}