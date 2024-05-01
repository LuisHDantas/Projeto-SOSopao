import { Navbar } from "../components/Navbar";
import { CardItens } from "../components/CardItens";
import { ButtonSearch } from "../components/buttomSearch";
import { ButtonAdd } from "../components/buttonAdd";
import '../styles/itens.css';


export function Itens(){
    return(
        <div>
            <Navbar type='itens'/>
            <div id="add-search">
                <ButtonAdd>
                    Adicionar Item
                </ButtonAdd>
                <ButtonSearch />
            </div>
            <div id="conteudo-itens">
                <h2 id="titulo-itens">Itens no Estoque:</h2>
                <CardItens/>
                <CardItens/>
            </div>
            
            
        </div>
    );
}