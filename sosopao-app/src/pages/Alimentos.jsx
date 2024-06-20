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
import { Loading } from "../components/Loading";


export function Alimentos(){
    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreAddAlimento, setAbreAddAlimento] = useState(false);
    const [abreAddItemAlimento, setAbreAddItemAlimento] = useState(false);

    const [loading, setLoading] = useState(true);

    const [superAlimentos, setSuperAlimentos] = useState([]);
    const [selectedSAlimento, setSelectedSAlimento] = useState(null);


    const [alimentos, setAlimentos] = useState({});

    async function getAllSuperAlimentos(){
        try{
            const result = await axios.get('/superalimento')

            if (result.status === 200) {
                setSuperAlimentos(result.data);
            }else{
                console.log(result.data);
            }

            setLoading(false);
        }
        catch(error){
            console.log("Erro GetAllSuperAlimentos: "+error);
            setLoading(false);
        }
    }

    async function handleAlimentoDelete(id) {
        try{
            const result = await axios.delete(`/superalimento/id/${id}`);
            if (result.status === 200) {
                setSuperAlimentos(anteriores => anteriores.filter(item => item.id !== id));
            }
            setAbreDeletar(false);
        }catch(error){
            console.log("Erro DeleteSuperAlimentos: " + error);
            setAbreDeletar(false);
        }
    }

    useEffect(() => {
        getAllSuperAlimentos();
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
                    index={selectedSAlimento}
                    onDelete={handleAlimentoDelete}
                >
                    Deseja EXCLUIR esse alimento?
                </ModalDeletar>
            )}

            {
                abreAddAlimento && 
                <AddAlimento 
                    setSuperAlimentos = {setSuperAlimentos}
                    fechaAddAlimento={() => setAbreAddAlimento(!abreAddAlimento)} 
                />
            }

            {
                abreAddItemAlimento && 
                <AddItemAlimento 
                    fechaAddItemAlimento={() => setAbreAddItemAlimento(!abreAddItemAlimento)}
                    idAlimento={selectedSAlimento}
                    setAlimentos={setAlimentos}
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
                                abreDeletar={() => {setAbreDeletar(!abreDeletar); setSelectedSAlimento(alimento.id)}}
                                setIdSuperAlimento= {setSelectedSAlimento} 
                                abreAddItemAlimento={() => setAbreAddItemAlimento(!abreAddItemAlimento)}
                                alimentos={alimentos}
                                setAlimentos={setAlimentos}
                            />
                        )
                    }
                </div>

                <Footer/>
            </div>
        </>
    );
}

