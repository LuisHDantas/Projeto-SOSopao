import logo from '../../assets/images/logo.png'
import {FaBars, FaTimes} from 'react-icons/fa'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import {Link} from 'react-router-dom'


import './style.css'
//import { useLocation } from 'react-router-dom';

/* 
    PROPRIEDADES OBRIGATORIAS:
    type: string    ->  Indica qual item da navbar vai estar marcado
*/
export function Navbar(props){
    const [mobileButton, setMobileButton] = useState(false);
    const { handleLogoutAuthProvider } = useContext(AuthContext);

    //const currentUrl = useLocation().pathname;

    return (
        <header>
            <nav className="nav-navbar">
                <Link to={'/'}><img src={logo} alt="Logo SOS Sopão" /></Link>
                <ul id='navbar' 
                    className={
                        mobileButton ?
                        "#navbar visible":
                        "navbar"
                    }
                >
                    <li className={props.type === 'home'? "active" : ""}>
                        <Link to={'/'} className='link-navbar'>Home</Link>
                    </li>
                    <li className={props.type === 'alimentos'? 'active' : ''}>
                        <Link to={'/alimentos'} className='link-navbar'>Alimentos</Link>
                    </li>
                    <li className={props.type === 'itens'? 'active' : ''}>
                        <Link to={'/itens'} className='link-navbar'>Itens</Link>
                    </li>
                    <li className={props.type === 'eventos'? 'active' : ''}>
                        <Link to={'/eventos'} className='link-navbar'>Eventos</Link>
                    </li>
                    <li className={props.type === 'gerenciar'? 'active' : ''}>
                        <Link to={'/gerenciar'} className='link-navbar'>Gerenciar</Link>
                    </li>
                    <li className={props.type === 'rotas'? 'active' : ''}>
                        <Link to={'/rotas'} className='link-navbar'>Rotas</Link>
                    </li>
                    <li id="logout" onClick={() => handleLogoutAuthProvider()}>
                        <Link className='link-navbar'>Logout</Link>
                    </li>
                </ul>
                <h4>Olá, {props.nome}</h4>
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
