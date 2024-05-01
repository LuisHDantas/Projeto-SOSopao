import './style.css'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";


export function EditarDeletar({finalizaEdicao, abreEditar, abreDeletar, isSelectedEdit}){
    

    return(
        <div className='editar-deletar'>
            <IconContext.Provider value={{ color: "#FFFFFF", size:'2em', className: "global-class-name" }}>
                <button className='btn-editar' onClick={isSelectedEdit ? finalizaEdicao : abreEditar}>
                    {isSelectedEdit ? <IoMdCheckmark /> : <MdEdit/>}
                </button>
            </IconContext.Provider>

            <IconContext.Provider value={{ color: "FFFFFF", size:'2em', className: "global-class-name" }}>
                <button className={`btn-deletar${isSelectedEdit ? '-ofuscado' : ''}`} onClick={isSelectedEdit ? ()=>{} : abreDeletar}><MdDelete/></button>
            </IconContext.Provider>
        </div>
    )
}