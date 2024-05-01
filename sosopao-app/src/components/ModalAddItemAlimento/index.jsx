import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';
import { BiColor } from 'react-icons/bi';
import { TbBackground } from 'react-icons/tb';

export function AddItemAlimento({fechaCadastro}){
    
    const [formData, setFormData] = useState({
        nome: '',
        data: '',
        descricao: '',
        url_imagem: ''
    });

    function formatDate(dateString) {
        // Split the date string into an array of year, month, and day components
        const [year, month, day] = dateString.split('-');
        
        // Rearrange the components into the desired format
        const formattedDate = `${day}-${month}-${year}`;
        
        return formattedDate;
    }

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
                    <MdEdit className='icon-cadastro-evento'/>
                </div>

                <div className='campo-item-add-alimento'>
                    <label>Data:</label>
                    <input type='date' placeholder="Data" name="data" onChange={handleChange}/>
                    <MdEdit className='icon-cadastro-evento'/>
                </div>

                <div className='campo-item-add-alimento'>
                    <label>Quantidade:</label>
                    <input type='number' placeholder="0" name="meta" onChange={handleChange}/>
                </div>


                <div className='campo-item-add-alimento'>
                    <select id="unMed-item-alimento" name="Unidade de Medida">
                        <option value="" disabled selected>Un. Medida</option>
                        <option value="unidade">Unidade</option>
                        <option value="Kilogramas">Kilogramas</option>
                        <option value="gramas">gramas</option>
                        <option value="Litros">Litros</option>
                        <option value="mililitros">mililitros</option>
                        <option value="Dúzia">Dúzia</option>
                    </select>
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