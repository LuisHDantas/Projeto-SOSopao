import './style.css';
import { BotaoCinza } from '../BotaoCinza';
import { useContext, useState } from 'react';
import { AlimentosContext } from '../../Context/AlimentosContext';
import { Loading } from '../Loading';
import { FaX } from 'react-icons/fa6';

export function ModalDeletarAlimentos({children}){
    const {
        toggleModalDeletar,
        selectedSAlimento,
        selectedAlimento,
        handleSuperAlimentoDelete,
        handleAlimentoDelete,
        typeDelete
    }= useContext(AlimentosContext);

    const [loadingDeletar, setLoadingDeletar] = useState(false);

    async function handleSwitchDelete() {
        setLoadingDeletar(true);

        if(typeDelete==="superalimento"){
            await handleSuperAlimentoDelete(selectedSAlimento);
        }else if(typeDelete==="alimento"){
            await handleAlimentoDelete(selectedSAlimento, selectedAlimento);
        }else{
            console.log("Erro ModalDeletarAlimentos");
        }

        setLoadingDeletar(false);

    }

    return(
        <div className="deletar-modal-alimentos">
            <p>{children}</p>
            <div className='btns-modal-deletar-alimentos'>
                {
                    loadingDeletar? <Loading color='#FF0000'/> :
                    <>
                        <button id='btn-excluir-modal-alimentos' onClick={handleSwitchDelete}> 
                            <FaX id='icon-modal-delatar-alimentos'/>
                            Excluir
                        </button>
                        <BotaoCinza onClick={toggleModalDeletar}>Cancelar</BotaoCinza>
                    </> 
                }
            </div>
            
        </div>
    )
}