import { MdEdit } from 'react-icons/md';
import '../styles/login.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export function Login(){
    const { loadingContext, authenticated, handleLoginAuthProvider } = useContext(AuthContext);

    const [adminText, setAdminText] = useState("");
    const [senhaText, setSenhaText] = useState("");

    const [loadingSend, setLoadingSend] = useState(false);

    const navigate = useNavigate();

    //Se ja tiver logado, redireciona para home
    useEffect(() => {
        if (authenticated) {
            navigate('/');
        }
    }, [authenticated, navigate]);


    //Envio do forms
    async function send(event){
        event.preventDefault();
        
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        //Trata casos basicos antes de enviar pro back-end
        if(adminText.trim() === "" || senhaText.trim() === ""){ //não preencheu tuod
            alert("Preencha todos os campos!");
        }else if(!regex.test(adminText.trim())){//email invalido
            alert("Email inválido");
            setAdminText("");
            setSenhaText("");
        }else{
            try{
                //tenta uma requisição com o servidor
                setLoadingSend(true);
                await handleLoginAuthProvider(adminText, senhaText);
                setLoadingSend(false);
            }catch(error){
                // Se tiver erro, verifica se há uma resposta do servidor
                if (error.response) {
                    //capture a mensagem
                    const errorMessage = error.response.data;

                    alert(errorMessage); 
                    setLoadingSend(false);
                } else {
                    //Erro generico
                    console.error('Erro ao fazer a solicitação:', error);
                    alert('Erro ao fazer a solicitação');
                    setLoadingSend(false);
                }
                
            }
            
            setAdminText("");
            setSenhaText("");
        }   
        
    }



    return(
        <>
            {loadingContext ? 
                <h1>Carregando Tela...</h1>
            :
                <div className='login-background'>
                    <h2>LOGIN</h2>

                    <div className='login-container'>
                        <form onSubmit={send}>
                            <div className='login-label-input'>
                                <label>Administrador:</label>
                                <div className='login-input-icon'>
                                    <input placeholder="Email" name="email" value={adminText} onChange={event => setAdminText(event.target.value)}/>
                                    <MdEdit className='login-icon-edit'/>
                                </div>
                            </div>
                            
                            <div className='login-label-input'>
                                <label>Senha:</label>
                                <div className='login-input-icon'>
                                    <input placeholder="Senha" name="password" type='password' value={senhaText} onChange={event => setSenhaText(event.target.value)}/>
                                    <MdEdit className='login-icon-edit'/>
                                </div>
                            </div>
                            

                            {
                                loadingSend ?
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress 
                                            sx={{
                                                color: '#038C8C'
                                            }}
                                            size={50}
                                        />
                                    </Box>
                                :
                                    <button type='submit'>Entrar</button>
                            }
                        </form>
                    </div>
                    
                </div>
            }
        </>
    );
}