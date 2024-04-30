import { FaTrash } from "react-icons/fa6";
import './style.css';

export function ButtonRemoveEstoque({...props}){
    return(
        <button className="btn-remove-estoque" {...props}> <FaTrash /> </button>
    );
}