import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import '../styles/home.css';
import {useState, useEffect } from 'react';


export function Home(){

    const [username, setUsername] = useState('usuário');

    useEffect(() => {
        let storedUsername = localStorage.getItem("nome");

        // Remover aspas
        if (storedUsername) {
            try {
                storedUsername = storedUsername.slice(1,-1);
                setUsername(storedUsername);
            } catch (e) {
                setUsername('usuário');
                console.error(e);
            }
        }
        else {
            setUsername('usuário');
        }

    }, []);

    return(
        <>
            
            <Navbar type='home' />

            <div id="tituloUsuario">
                <h1>Olá, {username}!</h1>
            </div>

            <div id="conteudoGuia">
                <p id="guia">Através da aba de navegação no canto superior direito, você pode acessar as seguintes páginas: </p>

                <ul>
                    <li><p id="inline">Estoque de Alimentos:</p> nessa página, é possível visualizar e gerir o estoque de alimentos, criando e editando categorias de alimentos e itens individuais de cada categoria.</li>
                    <li><p id="inline">Estoque de Itens:</p> nessa página, é possível visualizar e gerir o estoque de itens de vestuário e pessoais, criando e editando categorias de itens e itens individuais de cada categoria.</li>
                    <li><p id="inline">Eventos:</p> nessa página, é possivel visualizar e gerir os eventos ativos e já realizados, editando suas informações e imagens.</li>
                    <li><p id="inline">Rotas:</p> nessa página, é possivel visualizar os pontos da rota de distribuição, removê-los, reordená-los, ou adicionar um novo ponto à rota.</li>
                    <li><p id="inline">Painel de Controle:</p> nessa página, é possível alterar suas informações de usuário, criar e gerir a lista de usuários administradores, alterar as informações de contato disponíveis no site e alterar  o QR Code para doações via PIX.</li>
                </ul>
            </div>

            <div id="creditos">
                <p>Projeto desenvolvido no curso de Ciências de Computação (ICMC/USP) no ano de 2024</p>

                
                <p> <strong>Desenvolvedores:</strong> Camila Donda Ronchi, Gabriel Sousa Santos de Almeida, João Gabriel Manfré Nazar, João Pedro Mori Machado, Lucas Piovani Ferreira e Luís Henrique Giorgetti Dantas.</p>

                <p></p>
            </div>

            

            <Footer/>
            
        </>
    );
}
