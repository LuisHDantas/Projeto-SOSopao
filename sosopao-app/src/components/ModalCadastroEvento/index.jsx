import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';
import axios from 'axios';

export function CadastroEvento({ fechaCadastro, dados, setDados }) {
    
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verifica se os campos obrigatórios estão preenchidos
        if (!formData.nome || !formData.data) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const response = await axios.post('/eventos', {
                nome: formData.nome,
                data: formatDate(formData.data),
                descricao: formData.descricao,
                url_imagem: formData.url_imagem
            });

            // Atualiza o estado com o novo evento
            setDados([...dados, response.data]);

            // Fecha o modal de cadastro
            fechaCadastro();
        } catch (error) {
            console.error('Erro ao cadastrar evento:', error);
        }
    };

    return (
        <div className="cadastrar-evento-modal">
            <form onSubmit={handleSubmit}>
                <div className='campo-cadastro-evento'>
                    <label>Nome:</label>
                    <input placeholder="Nome" name="nome" onChange={handleChange} />
                    <MdEdit className='icon-cadastro-evento' />
                </div>

                <div className='campo-cadastro-evento'>
                    <label>Data:</label>
                    <input type='date' placeholder="Data" name="data" onChange={handleChange} />
                    <MdEdit className='icon-cadastro-evento' />
                </div>

                <div className='campo-cadastro-evento'>
                    <label>Descrição:</label>
                    <textarea placeholder='Descrição' name="descricao" onChange={handleChange} />
                    <MdEdit style={{ bottom: '15%' }} className='icon-cadastro-evento' />
                </div>

                <div className='campo-cadastro-evento'>
                    <label>URL da imagem:</label>
                    <input placeholder='URL da imagem' name="url_imagem" onChange={handleChange} />
                    <MdEdit className='icon-cadastro-evento' />
                </div>

                <div id='container-btns-cadastro-evento'>
                    <BotaoLaranja type="submit">
                        Confirmar
                    </BotaoLaranja>
                    <BotaoCinza onClick={fechaCadastro}>Cancelar</BotaoCinza>
                </div>
            </form>
        </div>
    );
}