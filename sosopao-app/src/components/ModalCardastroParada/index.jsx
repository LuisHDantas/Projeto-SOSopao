import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';

export function CadastroParada({fechaCadastro, dados, setDados}){
    
    const [formData, setFormData] = useState({
        parada: ''
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
        <div className="cadastrar-parada-modal">
            <form>

                <div className='campo-cadastro-parada'>
                    <textarea placeholder='Ponto' name="parada" onChange={handleChange}/>
                    <MdEdit style={{bottom: '15%'}} className='icon-cadastro-parada'/>
                </div>

                <div id='container-btns-cadastro-parada'>  
                    <BotaoLaranja onClick={()=>{
                        /* setDados([...dados, {
                            parada: formData.parada,
                        }]); */

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