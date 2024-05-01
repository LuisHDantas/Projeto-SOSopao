import './style.css';


export function CardInscricao({nome, email, telefone}){

    return(

    <>
    <div className='card-inscricao'>
        <div>
            <div className='dado-inscricao'>
                <h3>Nome:</h3>
                <p>{nome}</p>
            </div>
            <div className='dado-inscricao'>
                <h3>E-mail:</h3>
                <p>{email}</p>
            </div>

            <div className='dado-inscricao'>
                <h3>Telefone:</h3>
                <p>{telefone}</p>
            </div>
        </div>
    </div>

    </>

    );
};