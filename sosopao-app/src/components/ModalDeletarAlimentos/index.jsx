import './style.css';
import { TbLetterX } from "react-icons/tb";
import { BotaoCinza } from '../BotaoCinza';
import { useContext, useState } from 'react';
import { AlimentosContext } from '../../Context/AlimentosContext';
import { Loading } from '../Loading';

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
        <div className="deletar-modal">
            <p>{children}</p>
            <div className='btns-modal-deletar'>
                {
                    loadingDeletar? <Loading color='#FF0000'/> :
                    <>
                        <button id='btn-excluir-modal' onClick={handleSwitchDelete}> 
                            <TbLetterX className='icon-excluir-modal'/>
                            Excluir
                        </button>
                        <BotaoCinza onClick={toggleModalDeletar}>Cancelar</BotaoCinza>
                    </> 
                }
            </div>
            
        </div>
    )
}