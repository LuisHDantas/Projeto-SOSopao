import { Navbar } from "../components/Navbar";
import { CardAlimentos } from "../components/CardAlimentos";
import { ButtonSearch } from "../components/buttonSearch";
import { ButtonAdd } from "../components/buttonAdd";
import {Footer} from "../components/Footer";
import '../styles/alimentos.css';
import { useContext } from "react";
import { AddAlimento } from "../components/ModalAddAlimento";
import { AddItemAlimento } from "../components/ModalAddItemAlimento";
import { AlimentosContext } from "../Context/AlimentosContext";
import { Loading } from "../components/Loading";
import { ModalDeletarAlimentos } from "../components/ModalDeletarAlimentos";


export function Alimentos(){

    const { 
        abreDeletar, //Estado Modal 
        abreAddSuperAlimento,//Estado Modal
        abreAddAlimento,//Estado Modal
        loadingPagAlimentos, //Estado local
        toggleModalAddSuperalimento, //Função

        superAlimentos //ESTADO CARD SUPERALIMENTOS
    }= useContext(AlimentosContext);

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
                <ModalDeletarAlimentos>
                    Deseja EXCLUIR esse alimento?
                </ModalDeletarAlimentos>
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
                    {
                        loadingPagAlimentos?
                        <Loading/>
                        :
                        superAlimentos?.map((alimento) =>
                            <CardAlimentos 
                                key={alimento.id}
                                id={alimento.id}
                                nome={alimento.nome}
                                meta={alimento.meta}
                                quantidade={alimento.quantidade}
                                un_medida={alimento.unidade_medida}
                                url_imagem={alimento.url_imagem}
                            />
                        )
                    }
                </div>
                <Footer/>
            </div>
        </>
    );
}

