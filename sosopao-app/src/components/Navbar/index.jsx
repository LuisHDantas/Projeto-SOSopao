import logo from '../../assets/images/logo.png'
import {FaBars, FaTimes} from 'react-icons/fa'
import { useState } from 'react'


import './style.css'
//import { useLocation } from 'react-router-dom';

/* 
    PROPRIEDADES OBRIGATORIAS:
    type: string    ->  Indica qual item da navbar vai estar marcado
*/
export function Navbar(props){
    const [mobileButton, setMobileButton] = useState(false);

    //const currentUrl = useLocation().pathname;

    return (
        <header>
            <nav>
                <img src={logo} alt="Logo SOS Sopão" />
                <ul id='navbar' 
                    className={
                        mobileButton ?
                        "#navbar visible":
                        "navbar"
                    }
                >
                    <li className={props.type === 'home'? "active" : ""}>
                        <a  href="/#">Home</a>
                    </li>
                    <li className={props.type === 'alimentos'? 'active' : ''}>
                        <a  href="/#">Alimentos</a>
                    </li>
                    <li className={props.type === 'itens'? 'active' : ''}>
                        <a  href="/#">Itens</a>
                    </li>
                    <li className={props.type === 'eventos'? 'active' : ''}>
                        <a  href="/#">Eventos</a>
                    </li>
                    <li className={props.type === 'gerenciar'? 'active' : ''}>
                        <a  href="/#">Gerenciar</a>
                    </li>
                    <li className={props.type === 'rotas'? 'active' : ''}>
                        <a  href="/#">Rotas</a>
                    </li>
                    <li id="logout">
                        <a  href="/#">Logout</a>
                    </li>
                </ul>
                <h4>Olá, Nome</h4>
                <div id='mobile'>
                    {
                        mobileButton ? 
                        <FaTimes onClick={() => setMobileButton(!mobileButton)}/> :
                        <FaBars onClick={() =>setMobileButton(!mobileButton)}/>
                    }
                </div>
            </nav>
        </header>
    );
}

/* 
                    <li className={/^\//.test(currentUrl)? "active" : ""}>
                        <a  href="/#">Home</a>
                    </li>
                    <li className={/^\/alimentos/.test(currentUrl)? 'active' : ''}>
                        <a  href="/#">Alimentos</a>
                    </li>
                    <li className={/^\/itens/.test(currentUrl)? 'active' : ''}>
                        <a  href="/#">Itens</a>
                    </li>
                    <li className={/^\/eventos/.test(currentUrl)? 'active' : ''}>
                        <a  href="/#">Eventos</a>
                    </li>
                    <li className={/^\/gerenciar/.test(currentUrl)? 'active' : ''}>
                        <a  href="/#">Gerenciar</a>
                    </li>
                    <li className={/^\/rotas/.test(currentUrl)? 'active' : ''}>
                        <a  href="/#">Rotas</a>
                    </li>
                    <li id="logout">
                        <a  href="/#">Logout</a>
                    </li>
*/