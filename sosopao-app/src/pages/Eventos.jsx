import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CardEvento } from "../components/CardEvento";
// import { ButtonSearch } from "../components/buttomSearch";
// import { ButtonAdd, ButtonAddEvento } from "../components/buttonAddEvento";
import '../styles/eventos.css';

export function Eventos(){
    const data = [{nome: 'Natal 2025', data:'10/04/2025', descricao: 'O melhor natal da sua vida', url_imagem: 'https://www.receiteria.com.br/wp-content/uploads/sopa-de-carne-rotated.jpeg', ativo: true},
    {nome: 'Dia das crianças', data: '12/10/2025', descricao: 'O melhor dia das crianças da sua vida', url_imagem: 'https://www.receiteria.com.br/wp-content/uploads/sopa-de-carne-rotated.jpeg', ativo: true},
    {nome: 'Dia dos pais', data: '08/08/2025', descricao: 'O melhor dia dos pais da sua vida', url_imagem: 'https://www.receiteria.com.br/wp-content/uploads/sopa-de-carne-rotated.jpeg', ativo: false},
];

    return(
        <div>
            <Navbar type='eventos'/>

            <div id="add-search">
                {/* <ButtonAddEvento />
                <ButtonSearch /> */}
            </div>
            

            <div className="titulos-eventos">
                <h1>Eventos ativos</h1>
            </div>
            <div>


            <div className='container-eventos'>
                {data?.map((evento, index) => {
                    if(evento.ativo){
                        return(
                            <CardEvento key={index} nome={evento.nome} data={evento.data} descricao={evento.descricao} url_imagem={evento.url_imagem}/>
                        );
                    }
                })}
            </div>

            </div>
            <div className="titulos-eventos">
                <h1>Eventos passados</h1>
            </div>

            <div className='container-eventos'>
                {data?.map((evento, index) => {
                    if(!evento.ativo){
                        return(
                            <CardEvento key={index} nome={evento.nome} data={evento.data} descricao={evento.descricao} url_imagem={evento.url_imagem}/>
                        );
                    }
                })}
            </div>

            <Footer />
        </div>
    );
}