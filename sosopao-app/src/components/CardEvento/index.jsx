import './style.css';
import { EditarDeletar } from '../EditarDeletar';
import { useState } from 'react';


export function CardEvento({index, id_evento, nome, data, descricao, url_imagem, finalizaEdicao, abreEditar, abreDeletar, isSelectedEdit}){
    const [toggle, setToggle] = useState(false);
    const [cardDados, setCardDados] = useState(
        {
            id_evento: id_evento,
            nome: nome,
            data: data,
            descricao: descricao,
            url_imagem: url_imagem
        }
    );
    

    // Função para formatar a data de DD-MM-YYYY para DD/MM/YYYY
    function formatDate(dateString) {
        if (!dateString) {
            return 'Invalid date format';
        }

        const parts = dateString.split('-');
        if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            return `${day}/${month}/${year}`;
        } else {
            return 'Invalid date format';
        }
    }

    function formatDateToInput(dateString) {
        if (!dateString) {
            return 'Invalid date format';
        }

        const parts = dateString.split('-');
        if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
        
            return `${year}-${month}-${day}`;
        } else {
            return 'Invalid date format';
        }
    }

    // Convert date from YYYY-MM-DD to DD-MM-YYYY
    function formatDateFromInput(dateString) {
        if (!dateString) {
            return 'Invalid date format';
        }

        const parts = dateString.split('-');
        if (parts.length === 3) {
            const year = parts[0];
            const month = parts[1];
            const day = parts[2];
            return `${day}-${month}-${year}`;
        } else {
            return 'Invalid date format';
        }
    }

    // Transforma DATEONLY em DD/MM/YYYY
    function parseDateFromDB(dateString) {
        const dateParts = dateString.split('-'); 
        if (dateParts.length !== 3) {
            throw new Error('Formato de data inválido. Esperado YYYY-MM-DD.');
        }

        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];

        return `${day}/${month}/${year}`;
    }

    // Lida com evento de mudança do input
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'data') {
            setCardDados((prevState) => ({
                ...prevState,
                [name]: formatDateFromInput(value),
            }));
        } else {
            setCardDados((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    
    // In the date input field
    <input className="input-editavel-card-evento" type="date" defaultValue={formatDateToInput(cardDados.data)} name="data"/>

    const handleSave = () => {
        finalizaEdicao(index, cardDados);
    };
    

    return(

    <>
    <button className={`btn-evento${isSelectedEdit ? '-selected' : ''}`} onClick={() => {
        if (!isSelectedEdit) {
            setToggle(prev => !prev);
        }
    }}>
        <img src={url_imagem} alt='imagem do evento' />

        <div>
            <div className='card-evento'>
                <div className='dado-evento'>
                    <h3>Nome:</h3>
                    {isSelectedEdit ? (
                        <input className="input-editavel-card-evento" type="text" value={cardDados.nome} name="nome" onChange={handleChange} />
                    ) : (
                        <p>{cardDados.nome}</p>
                    )}
                </div>
                <div className='dado-evento'>
                    <h3>Data:</h3>
                    {isSelectedEdit ? (
                        <input className="input-editavel-card-evento" type="date" value={formatDateToInput(cardDados.data)} name="data" onChange={handleChange}/>
                    ) : (
                        <p>{parseDateFromDB(data)}</p>
                    )}
                </div>
            </div>

            <div id='descricao-evento' 
            style={{
                display: toggle ? "" : "none"
            }}
            >
                <h3>Descrição:</h3>
                {isSelectedEdit ? (
                    <textarea className="input-editavel-card-evento" value={cardDados.descricao} name="descricao" onChange={handleChange}></textarea>
                ) : (
                    <p>{cardDados.descricao}</p>
                )}
            </div>

            <div id='url-imagem-evento' 
            style={{
                display: isSelectedEdit ? "" : "none"
            }}
            >
                <h3>URL da imagem:</h3>
                {isSelectedEdit ? (
                    <input className="input-editavel-card-evento" type="text" value={cardDados.url_imagem} name="url_imagem" onChange={handleChange} />
                ) : (
                    <p>{cardDados.url_imagem}</p>
                )}
            </div>
        </div>
    </button>

    
    {toggle ? <EditarDeletar finalizaEdicao={handleSave} abreEditar={abreEditar} abreDeletar={() => {abreDeletar(); setToggle(false);}} isSelectedEdit={isSelectedEdit}/> : <></>}
    </>

    );
};