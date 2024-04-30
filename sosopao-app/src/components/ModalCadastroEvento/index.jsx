import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoConfirmar } from '../BotaoConfirmar';
import { useState } from 'react';

export function CadastroEvento({fechaCadastro, dados, setDados}){
    
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
        <div className="cadastrar-evento-modal">
            <forms>
                <div className='campo-cadastro-evento'>
                    <label>Nome:</label>
                    <input placeholder="Nome" name="nome" onChange={handleChange}/>
                    <MdEdit className='icon-cadastro-evento'/>
                </div>

                <div className='campo-cadastro-evento'>
                    <label>Data:</label>
                    <input type='date' placeholder="Data" name="data" onChange={handleChange}/>
                    <MdEdit className='icon-cadastro-evento'/>
                </div>

                

                <div className='campo-cadastro-evento'>
                    <label>Descrição:</label>
                    <textarea placeholder='Descrição' name="descricao" onChange={handleChange}/>
                    <MdEdit style={{bottom: '15%'}} className='icon-cadastro-evento'/>
                </div>

                <div className='campo-cadastro-evento'>
                    <label>URL da imagem:</label>
                    <input placeholder='URL da imagem' name="url_imagem" onChange={handleChange}/>
                    <MdEdit className='icon-cadastro-evento'/>
                </div>

                <div style={{width: '50%'}}>  
                    <BotaoConfirmar onClick={()=>{
                        setDados([...dados, {
                            nome: formData.nome,
                            data: formatDate(formData.data),
                            descricao: formData.descricao,
                            url_imagem: formData.url_imagem,
                        }]);
                    }}/>
                </div>
            </forms>
        </div>
    )
}