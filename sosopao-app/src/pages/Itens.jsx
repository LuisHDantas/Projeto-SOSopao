import { Navbar } from "../components/Navbar";
import { CardItens } from "../components/CardItens";
import { ButtonSearch } from "../components/buttonSearch";
import { ButtonAdd } from "../components/buttonAdd";
import { ModalDeletar } from "../components/ModalDeletar";
import { AddItem } from "../components/ModalAddItem";
import { useEffect, useState } from 'react';
import '../styles/itens.css';
import { Footer } from "../components/Footer";
import axios from "axios";

export function Itens(){
    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreAddItem, setAddItem] = useState(false);

    const [cardId, setCardId] = useState(null);

    const[item, setItem] = useState([]);

    function getAllItem() {
        axios.get('/item').then((result) => {
          if (result.status === 200) {
            setItem(result.data);
            console.log(result.data);
          }else{
            console.log(result.data);
          }
        })
        .catch((error) => {
            console.log(error);
        });
      }

    function deleteItem(id) {

        axios.delete(`/item/id/${id}`).then((result) => {

        if (result.status === 200) {
            setItem(anteriores => anteriores.filter(itens => itens.id !== id));
        }
        setAbreDeletar(false);
        });
    }

    useEffect(getAllItem, []);

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
                <ModalDeletar
                    fechaDeletar={() => setAbreDeletar(!abreDeletar)}
                    index={cardId}
                    onDelete={deleteItem}
                >
                    Deseja EXCLUIR esse item?
                </ModalDeletar>
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
                    
                    {
                        item?.map((itens) =>
                            <CardItens
                                key={itens.id}
                                nome = {itens.nome}
                                descricao = {itens.descricao}
                                abreDeletar={() => {
                                    setAbreDeletar(!abreDeletar);
                                    setCardId(itens.id);
                                    }
                                }
                            />
                        )
                    }

                </div>
            </div>
            
            
            <Footer/>
        </div>
    );
}