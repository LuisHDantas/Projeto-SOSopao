import { useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ButtonAdd } from "../components/buttonAdd";
import { ModalDeletar } from "../components/ModalDeletar";
import { CadastroParada } from '../components/ModalCardastroParada';
import { CardParada } from '../components/cardParada';
import map from '../assets/images/map.png'
import '../styles/rotas.css';
import  axios  from 'axios';

const DataFetcher = async (setDados, setLoading, setError) => {
    try {
        const response = await axios.get('pontoparada');
        setDados(response.data);
        setLoading(false);
    } catch (error) {
        setError(error);
        setLoading(false);
    }
};

export function Rotas(){

    const [dados, setDados] = useState([]);

    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreAddRota, setAbreAddRota] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(null);

    useEffect(() => {
        DataFetcher(setDados, setLoading, setError);
    }, []);

    const handleDeleteRequest = async (id) => {
        try {
            await axios.delete(`pontoparada/${id}`);
            return true;
        } catch (error) {
            console.error("Erro ao deletar a parada:", error);
            return false;
        }
    };


    const handleDelete = async (index) => {
        const paradaID = dados[index].posicao;
        const deleteSuccess = await handleDeleteRequest(paradaID);

        if (deleteSuccess) {
            let updatedData = dados.filter((_, i) => i !== index);
            updatedData.forEach((item, idx) => {
                if(idx >= index) {
                    item.posicao -= 1;
                }
            });

            console.log(updatedData);
            setDados(updatedData);
            setAbreDeletar(false);
        }
    };

     return (
        <div>
            <Navbar type='rotas'/>

            {abreAddRota && (
                <CadastroParada
                    fechaCadastro={() => setAbreAddRota(!abreAddRota)}
                    dados={dados}
                    setDados={setDados}
                >
                </CadastroParada>
            )}

            {abreDeletar && (
                <ModalDeletar
                    fechaDeletar={() => setAbreDeletar(!abreDeletar)}
                    onDelete={handleDelete}
                    index={clickedIndex}
                >
                    Deseja EXCLUIR esse ponto de parada?
                </ModalDeletar>
            )}

            <div 
            style={{
                filter: abreDeletar || abreAddRota ? 'blur(5px)' : 'none',
            }}
            >

                <div id='btn-add-parada'>
                    <ButtonAdd onClick={() => setAbreAddRota(!abreAddRota)}>
                        Adicionar parada
                    </ButtonAdd>
                </div>

                <div className='titulos-rotas'>
                    <h1>Pontos de parada</h1>
                </div>

                <div className='container-paradas'>

                    <img src={map} alt="Mapa de rotas" />

                    {dados?.map((rota, index) => {
                        return(
                            <CardParada
                                key={index}
                                posicao={rota.posicao}
                                parada={rota.descricao} 

                                abreDeletar={() => {
                                    setAbreDeletar(!abreDeletar);
                                    setClickedIndex(index);
                                    }
                                }  
                            />
                        );}
                    )
                    }

                </div>

                <Footer />

            </div>

        </div>
    );

}
