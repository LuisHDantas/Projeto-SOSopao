import './style.css';
import { EditarDeletar } from '../EditarDeletar';
import { useState, useEffect } from 'react';
import { Loading } from '../Loading';

export function CardEvento({index, id_evento, nome, data, descricao, url_imagem, finalizaEdicao, abreEditar, abreDeletar, isSelectedEdit}){
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cardDados, setCardDados] = useState({
        id_evento: id_evento,
        nome: nome,
        data: formatDateToDMY(data),
        descricao: descricao,
        url_imagem: url_imagem
    });

    useEffect(() => {
        setCardDados({
            id_evento: id_evento,
            nome: nome,
            data: formatDateToDMY(data),
            descricao: descricao,
            url_imagem: url_imagem
        });
    }, [id_evento, nome, data, descricao, url_imagem]);

    function formatDateToDMY(dateString) {
        if(!dateString) return '';

        // Create a Date object by parsing the date string as UTC
        const date = new Date(`${dateString}T00:00:00Z`);

        // Extract day, month, and year using UTC methods
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getUTCFullYear();

        // Return the formatted date
        return `${day}/${month}/${year}`;

    }

    function formatDateToDB(dateString) {
        if (!dateString) return '';

        const dateParts = dateString.split('/');
        if (dateParts.length === 3) {
            const day = dateParts[0];
            const month = dateParts[1];
            const year = dateParts[2];
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } else {
            return 'Invalid date format';
        }
    }

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCardDados((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        // Verifica o formato da data antes de salvar
        if (!cardDados.data.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            return;
        }

        const formattedData = {
            ...cardDados,
            data: formatDateToDB(cardDados.data),
        };

        const form = new FormData();
        form.append('nome', formattedData.nome);
        form.append('data', formattedData.data);
        form.append('descricao', formattedData.descricao);
        form.append('file', file);

        setLoading(true);
        await finalizaEdicao(index, formattedData, form);
        setLoading(false);
    };


    const handleBlur = (event) => {
        const { name, value } = event.target;
        if (name === 'data') {
            if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                setCardDados({
                    ...cardDados,
                    [name]: value,
                });
            } else {
                alert('Data inválida. Use o formato DD/MM/YYYY.');
            }
        }
    };


    return (
        <>
            <button
                className={`btn-evento${isSelectedEdit ? '-selected' : ''}`}
                onClick={() => {
                    if (!isSelectedEdit) {
                        setToggle((prev) => !prev);
                    }
                }}
            >
                {
                    loading ? <Loading/> :
                    <>
                    <img src={cardDados.url_imagem} alt='imagem do evento' />
                    <div>
                        <div className='card-evento'>
                            <div className='dado-evento'>
                                <h3>Nome:</h3>
                                {isSelectedEdit ? (
                                    <input
                                        className='input-editavel-card-evento'
                                        type='text'
                                        value={cardDados.nome}
                                        name='nome'
                                        onChange={handleChange}
                                        required
                                    />
                                ) : (
                                    <p>{cardDados.nome}</p>
                                )}
                            </div>
                            <div className='dado-evento'>
                                <h3>Data:</h3>
                                {isSelectedEdit ? (
                                    <input
                                        className='input-editavel-card-evento'
                                        type='text'
                                        value={cardDados.data}
                                        name='data'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                ) : (
                                    <p>{cardDados.data}</p>
                                )}
                            </div>
                        </div>

                        <div
                            id='descricao-evento'
                            style={{
                                display: toggle ? '' : 'none',
                            }}
                        >
                            <h3>Descrição:</h3>
                            {isSelectedEdit ? (
                                <textarea
                                    className='input-editavel-card-evento'
                                    value={cardDados.descricao}
                                    name='descricao'
                                    onChange={handleChange}
                                ></textarea>
                            ) : (
                                <p>{cardDados.descricao}</p>
                            )}
                        </div>

                        <div
                            id='url-imagem-evento'
                            style={{
                                display: isSelectedEdit ? '' : 'none',
                            }}
                        >
                            <label>Adicione uma foto:</label>
                            {isSelectedEdit && (
                                <input type="file" name="file" onChange={handleFileChange}/>
                            )}
                        </div>
                    </div>
                    </>
                }
            </button>
            {toggle ? (
                <EditarDeletar
                    finalizaEdicao={handleSave}
                    abreEditar={abreEditar}
                    abreDeletar={() => {
                        abreDeletar();
                        setToggle(false);
                    }}
                    isSelectedEdit={isSelectedEdit}
                />
            ) : null}
        </>
    );
}
