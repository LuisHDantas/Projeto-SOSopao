import { Navbar } from "../components/Navbar";
import { CardAlimentos } from "../components/CardAlimentos";
import { ButtonSearch } from "../components/buttonSearch";
import { ButtonAdd } from "../components/buttonAdd";
import {Footer} from "../components/Footer";
import {ModalDeletar} from "../components/ModalDeletar";
import '../styles/alimentos.css';
import { useContext } from "react";
import { AddAlimento } from "../components/ModalAddAlimento";
import { AddItemAlimento } from "../components/ModalAddItemAlimento";
import { AlimentosContext } from "../Context/AlimentosContext";


export function Alimentos(){

    const { 
        abreDeletar, //Estado 
        abreAddSuperAlimento,//Estado
        abreAddAlimento,//Estado
        toggleModalAddSuperalimento, //Função
        toggleModalDeletar, //Função
        handleAlimentoDelete, //Função
    } 
    = useContext(AlimentosContext);


    return(
        <>
            <Navbar type='alimentos'/>
            <div id="add-search">
                <ButtonAdd  onClick={toggleModalAddSuperalimento}>
                    Adicionar Alimento
                </ButtonAdd>
                <ButtonSearch />
            </div>

            {abreDeletar && (
                <ModalDeletar
                    fechaDeletar={toggleModalDeletar}
                    index={0}
                    onDelete={handleAlimentoDelete}
                >
                    Deseja EXCLUIR esse alimento?
                </ModalDeletar>
            )}

            {
                abreAddSuperAlimento && 
                <AddAlimento/>
            }

            {
                abreAddAlimento && 
                <AddItemAlimento />
            }


            <div className='tela-fundo-branco' style={{
                // borra o fundo quando modal está aberto
                filter: abreAddSuperAlimento || abreAddAlimento || abreDeletar ? 'blur(5px)' : 'none',
                margin: 0,
            }}>
                <div id="conteudo-alimentos">
                    <h2 id="titulo-alimentos">Alimentos no Estoque:</h2>

                </div>

                <Footer/>
            </div>
        </>
    );
}

