import { IoIosSearch } from "react-icons/io";
import './style.css';

export function ButtonSearch(){
    return(
    
        <div className="search">
            <button className="btn-search"> <IoIosSearch /> </button>
            <input className="txt-search" type="text" placeholder="Pesquisar..."/>
        </div>
              
    );
}