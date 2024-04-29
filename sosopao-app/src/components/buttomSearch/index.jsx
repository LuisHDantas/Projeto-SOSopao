import { IoIosSearch } from "react-icons/io";
import './style.css';

export function ButtonSearch(){
    return(
    
        <button className="search">
            <IoIosSearch />
            <input class="search-txt" type="text" placeholder="Pesquisar..."/>
        </button>
              
    );
}