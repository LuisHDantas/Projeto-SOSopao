import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';
import axios from 'axios';

export function CadastroParada({fechaCadastro, dados, setDados}){
    
    const [formData, setFormData] = useState({
        descricao: ''
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

            const posicao = dados.length + 1;
            const response = await axios.post('/pontoparada', { posicao, ...formData});
            if (response.status === 200){
                const updatedDados = [...dados, response.data];

                setDados(updatedDados);
            } else {
                console.error("Erro ao cadastrar evento", response.statusText);
            }
        } catch (err) {
            console.error("Erro ao cadastrar evento", err);
        }
    }

    return(
        <div className="cadastrar-parada-modal">
            <form>

                <div className='campo-cadastro-parada'>
                    <textarea placeholder='Ponto' name="descricao" onChange={handleChange}/>
                    <MdEdit style={{bottom: '15%'}} className='icon-cadastro-parada'/>
                </div>

                <div id='container-btns-cadastro-parada'>  
                    <BotaoLaranja onClick={()=>{
                        handleSave(formData, dados); 

                        fechaCadastro();
                    }}
                    >
                        Confirmar
                    </BotaoLaranja>
                    <BotaoCinza onClick={fechaCadastro}>Cancelar</BotaoCinza>
                </div>
            </form>
        </div>
    )
}
