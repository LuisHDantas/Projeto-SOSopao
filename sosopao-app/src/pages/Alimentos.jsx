import { Navbar } from "../components/Navbar";
import { ButtonSearch } from "../components/buttomSearch";
import { ButtonAdd } from "../components/buttonAdd";
import '../styles/alimentos.css';


export function Alimentos(){
    return(
        <div>
            <Navbar type='alimentos'/>
            <div id="add-search">
                <ButtonAdd />
                <ButtonSearch />
            </div>
            
        </div>
    );
}

