import './style.css'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";

export function EditarDeletar(){
    return(
        <div className='editar-deletar'>
            <IconContext.Provider value={{ color: "#FFFFFF", size:'2em', className: "global-class-name" }}>
                <button className='btn-editar'><MdEdit/></button>
            </IconContext.Provider>

            <IconContext.Provider value={{ color: "FFFFFF", size:'2em', className: "global-class-name" }}>
                <button className='btn-deletar'><MdDelete/></button>
            </IconContext.Provider>
        </div>
    )
}