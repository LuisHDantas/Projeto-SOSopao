import { Navbar } from "../components/Navbar";
import { ButtonSearch } from "../components/buttonSearch";
import { ButtonAdd } from "../components/buttonAdd";
import '../styles/itens.css';


export function Itens(){
    return(
        <div>
            <Navbar type='itens'/>
            <div id="add-search">
                <ButtonAdd>
                    Adicionar item
                </ButtonAdd>
                <ButtonSearch />
            </div>
            <div id="title">
                <h1>Itens no Estoque:</h1>
            </div>
            
            
        </div>
    );
}