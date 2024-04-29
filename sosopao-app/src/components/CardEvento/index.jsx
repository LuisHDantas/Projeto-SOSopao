import './style.css';
import { EditarDeletar } from '../EditarDeletar';
import { useState } from 'react';


export function CardEvento({nome, data, descricao, url_imagem}){
    const [toggle, setToggle] = useState(false);

    return(

    <>
    <button className='btn-evento' onClick={() => {
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
                    <p>{data}</p>
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
        </div>
    </button>

    
    {toggle ? <EditarDeletar/> : <></>}
    </>

    );
};