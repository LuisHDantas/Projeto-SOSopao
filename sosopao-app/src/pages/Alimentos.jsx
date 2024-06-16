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
import { Box, CircularProgress } from "@mui/material";


export function Alimentos(){
    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreAddAlimento, setAbreAddAlimento] = useState(false);
    const [abreAddItemAlimento, setAbreAddItemAlimento] = useState(false);

    const [loading, setLoading] = useState(true);

    const [superAlimentos, setSuperAlimentos] = useState([]);

    function getAllSuperAlimentos(){
        axios.get('/superalimento')
        .then((result) => {
            if (result.status === 200) {
                console.log(result.data)
                setSuperAlimentos(result.data);
            }else{
                console.log(result.data);
            }
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    function handleDelete(index) {
        /* const updatedData = dados.filter((_, i) => i !== index);
        setDados(updatedData); */
        setAbreDeletar(false);

        /* if (index === selectedCardIndex) {
            setSelectedCardIndex(null); // Deselect the deleted card
        } */
    }


    useEffect(() => {
        getAllSuperAlimentos();
        setLoading(false);
    },[]);

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

                    {
                        loading?
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress 
                                sx={{
                                    color: '#038C8C'
                                }}
                                size={50}
                            />
                        </Box>
                        :

                        superAlimentos?.map((alimento) =>
                            <CardAlimentos 
                                key={alimento.id_alimento}
                                nome={alimento.nome}
                                meta={alimento.meta}
                                abreDeletar={() => setAbreDeletar(!abreDeletar)} 
                                abreAddItemAlimento={() => setAbreAddItemAlimento(!abreAddItemAlimento)} 
                            />
                        )
                    }
                </div>

                <Footer/>
            </div>
        </>
    );
}

