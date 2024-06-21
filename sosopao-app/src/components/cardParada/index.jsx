import './style.css';
import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';

export function CardParada({parada, posicao, abreDeletar}){

    return(

    <>
    <div className='card-parada'>
        <div style={{maxWidth:'75%'}}>
            <div className='dado-parada'>
                <h3>Parada:</h3>
                <p>{parada}</p>
            </div>
        </div>

        <div id="container-icone-deletar-parada">
            <ButtonRemoveEstoque style={{margin:'10px'}} onClick={abreDeletar}/>
        </div>

    </div>

    </>

    );
};
