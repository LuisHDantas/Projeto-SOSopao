import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';

export function EditarContaAdmin({fechaEdicao, dados, setDados}){

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
                        setDados([...dados, {
                            nome: formData.nome,
                            email: formData.email,
                            senha: formData.senha,
                            novaSenha: formData.novaSenha,
                        }]);
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