import './style.css';
import { TbLetterX } from "react-icons/tb";


export function DeletarEvento({fechaDeletar}){
    return(
        <div className="deletar-evento-modal">
            <p>Deseja EXCLUIR esse evento?</p>
            <div className='btns-modal-deletar'>
                <button id='btn-excluir-evento'> <TbLetterX className='icon-excluir-evento'/> Excluir</button>
                <button id='btn-cancelar-excluir-evento' onClick={fechaDeletar}>Cancelar</button>
            </div>
            
        </div>
    )
}