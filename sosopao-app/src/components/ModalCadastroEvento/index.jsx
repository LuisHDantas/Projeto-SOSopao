import './style.css';
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';
import axios from 'axios';

export function CadastroEvento({ fechaCadastro, dados, setDados }) {
    const [formData, setFormData] = useState({
        nome: '',
        data: '',
        descricao: ''
    });

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleFileChange = (event) => {
    setFile(event.target.files[0]);
};


const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === 'data') {
        if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            alert('Data inválida. Use o formato DD/MM/YYYY.');
        }
    }
};


    const formatDateForBackend = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Verifica se os campos obrigatórios estão preenchidos
        if (!formData.nome || !formData.data) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Verifica o formato da data antes de enviar
        if (!formData.data.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            alert('Data inválida. Use o formato DD/MM/YYYY.');
            return;
        }

        // Convert DD/MM/YYYY to YYYY-MM-DD for backend
        const formattedDate = formatDateForBackend(formData.data);

        setLoading(true);

        try {

            // cria uma nova instância de FormData
            const form = new FormData();
            form.append('nome', formData.nome);
            form.append('data', formattedDate);
            form.append('descricao', formData.descricao);
            form.append('file', file);
            
            //tenta uma requisição com o servidor
            const response = await axios.post('/eventos', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Atualiza o estado com o novo evento
            setDados([...dados, response.data]);

            // Fecha o modal de cadastro
            fechaCadastro();
        } catch (error) {
            if(error.response.data.parameters[1] === "Invalid date"){
                alert("Insira uma data válida");
            }

            console.error('Erro ao cadastrar evento:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cadastrar-evento-modal">
            <form onSubmit={handleSubmit}>
                <div className='campo-cadastro-evento'>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        id="nome"
                        placeholder="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                    <MdEdit className='icon-cadastro-evento' />
                </div>

                <div className='campo-cadastro-evento'>
                    <label htmlFor="data">Data:</label>
                    <input
                        id="data"
                        type="text"
                        placeholder="DD/MM/YYYY"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <MdEdit className='icon-cadastro-evento' />
                </div>

                <div className='campo-cadastro-evento'>
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        placeholder='Descrição'
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                    />
                    <MdEdit style={{ bottom: '15%' }} className='icon-cadastro-evento' />
                </div>

                <div className='campo-cadastro-evento' id='foto'>

                    <label>Adicione uma foto:</label>
                    <input type="file" name="file" onChange={handleFileChange}/>

                </div>

                <div id='container-btns-cadastro-evento'>
                    <BotaoLaranja type="submit" disabled={loading}>
                        {loading ? 'Carregando...' : 'Confirmar'}
                    </BotaoLaranja>
                    <BotaoCinza onClick={fechaCadastro} disabled={loading}>
                        Cancelar
                    </BotaoCinza>
                </div>
            </form>
        </div>
    );
}
