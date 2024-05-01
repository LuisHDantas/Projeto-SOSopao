import { Navbar } from "../components/Navbar";
import { CardItens } from "../components/CardItens";
import { ButtonSearch } from "../components/buttonSearch";
import { ButtonAdd } from "../components/buttonAdd";
import { DeletarEvento } from "../components/ModalDeletarEvento";
import { AddItem } from "../components/ModalAddItem";
import { useState, useEffect } from 'react';
import '../styles/itens.css';
import { Footer } from "../components/Footer";

export function Itens(){
    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreAddItem, setAddItem] = useState(false);

    function handleDelete(index) {
        /*const updatedData = dados.filter((_, i) => i !== index);
        setDados(updatedData);*/
        setAbreDeletar(false);
    
        /*if (index === selectedCardIndex) {
            setSelectedCardIndex(null); // Deselect the deleted card
        }*/
    }

    return(
        <div>
            <Navbar type='itens'/>
            <div id="add-search">
                <ButtonAdd onClick={() => setAddItem(!abreAddItem)}>
                    Adicionar Item
                </ButtonAdd>
                <ButtonSearch />
            </div>
            {abreDeletar && (
                <DeletarEvento
                    fechaDeletar={() => setAbreDeletar(!abreDeletar)}
                    index={0}
                    onDelete={handleDelete}
                />
            )} 

            {abreAddItem && 
                <AddItem 
                    fechaAddItem={() => setAddItem(!abreAddItem)}
                />
            }

            <div className='tela-fundo-branco' style={{
                filter: abreDeletar || abreAddItem ? 'blur(5px)' : 'none',
            }}>
                <div id="conteudo-itens">
                    <h2 id="titulo-itens">Itens no Estoque:</h2>
                    <CardItens
                        abreDeletar={() => {
                            setAbreDeletar(!abreDeletar);
                        }}
                    />
                    <CardItens
                        abreDeletar={() => {
                            setAbreDeletar(!abreDeletar);
                        }}
                    />
                    <CardItens
                        abreDeletar={() => {
                            setAbreDeletar(!abreDeletar);
                        }}
                    />
                </div>
            </div>
            
            
            <Footer/>
        </div>
    );
}