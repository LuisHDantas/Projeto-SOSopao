import './style.css';
import { TbLetterX } from "react-icons/tb";
import { BotaoCinza } from '../BotaoCinza';

export function ModalDeletar({fechaDeletar, index, onDelete, children}){
    function handleDelete() {
        onDelete(index); // Call onDelete function with the index
        fechaDeletar(); // Close the delete modal
    }

    return(
        <div className="deletar-modal">
            <p>{children}</p>
            <div className='btns-modal-deletar'>
                <button id='btn-excluir-modal' onClick={handleDelete}> 
                    <TbLetterX className='icon-excluir-modal'/>
                     Excluir
                </button>
                <BotaoCinza onClick={fechaDeletar}>Cancelar</BotaoCinza>
            </div>
            
        </div>
    )
}