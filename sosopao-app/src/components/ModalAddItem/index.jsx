import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';

export function AddItem({fechaAddItem}){
    
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
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
        <div className="add-itens-modal">
            <form>
                <div className='campo-add-itens'>
                    <label>Nome:</label>
                    <input placeholder="Nome" name="nome" onChange={handleChange}/>
                    <MdEdit className='icon-add-itens'/>
                </div>

                <div className='campo-add-itens'>
                    <label>Descrição:</label>
                    <textarea placeholder='Descrição' name="descricao" onChange={handleChange}/>
                    <MdEdit style={{bottom: '15%'}} className='icon-add-itens'/>
                </div>

                <div id='container-btns-add-itens'>  
                    <BotaoLaranja onClick={()=>{

                        fechaAddItem();
                    }}
                    >
                        Confirmar
                    </BotaoLaranja>
                    <BotaoCinza onClick={fechaAddItem}>Cancelar</BotaoCinza>
                </div>
            </form>
        </div>
    )
}