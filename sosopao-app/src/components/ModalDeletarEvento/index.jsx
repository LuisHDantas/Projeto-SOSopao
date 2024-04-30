import './style.css';
import { TbLetterX } from "react-icons/tb";
import { BotaoCinza } from '../BotaoCinza';

export function DeletarEvento({fechaDeletar}){
    return(
        <div className="deletar-evento-modal">
            <p>Deseja EXCLUIR esse evento?</p>
            <div className='btns-modal-deletar'>
                <button id='btn-excluir-evento'> <TbLetterX className='icon-excluir-evento'/> Excluir</button>
                <BotaoCinza onClick={fechaDeletar}>Cancelar</BotaoCinza>
            </div>
            
        </div>
    )
}