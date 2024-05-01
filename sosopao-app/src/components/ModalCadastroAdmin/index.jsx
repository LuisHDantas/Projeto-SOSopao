import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';

export function CadastroAdmin({fechaCadastro, dados, setDados}){

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

    return(
        <div className='cadastrar-admin-modal'>
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
                    <input placeholder='Senha' name="senha" onChange={handleChange}/>
                    <MdEdit className='icon-cadastro-admin'/>
                </div>

                <div id='container-btns-cadastro-admin'>  
                    <BotaoLaranja onClick={()=>{
                        setDados([...dados, {
                            nome: formData.nome,
                            email: formData.email,
                            senha: formData.senha,
                        }]);
                        fechaCadastro();
                    }}
                    >
                        Confirmar
                    </BotaoLaranja>
                    <BotaoCinza onClick={fechaCadastro}>Cancelar</BotaoCinza>
                </div>
            </form>
        </div>
    );

}