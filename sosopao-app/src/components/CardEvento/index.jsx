import './style.css';
import { EditarDeletar } from '../EditarDeletar';
import { useState } from 'react';


export function CardEvento({nome, data, descricao, url_imagem, abreEditar, abreDeletar, isSelectedEdit}){
    const [toggle, setToggle] = useState(false);

    // Função para formatar a data de DD-MM-YYYY para DD/MM/YYYY
    function formatDate(dateString) {
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

    

    return(

    <>
    <button className={`btn-evento${isSelectedEdit ? '-selected' : ''}`} onClick={() => {
        setToggle(prev => {
            return !prev;
        });
    }}>
        <img src={url_imagem} alt='imagem do evento' />

        <div>
            <div className='card-evento'>
                <div className='dado-evento'>
                    <h3>Nome:</h3>
                    <p>{nome}</p>
                </div>
                <div className='dado-evento'>
                    <h3>Data:</h3>
                    <p>{formatDate(data)}</p>
                </div>
            </div>

            <div id='descricao-evento' 
            style={{
                display: toggle ? "" : "none"
            }}
            >
                <h3>Descrição:</h3>
                <p>{descricao}</p>
            </div>

            <div id='url-imagem-evento' 
            style={{
                display: isSelectedEdit ? "" : "none"
            }}
            >
                <h3>URL da imagem:</h3>
                <p>{url_imagem}</p>
            </div>
        </div>
    </button>

    
    {toggle ? <EditarDeletar abreEditar={abreEditar} abreDeletar={abreDeletar} isSelectedEdit={isSelectedEdit}/> : <></>}
    </>

    );
};