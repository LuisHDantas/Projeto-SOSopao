import { Navbar } from "../components/Navbar";
import { CardAlimentos } from "../components/CardAlimentos";
import { ButtonSearch } from "../components/buttonSearch";
import { ButtonAdd } from "../components/buttonAdd";
import {Footer} from "../components/Footer";
import {ModalDeletar} from "../components/ModalDeletar";
import '../styles/alimentos.css';
import { useEffect, useState } from "react";
import { AddAlimento } from "../components/ModalAddAlimento";
import { AddItemAlimento } from "../components/ModalAddItemAlimento";
import axios from "axios";


export function Alimentos(){
    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreAddAlimento, setAbreAddAlimento] = useState(false);
    const [abreAddItemAlimento, setAbreAddItemAlimento] = useState(false);

    function handleDelete(index) {
        /* const updatedData = dados.filter((_, i) => i !== index);
        setDados(updatedData); */
        setAbreDeletar(false);

        /* if (index === selectedCardIndex) {
            setSelectedCardIndex(null); // Deselect the deleted card
        } */
    }

    return(
        <>
            <Navbar type='alimentos'/>
            <div id="add-search">
                <ButtonAdd  onClick={() => setAbreAddAlimento(!abreAddAlimento)}>
                    Adicionar Alimento
                </ButtonAdd>
                <ButtonSearch />
            </div>

            {abreDeletar && (
                <ModalDeletar
                    fechaDeletar={() => setAbreDeletar(!abreDeletar)}
                    index={0}
                    onDelete={handleDelete}
                >
                    Deseja EXCLUIR esse alimento?
                </ModalDeletar>
            )}

            {
                abreAddAlimento && 
                <AddAlimento 
                    fechaCadastro={() => setAbreAddAlimento(!abreAddAlimento)} 
                />
            }

            {
                abreAddItemAlimento && 
                <AddItemAlimento 
                    fechaCadastro={() => setAbreAddItemAlimento(!abreAddItemAlimento)} 
                />
            }


            <div className='tela-fundo-branco' style={{
                // borra o fundo quando modal está aberto
                filter: abreAddItemAlimento || abreAddAlimento || abreDeletar ? 'blur(5px)' : 'none',
                margin: 0,
            }}>

                <div id="conteudo-alimentos">
                    <h2 id="titulo-alimentos">Alimentos no Estoque:</h2>

                    <CardAlimentos 
                        abreDeletar={() => {
                                setAbreDeletar(!abreDeletar);
                            } 
                        } 

                        abreAddItemAlimento={() => {
                                setAbreAddItemAlimento(!abreAddItemAlimento);
                            } 
                        } 
                         
                    />
                    <CardAlimentos 
                        abreDeletar={() => {
                                setAbreDeletar(!abreDeletar);
                            } 
                        }

                        abreAddItemAlimento={() => {
                                setAbreAddItemAlimento(!abreAddItemAlimento);
                            } 
                        }
                    />
                    <CardAlimentos 
                        abreDeletar={() => {
                                setAbreDeletar(!abreDeletar);
                            } 
                        }

                        abreAddItemAlimento={() => {
                                setAbreAddItemAlimento(!abreAddItemAlimento);
                            } 
                        }
                    />

                </div>

                <Footer/>
            </div>
        </>
    );
}

