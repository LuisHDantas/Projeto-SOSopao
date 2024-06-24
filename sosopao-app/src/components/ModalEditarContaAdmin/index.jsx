import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState, useEffect } from 'react';
import axios from 'axios';


export function EditarContaAdmin({fechaEdicao, dados, setDados}){
    const [storedToken, setStoredToken] = useState(localStorage.getItem('token'));
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        novaSenha: ''
    });

    // Lida com evento de mudança do input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    }; 

    const handleSave = async function(formData, dados) {
        try {
            
            const response = await axios.put(`usuarios/admin/${storedToken}`, {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
                novaSenha: formData.novaSenha
            });


            if (response.status === 200){
                const updatedDados = dados.map(item => {
                    if (item.id_usuario === response.data.id) {
                        return {
                            ...item,
                            nome: formData.nome,
                            email: formData.email
                        };
                    } else {
                        return item;
                    }
                });

                setDados(updatedDados);
            } else {
                console.error("Erro ao atualizar dados");
            }
        } catch (err) {
            console.error("Erro ao alterar dados", err);
        }
    }

    useEffect(() => {
        let storedValue = localStorage.getItem('token');
            storedValue = storedValue.replace(/"/g, "");
        if (storedValue !== storedToken) {
            setStoredToken(storedValue || '');
        }
    }, [storedToken]);

    return(
        <div className='editar-admin-modal'>
            <form>
                <div className='campo-edicao-admin'>
                    <label>Nome:</label>
                    <input placeholder="Nome" name="nome" onChange={handleChange}/>
                    <MdEdit className='icon-edicao-admin'/>
                </div>
                
                <div className='campo-edicao-admin'>
                    <label>Email:</label>
                    <input placeholder='Email' name="email" onChange={handleChange}/>
                    <MdEdit className='icon-edicao-admin'/>
                </div>

                <div className='campo-edicao-admin'>
                    <label>Antiga senha:</label>
                    <input placeholder='Antiga senha' name="senha" onChange={handleChange}/>
                    <MdEdit className='icon-edicao-admin'/>
                </div>

                <div className='campo-edicao-admin'>
                    <label>Nova senha:</label>
                    <input placeholder='Nova senha' name="novaSenha" onChange={handleChange}/>
                    <MdEdit className='icon-edicao-admin'/>
                </div>

                <div id='container-btns-edicao-admin'>  
                    <BotaoLaranja onClick={()=>{
                        handleSave(formData, dados);
                        fechaEdicao();
                    }}
                    >
                        Confirmar
                    </BotaoLaranja>
                    <BotaoCinza onClick={fechaEdicao}>Cancelar</BotaoCinza>
                </div>
            </form>
        </div>
    );

}
