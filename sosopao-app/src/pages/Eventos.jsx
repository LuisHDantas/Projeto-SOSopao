import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CardEvento } from "../components/CardEvento";
import { ModalDeletar } from "../components/ModalDeletar";
import { CadastroEvento } from "../components/ModalCadastroEvento";
import { ButtonAdd } from "../components/buttonAdd";
import { ButtonSearch } from "../components/buttonSearch";
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/eventos.css';
import { Loading } from "../components/Loading";

const DataFetcher = async (setDados, setLoading, setError) => {
    try {
        const response = await axios.get('eventos');
        setDados(response.data);
        setLoading(false);
    } catch (error) {
        setError(error);
        setLoading(false);
    }
};

export function Eventos(){

    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreEditar, setAbreEditar] = useState(false);
    const [abreCadastro, setAbreCadastro] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        DataFetcher(setDados, setLoading, setError);
    }, []);

    useEffect(() => {
        const sortedDados = [...dados].sort((a,b) => new Date(b.data) - new Date(a.data));
        
        const filtered = sortedDados.filter(evento => evento.nome.toLowerCase().includes(searchTerm.toLowerCase()));

        setFilteredEvents(filtered);

        }, [dados, searchTerm]);

    if (error) return <p>Error: {error.message}</p>;


    const handleDeleteRequest = async (id) => {
        try {
            await axios.delete(`eventos/${id}`);
            return true;
        } catch (error) {
            console.error("Erro ao deletar o evento:", error);
            return false;
        }
    };

    const handleDelete = async (index) => {
        const eventoId = dados[index].id_evento;
        const deleteSuccess = await handleDeleteRequest(eventoId);

        if (deleteSuccess) {
            const updatedData = dados.filter((_, i) => i !== index);
            setDados(updatedData);
            setAbreDeletar(false);

            if (index === selectedCardIndex) {
                setSelectedCardIndex(null);
            }
        }
    };


    const updateDados = (index, newDados) => {
        setDados(prevState => prevState.map((item, i) => i === index ? newDados : item));
    };


    const handleUpdateCard = async (index, newDados, form) => {
        try {
            const { id_evento } = newDados;

            //tenta uma requisição com o servidor
            const response = await axios.put(`/eventos/${id_evento}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if(response.data.url_imagem){
                newDados.url_imagem = response.data.url_imagem;
            }

            if (response.status === 200) {
                // Se a atualização for bem-sucedida, atualiza os dados no estado local
                updateDados(index, newDados);
                setSelectedCardIndex(null);
            } else {
                console.error('Erro ao atualizar o evento:', response.statusText);
            }
        } catch (error) {
            if (error.response.data.parameters[1] === "Invalid date"){
                alert("Insira uma data válida");
            }
            console.error('Erro ao atualizar o evento:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return(
        <div>
            <Navbar type='eventos'/>

            <div id="add-search">
                <ButtonAdd onClick={() => setAbreCadastro(!abreCadastro)}>
                    Adicionar evento
                </ButtonAdd>
                <ButtonSearch handleSearch={handleSearch}/>
            </div>

            {abreDeletar && (
                <ModalDeletar
                    fechaDeletar={() => {
                        setAbreDeletar(!abreDeletar);
                        setSelectedCardIndex(null);
                    }}
                    index={selectedCardIndex}
                    onDelete={handleDelete}
                >
                    Deseja EXCLUIR esse evento?
                </ModalDeletar>
            )}

            {abreCadastro && <CadastroEvento fechaCadastro={() => setAbreCadastro(!abreCadastro)} dados={dados} setDados={setDados}/>}

            <div className='tela-fundo-branco' style={{
            // borra o fundo quando modal está aberto
            filter: abreCadastro || abreDeletar ? 'blur(5px)' : 'none',
            }}>
                
                <div className="titulos-eventos">
                    <h1>Eventos ativos</h1>
                </div>
                <div>

                {
                    loading? <Loading/> :
                    <div className='container-eventos'>
                        {filteredEvents?.map((evento, index) => {
                            if(new Date(evento.data) > new Date()){

                                const dados_index = dados.findIndex(item => item.id_evento === evento.id_evento);

                                return(
                                    <CardEvento 
                                        key={evento.id_evento} 
                                        index={dados_index}
                                        id_evento={evento.id_evento}
                                        nome={evento.nome} 
                                        data={evento.data} 
                                        descricao={evento.descricao} 
                                        url_imagem={evento.url_imagem}
                                        finalizaEdicao={handleUpdateCard}
                                        
                                        abreEditar={() => {
                                            setAbreEditar(!abreEditar);
                                            setSelectedCardIndex(dados_index);
                                        }}
                                        abreDeletar={() => {
                                            setAbreDeletar(!abreDeletar);
                                            setSelectedCardIndex(dados_index);
                                            } 
                                        }  
                                        isSelectedEdit={selectedCardIndex === dados_index} 
                                    />
                                );
                            }else { return null;}
                        })}
                    </div>
                }

                </div>
                <div className="titulos-eventos">
                    <h1>Eventos passados</h1>
                </div>

                {
                    loading? <Loading/> :
                    <div className='container-eventos'>
                        {filteredEvents?.map((evento, index) => {
                            if(new Date(evento.data) <= new Date()){
            
                                const dados_index = dados.findIndex(item => item.id_evento === evento.id_evento);

                                return(
                                    <CardEvento 
                                        key={evento.id_evento} 
                                        index={dados_index}
                                        id_evento={evento.id_evento}
                                        nome={evento.nome} 
                                        data={evento.data} 
                                        descricao={evento.descricao} 
                                        url_imagem={evento.url_imagem}
                                        finalizaEdicao={handleUpdateCard}
                                        
                                        abreEditar={() => {
                                            setAbreEditar(!abreEditar);
                                            setSelectedCardIndex(dados_index);
                                        }}
                                        abreDeletar={() => {
                                            setAbreDeletar(!abreDeletar);
                                            setSelectedCardIndex(dados_index);
                                            } 
                                        }  
                                        isSelectedEdit={selectedCardIndex === dados_index} 
                                    />
                                );
                            }else { return null;}
                        })}
                    </div>
                }
            </div>

            
            <Footer />
        </div>
    );
}
