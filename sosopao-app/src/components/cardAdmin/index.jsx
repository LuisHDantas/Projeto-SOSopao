import './style.css';
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";

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
            <IconContext.Provider value={{ color: "#FFFFFF", size:'1.5em', className: "global-class-name" }}>
                <MdDelete onClick={abreDeletar} className='btn-deletar'/>
            </IconContext.Provider>
        </div>

    </div>

    </>

    );
};