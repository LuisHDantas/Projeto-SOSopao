import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';
import axios from 'axios';

export function AddItem({fechaAddItem, setItem}){

    const [formItem, setFormItem] = useState({
        nome: '',
        descricao: '',
        quantidade: 1,
    });

    const [loading, setLoading] = useState(false);

    // Lida com evento de mudança do input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormItem({
          ...formItem,
          [name]: value,
        });
    };

    async function createItem(){
        setLoading(true);

        try{
            const result = await axios.post('/item',{
                nome: formItem.nome,
                descricao: formItem.descricao,
                quantidade: formItem.quantidade,
            });
    
            setItem((anteriores) => {
                return [...anteriores, result.data];
            });
            
        }catch(error){
            console.log('Erro em modal add Item: ' + error);
            alert('Erro ao criar item');
        }finally {
            setLoading(false);
        }
    }

    const send = async (event) => {

        event.preventDefault();

        // Verifica se os campos obrigatórios estão preenchidos
        if(!formItem.nome || !formItem.quantidade) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        await createItem();
        fechaAddItem();
    }

    return(
        <div className="add-itens-modal">
            <form onSubmit={send}>
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
                    <BotaoLaranja type='submit' disabled={loading}>
                        {loading ? 'Carregando...' : 'Confirmar'}
                    </BotaoLaranja>
                    <BotaoCinza onClick={fechaAddItem} disabled={loading}>Cancelar</BotaoCinza>
                </div>
            </form>
        </div>
    )
}