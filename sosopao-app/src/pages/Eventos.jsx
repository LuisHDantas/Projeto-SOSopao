import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CardEvento } from "../components/CardEvento";
import { DeletarEvento } from "../components/ModalDeletarEvento";
import { CadastroEvento } from "../components/ModalCadastroEvento";
// import { ButtonSearch } from "../components/buttomSearch";
// import { ButtonAdd, ButtonAddEvento } from "../components/buttonAddEvento";
import { useState } from 'react';
import '../styles/eventos.css';

export function Eventos(){
    const [dados, setDados] = useState([{nome: 'Natal 2025', data:'10-04-2025', descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.', url_imagem: 'https://www.receiteria.com.br/wp-content/uploads/sopa-de-carne-rotated.jpeg'},
    {nome: 'Dia das crianças', data: '12-10-2025', descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. ', url_imagem: 'https://www.receiteria.com.br/wp-content/uploads/sopa-de-carne-rotated.jpeg'},
    {nome: 'Dia dos pais', data: '08-08-2025', descricao: 'O melhor dia dos pais da sua vida', url_imagem: 'https://www.receiteria.com.br/wp-content/uploads/sopa-de-carne-rotated.jpeg'},
    ]);

    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreEditar, setAbreEditar] = useState(false);
    const [abreCadastro, setAbreCadastro] = useState(false);

    // converte data DD-MM-YYYY para objeto Date
    function parseDate(dateString) {
        const dateParts = dateString.split('-');
        let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        return dateObject;
    }


    return(
        <div>
            <Navbar type='eventos'/>

            <div id="add-search">
                <button onClick={() => setAbreCadastro(!abreCadastro)}>Adicionar evento</button>
                {/* <ButtonAddEvento />
                <ButtonSearch /> */}
            </div>

            {abreDeletar && <DeletarEvento fechaDeletar={() => setAbreDeletar(!abreDeletar)}/>}
            {/* {abreEditar && <EditarEvento fechaEditar={() => setAbreEditar(!abreEditar)}/>} */}
            {abreCadastro && <CadastroEvento fechaCadastro={() => setAbreCadastro(!abreCadastro)} dados={dados} setDados={setDados}/>}

            <div className='tela-fundo-branco' style={{
            // borra o fundo quando modal está aberto
            filter: abreCadastro || abreDeletar || abreEditar ? 'blur(5px)' : 'none',
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
                                    nome={evento.nome} 
                                    data={evento.data} 
                                    descricao={evento.descricao} 
                                    url_imagem={evento.url_imagem}
                                    abreEditar={() => setAbreEditar(!abreEditar)}
                                    abreDeletar={() => setAbreDeletar(!abreDeletar)}    
                                />
                            );
                        }
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
                                    nome={evento.nome} 
                                    data={evento.data} 
                                    descricao={evento.descricao} 
                                    url_imagem={evento.url_imagem}
                                    abreEditar={() => setAbreEditar(!abreEditar)}
                                    abreDeletar={() => setAbreDeletar(!abreDeletar)}    
                                />
                            );
                        }
                    })}
                </div>
            </div>

            
            <Footer />
        </div>
    );
}