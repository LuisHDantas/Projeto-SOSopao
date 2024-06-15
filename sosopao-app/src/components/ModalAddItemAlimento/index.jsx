import './style.css'
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';

export function AddItemAlimento({fechaCadastro}){
    
    const [formData, setFormData] = useState({
        nome: '',
        data: '',
        descricao: '',
        url_imagem: ''
    });

    /* function formatDate(dateString) {
        // Split the date string into an array of year, month, and day components
        const [year, month, day] = dateString.split('-');
        
        // Rearrange the components into the desired format
        const formattedDate = `${day}-${month}-${year}`;
        
        return formattedDate;
    } */

    // Lida com evento de mudança do input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    return(
        <div className="add-item-alimento-modal">
            <form>
                <div className='campo-item-add-alimento'>
                    <label>Marca:</label>
                    <input placeholder="Marca" name="nome" onChange={handleChange}/>
                </div>

                <div className='campo-item-add-alimento'>
                    <label>Validade:</label>
                    <input type='date' placeholder="dd/mm/aaaa" name="data" onChange={handleChange}/>
                </div>

                <div className='campo-item-add-alimento'>
                    <label>Medida:</label>
                    <input type='number' placeholder="Medida" name="meta" onChange={handleChange}/>
                </div>

                <div className='campo-item-add-alimento'>
                    <label>Multiplicador:</label>
                    <input type='number' placeholder="Multiplicador" name="meta" onChange={handleChange}/>
                </div>


                

                <div id='container-btns-cadastro-evento'>  
                    <BotaoLaranja onClick={()=>{
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