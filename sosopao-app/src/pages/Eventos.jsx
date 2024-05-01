import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CardEvento } from "../components/CardEvento";
import { ModalDeletar } from "../components/ModalDeletar";
import { CadastroEvento } from "../components/ModalCadastroEvento";
import { ButtonAdd } from "../components/buttonAdd";
import { ButtonSearch } from "../components/buttonSearch";
import { useState, useEffect } from 'react';
import '../styles/eventos.css';

export function Eventos(){
    const [dados, setDados] = useState([{
    nome: 'Natal 2022', data:'25-12-2022', descricao: '', url_imagem: 'https://cdn.saocarlosagora.com.br/img/pc/780/530/dn_noticia/2019/12/138cd517-451b-484d-9558-db55861594bb-1.jpg?c=1'},
    {nome: 'Distribuição de marmitas', data: '12-10-2025', descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. ', url_imagem: 'https://instagram.fcpq2-1.fna.fbcdn.net/v/t39.30808-6/425658710_18045439750607931_6875790801116318969_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDYzeDEzMjkuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fcpq2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JosUI2e0-pEQ7kNvgGh0E69&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AfCbI4wtVbyMM3Q1sZ12RbN8UBsdb_ysjNKRn_43Z7FO4w&oe=66371787&_nc_sid=cf751b'},
    {nome: 'Aniversário do SOSopão', data: '08-08-2025', descricao: 'Parabéns!', url_imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQj27o7h70o5xq8D4-8gH6sdh_WyFqXQ_ygCTUKnlgQ&s'},
    ]);

    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreEditar, setAbreEditar] = useState(false);
    const [abreCadastro, setAbreCadastro] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);


    // converte data DD-MM-YYYY para objeto Date
    function parseDate(dateString) {
        if (!dateString) {
            return new Date();
        }

        const dateParts = dateString.split('-');
        let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        return dateObject;
    }

    function handleDelete(index) {
        const updatedData = dados.filter((_, i) => i !== index);
        setDados(updatedData);
        setAbreDeletar(false);

        if (index === selectedCardIndex) {
            setSelectedCardIndex(null); // Deselect the deleted card
        }
    }


    const updateDados = (index, newDados) => {
        setDados(prevState => prevState.map((item, i) => i === index ? newDados : item));
    };

    const handleUpdateCard = (index, newDados) => {


        updateDados(index, newDados);
        setSelectedCardIndex(null);
    };

    //use effect to see dados
    useEffect(() => {
        console.log(dados);
    }, [dados]);

    return(
        <div>
            <Navbar type='eventos'/>

            <div id="add-search">
                <ButtonAdd onClick={() => setAbreCadastro(!abreCadastro)}>
                    Adicionar evento
                </ButtonAdd>
                <ButtonSearch />
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

                <div className='container-eventos'>
                    {dados?.map((evento, index) => {
                        if(parseDate(evento.data) > new Date()){
                            return(
                                <CardEvento 
                                    key={index} 
                                    index={index}
                                    nome={evento.nome} 
                                    data={evento.data} 
                                    descricao={evento.descricao} 
                                    url_imagem={evento.url_imagem}
                                    finalizaEdicao={handleUpdateCard}
                                    
                                    abreEditar={() => {
                                        setAbreEditar(!abreEditar);
                                        setSelectedCardIndex(index);
                                    }}
                                    abreDeletar={() => {
                                        setAbreDeletar(!abreDeletar);
                                        setSelectedCardIndex(index);
                                        } 
                                    }  
                                    isSelectedEdit={selectedCardIndex === index} 
                                />
                            );
                        }else { return null;}
                    })}
                </div>

                </div>
                <div className="titulos-eventos">
                    <h1>Eventos passados</h1>
                </div>

                <div className='container-eventos'>
                    {dados?.map((evento, index) => {
                        if(parseDate(evento.data) <= new Date()){
                            return(
                                <CardEvento 
                                    key={index} 
                                    index={index}
                                    nome={evento.nome} 
                                    data={evento.data} 
                                    descricao={evento.descricao} 
                                    url_imagem={evento.url_imagem}
                                    finalizaEdicao={handleUpdateCard}
                                    
                                    abreEditar={() => {
                                        setAbreEditar(!abreEditar);
                                        setSelectedCardIndex(index);
                                    }}
                                    abreDeletar={() => {
                                        setAbreDeletar(!abreDeletar);
                                        setSelectedCardIndex(index);
                                        } 
                                    }  
                                    isSelectedEdit={selectedCardIndex === index} 
                                />
                            );
                        }else { return null;}
                    })}
                </div>
            </div>

            
            <Footer />
        </div>
    );
}