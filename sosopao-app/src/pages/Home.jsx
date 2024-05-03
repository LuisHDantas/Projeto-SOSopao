import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import '../styles/home.css';

export function Home(){
    return(
        <>
            
            <Navbar type='home'/>

            <div id="tituloUsuario">
                <h1>Olá, *usuário*</h1>
            </div>

            <div id="conteudoGuia">
                <p>Através da aba de navegação no canto superior direito, você pode acessar as seguintes páginas: </p>

                <ul>
                    <li>Estoque de Alimentos: nessa página, é possível visualizar e gerir o estoque de alimentos, criando e editando categorias de alimentos e itens individuais de cada categoria.</li>
                    <li>Estoque de Itens: nessa página, é possível visualizar e gerir o estoque de itens de vestuário e pessoais, criando e editando categorias de itens e itens individuais de cada categoria.</li>
                    <li>Eventos: nessa página, é possivel visualizar e gerir os eventos ativos e já realizados, editando suas informações e imagens.</li>
                    <li>Rotas: nessa página, é possivel visualizar os pontos da rota de distribuição, removê-los, reordená-los, ou adicionar um novo ponto à rota.</li>
                    <li>Painel de Controle: nessa página, é possível alterar suas informações de usuário, criar e gerir a lista de usuários administradores, alterar as informações de contato disponíveis no site e alterar  o QR Code para doações via PIX.</li>
                </ul>
            </div>

            <Footer/>
            
        </>
    );
}