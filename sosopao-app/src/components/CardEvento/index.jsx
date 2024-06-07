import './style.css';
import { EditarDeletar } from '../EditarDeletar';
import { useState, useEffect } from 'react';

export function CardEvento({index, id_evento, nome, data, descricao, url_imagem, finalizaEdicao, abreEditar, abreDeletar, isSelectedEdit}){
    const [toggle, setToggle] = useState(false);
    const [cardDados, setCardDados] = useState({
        id_evento: id_evento,
        nome: nome,
        data: data,
        descricao: descricao,
        url_imagem: url_imagem
    });

    useEffect(() => {
        setCardDados({
            id_evento: id_evento,
            nome: nome,
            data: data,
            descricao: descricao,
            url_imagem: url_imagem
        });
    }, [id_evento, nome, data, descricao, url_imagem]);

    function formatDateToPrint(dateString) {
        if (!dateString) return 'Invalid date format';
        const dateParts = dateString.split('-');
        if (dateParts.length === 3) {
            const year = dateParts[2];
            const month = dateParts[1];
            const day = dateParts[0];
            return `${year}/${month}/${day}`;
        } else {
            return 'Invalid date format';
        }
    }

    function formatDateFromInput(dateString) {
        if (!dateString) return 'Invalid date format';
        const dateParts = dateString.split('-');
        if (dateParts.length === 3) {
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];
            return `${year}-${month}-${day}`;
        } else {
            return 'Invalid date format';
        }
    }

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

    const handleSave = () => {
        const formattedData = {
            ...cardDados,
            data: formatDateFromInput(cardDados.data),
        };
        finalizaEdicao(index, formattedData);
    };

    return (
        <>
            <button className={`btn-evento${isSelectedEdit ? '-selected' : ''}`} onClick={() => {
                if (!isSelectedEdit) {
                    setToggle(prev => !prev);
                }
            }}>
                <img src={cardDados.url_imagem} alt='imagem do evento' />
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
                                <input className="input-editavel-card-evento" type="date" value={cardDados.data} name="data" onChange={handleChange}/>
                            ) : (
                                <p>{formatDateToPrint(cardDados.data)}</p>
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
            {toggle ? (
                <EditarDeletar finalizaEdicao={handleSave} abreEditar={abreEditar} abreDeletar={() => {abreDeletar(); setToggle(false);}} isSelectedEdit={isSelectedEdit}/>
            ) : null}
        </>
    );
}
