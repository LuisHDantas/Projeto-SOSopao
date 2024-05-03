import './style.css';
import { TbLetterX } from "react-icons/tb";
import { BotaoCinza } from '../BotaoCinza';

export function DeletarEvento({fechaDeletar, index, onDelete, dados}){
    function handleDelete() {
        onDelete(index); // Call onDelete function with the index
        fechaDeletar(); // Close the delete modal
    }


    return(
        <div className="deletar-evento-modal">
            <p>Deseja EXCLUIR esse evento?</p>
            <div className='btns-modal-deletar'>
                <button id='btn-excluir-evento' onClick={handleDelete}> 
                    <TbLetterX className='icon-excluir-evento'/>
                     Excluir
                </button>
                <BotaoCinza onClick={fechaDeletar}>Cancelar</BotaoCinza>
            </div>
            
        </div>
    )
}