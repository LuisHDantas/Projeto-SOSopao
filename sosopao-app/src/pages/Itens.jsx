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
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    function getAllItem() {
        axios.get('/item').then((result) => {
          if(result.status === 200) {
            setItem(result.data);
            setLoading(false);
          }else{
            console.log(result.data);
            setLoading(false);
          }
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAndSortedItems = item
        .filter(itens => itens.nome.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.nome.localeCompare(b.nome));

    if (loading) return <p>Loading...</p>;

    return(
        <div>
            <Navbar type='itens'/>
            <div id="add-search">
                <ButtonAdd onClick={() => setAddItem(!abreAddItem)}>
                    Adicionar Item
                </ButtonAdd>
                <ButtonSearch handleSearch={handleSearch}/>
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
                    setItem={setItem}
                />
            }

            <div className='tela-fundo-branco' style={{
                filter: abreDeletar || abreAddItem ? 'blur(5px)' : 'none',
            }}>
                <div id="conteudo-itens">
                    <h2 id="titulo-itens">Itens no Estoque:</h2>
                    
                    {
                        filteredAndSortedItems.map((itens) =>
                            <CardItens
                                key={itens.id}
                                id = {itens.id}
                                nome = {itens.nome}
                                descricao = {itens.descricao}
                                quantidade = {itens.quantidade}
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