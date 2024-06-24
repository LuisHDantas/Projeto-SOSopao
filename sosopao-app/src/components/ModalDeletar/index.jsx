import './style.css';
import { BotaoCinza } from '../BotaoCinza';
import { FaX } from 'react-icons/fa6';
import { useState } from 'react';
import { Loading } from '../Loading';

export function ModalDeletar({fechaDeletar, index, onDelete, children}){
    const [loadingDeletar, setLoadingDeletar] = useState(false);

    async function handleDelete() {
        setLoadingDeletar(true);
        await onDelete(index); // Call onDelete function with the index
        setLoadingDeletar(false);
        fechaDeletar(); // Close the delete modal
    }

    return(
        <div className="deletar-modal">
            <p>{children}</p>
            {
                loadingDeletar? <Loading color='#FF0000'/> :
                <>
                    <div className='btns-modal-deletar'>
                        <button id='btn-excluir-modal' onClick={handleDelete}> 
                            <FaX id='icon-excluir-modal'/>
                            Excluir
                        </button>
                        <BotaoCinza onClick={fechaDeletar}>Cancelar</BotaoCinza>
                    </div>
                </>
            }
            
        </div>
    )
}