import './style.css'
import { MdEdit } from "react-icons/md";
import { ButtonEditEstoque } from '../buttomEditEstoque';
import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';
import { FaCheck } from "react-icons/fa";


export function EditarDeletar({finalizaEdicao, abreEditar, abreDeletar, isSelectedEdit}){
    

    return(
        <div className='editar-deletar'>
            <ButtonEditEstoque style={{margin: '10px'}} onClick={isSelectedEdit ? finalizaEdicao : abreEditar}>
                {
                    isSelectedEdit ?
                    <FaCheck/>:
                    <MdEdit/>
                }
            </ButtonEditEstoque>
            
            { 
                isSelectedEdit?
                (<ButtonRemoveEstoque  style={{opacity: '0.5', margin: '10px'}}/>) :
                (<ButtonRemoveEstoque style={{margin: '10px'}} onClick={isSelectedEdit ? ()=>{} : abreDeletar}/>)
            
            }

        </div>
    )
}