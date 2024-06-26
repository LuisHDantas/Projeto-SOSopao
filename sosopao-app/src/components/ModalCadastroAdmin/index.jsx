import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';
import { Loading } from '../Loading/';

import axios from 'axios';

export function CadastroAdmin({fechaCadastro, dados, setDados}){
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
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
            setLoading(true);
            const response = await axios.post(`/signup`, formData );

            if (response.status === 201){
                const user = await axios.get(`/usuarios/token/${response.data.token}`);
                const updatedDados = [...dados, user.data];

                setDados(updatedDados);
                fechaCadastro();
                setLoading(false);
            } else {
                console.error("Erro ao cadastrar admin", response.statusText);
            }
        } catch (err) {
            console.error("Erro ao cadastrar admin", err);
        }
    }

    return(
        <div className='cadastrar-admin-modal'>
            {loading ? <Loading/> : (
            <form>
                <div className='campo-cadastro-admin'>
                    <label>Nome:</label>
                    <input placeholder="Nome" name="nome" onChange={handleChange}/>
                    <MdEdit className='icon-cadastro-admin'/>
                </div>
                
                <div className='campo-cadastro-admin'>
                    <label>Email:</label>
                    <input placeholder='Email' name="email" onChange={handleChange}/>
                    <MdEdit className='icon-cadastro-admin'/>
                </div>

                <div className='campo-cadastro-admin'>
                    <label>Senha:</label>
                    <input placeholder='Senha' name="senha" type="password" onChange={handleChange}/>
                    <MdEdit className='icon-cadastro-admin'/>
                </div>

                <div id='container-btns-cadastro-admin'>  
                    <BotaoLaranja onClick={()=>{
                        handleSave(formData, dados);
                    }}
                    >
                        Confirmar
                    </BotaoLaranja>
                    <BotaoCinza onClick={fechaCadastro}>Cancelar</BotaoCinza>
                </div>
            </form>
        )}
        </div>
    );

}
