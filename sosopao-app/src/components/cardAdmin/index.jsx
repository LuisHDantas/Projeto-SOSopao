import './style.css';
import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';

export function CardAdmin({nome, email, abreDeletar}){

    return(
    <>
    <div className='card-admin'>
        <div style={{maxWidth:'75%'}}>
            <div className='dado-admin'>
                <h3>Nome:</h3>
                <p>{nome}</p>
            </div>
            <div className='dado-admin'>
                <h3>E-mail:</h3>
                <p>{email}</p>
            </div>
        </div>

        <div id="container-icone-deletar-adm">
            <ButtonRemoveEstoque style={{margin: '10px'}} onClick={abreDeletar} />
        </div>

    </div>

    </>

    );
};