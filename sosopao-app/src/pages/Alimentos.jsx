import { Navbar } from "../components/Navbar";
import { CardAlimentos } from "../components/CardAlimentos";
import { ButtonSearch } from "../components/buttonSearch";
import { ButtonAdd } from "../components/buttonAdd";
import '../styles/alimentos.css';


export function Alimentos(){
    return(
        <div>
            <Navbar type='alimentos'/>
            <div id="add-search">
                <ButtonAdd>
                    Adicionar alimento
                </ButtonAdd>
                <ButtonSearch />
            </div>

            <div id="conteudo-alimentos">
                <h2 id="titulo-alimentos">Alimentos no Estoque:</h2>

                <CardAlimentos />
                <CardAlimentos />

            </div>
            
        </div>
    );
}

