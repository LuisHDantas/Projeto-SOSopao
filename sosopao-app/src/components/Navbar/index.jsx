
import logo from '../../assets/images/logo.png'
import {FaBars, FaTimes} from 'react-icons/fa'
import { useRef } from 'react';



import './style.css'


export function Navbar(){
    //useRef = uma informação que não precisa ser redenrizada
    const navRef = useRef();

    //Fica trocando a classe da navbar ao clicar no botão
    const showNavBar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <img src={logo} alt="Logo SOS Sopão" />
            <nav ref={navRef}>
                <a href="/#">HOME</a>
                <a href="/#">ESTOQUE DE ALIMENTOS</a>
                <a href="/#">ESTOQUE DE ITENS</a>
                <a href="/#">EVENTOS</a>
                <a href="/#">ROTAS</a>
                <a href="/#">GERENCIAR</a>
                <a href="/#">LOGOUT</a>

                <button className='nav-btn nav-close-btn' onClick={showNavBar}>
                    <FaTimes />
                </button>
            </nav>
            <button className='nav-btn' onClick={showNavBar}>
                <FaBars />
            </button>
        </header>
    );
}