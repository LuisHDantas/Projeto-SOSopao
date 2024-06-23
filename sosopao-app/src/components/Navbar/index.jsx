import logo from '../../assets/images/logo.png'
import {FaBars, FaTimes} from 'react-icons/fa'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import { objectStore } from '../../constants';

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

    const toggleNavBar = () => {
        setMobileButton(!mobileButton);
        if (!mobileButton) {
            document.body.classList.add('navbar-visible');
        } else {
            document.body.classList.remove('navbar-visible');
        }
    };

    const handleNavLinkClick = () => {
        setMobileButton(false); // Close mobile menu
        document.body.classList.remove('navbar-visible'); // Restore scrolling
    };

    return (
        <header>
            <nav className="nav-navbar">
                <Link to={'/'}>
                    <img src={`${objectStore.MINIOURL}${objectStore.BUCKET}/logo.png`} alt="Logo SOS Sopão" />
                </Link>
                <ul id='navbar' 
                    className={
                        mobileButton ?
                        "#navbar visible":
                        "navbar"
                    }
                >
                    <li className={props.type === 'home'? "active" : ""}>
                        <Link to={'/'} className='link-navbar' onClick={handleNavLinkClick}>Home</Link>
                    </li>
                    <li className={props.type === 'alimentos'? 'active' : ''}>
                        <Link to={'/alimentos'} className='link-navbar' onClick={handleNavLinkClick}>Alimentos</Link>
                    </li>
                    <li className={props.type === 'itens'? 'active' : ''}>
                        <Link to={'/itens'} className='link-navbar' onClick={handleNavLinkClick}>Itens</Link>
                    </li>
                    <li className={props.type === 'eventos'? 'active' : ''}>
                        <Link to={'/eventos'} className='link-navbar' onClick={handleNavLinkClick}>Eventos</Link>
                    </li>
                    <li className={props.type === 'gerenciar'? 'active' : ''}>
                        <Link to={'/gerenciar'} className='link-navbar' onClick={handleNavLinkClick}>Gerenciar</Link>
                    </li>
                    <li className={props.type === 'rotas'? 'active' : ''}>
                        <Link to={'/rotas'} className='link-navbar' onClick={handleNavLinkClick}>Rotas</Link>
                    </li>
                    <li id="logout" onClick={() => {handleLogoutAuthProvider(); handleNavLinkClick();}}>
                        <Link className='link-navbar'>Logout</Link>
                    </li>
                </ul>
                <h4>Olá, {username}</h4>
                <div id='mobile'>
                    {
                        mobileButton ? 
                        <FaTimes onClick={toggleNavBar}/> :
                        <FaBars onClick={toggleNavBar}/>
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
