import './style.css';
import { contatos } from '../../constants';
import { BsTelephoneFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosGlobe, IoLogoWhatsapp, IoLogoFacebook, IoLogoInstagram } from "react-icons/io";
import { IconContext } from "react-icons";
import { useEffect } from 'react';

export function Footer(){

    useEffect(() => {
        function updateFooterPosition() {
            const bodyHeight = document.body.clientHeight;
            const windowHeight = window.innerHeight;

            const footer = document.querySelector('footer');
            let footerHeight = footer.getBoundingClientRect().height;

            const isFooterFixed = footer.style.position == 'fixed';
         
            if (!isFooterFixed) {
                footerHeight = 0;
            }
         
            if (bodyHeight + footerHeight < windowHeight) {
                document.querySelector('footer').style.position = 'fixed';
                document.querySelector('footer').style.bottom = '0';
            } else {
                document.querySelector('footer').style.position = 'static';
                document.querySelector('footer').style.bottom = 'auto';
            }
        }

        updateFooterPosition();

        const observer = new MutationObserver(updateFooterPosition);

        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true,
        });

        window.addEventListener('resize', updateFooterPosition);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateFooterPosition);
        };
    }, []);

    return(
        <footer>
            <h2>Contato</h2>

            <div className='contato'>
                <div id="informacoes-contato">
                    <div className='contato-container'>
                        <IconContext.Provider value={{ color: "#038C8C", className: "global-class-name" }}>
                            <div>
                                <BsTelephoneFill /> 
                            </div>
                        </IconContext.Provider>
                        <p>{contatos.TELEFONE}</p>
                    </div>

                    <div className='contato-container'>
                        <IconContext.Provider value={{ color: "#038C8C", className: "global-class-name" }}>
                            <div>
                                <MdAlternateEmail />
                            </div>
                        </IconContext.Provider>
                        <p>{contatos.EMAIL}</p>
                    </div>

                    <div className='contato-container'>
                        <IconContext.Provider value={{ color: "#038C8C", className: "global-class-name" }}>
                            <div>
                                <IoLocationSharp />
                            </div>
                        </IconContext.Provider>
                        <p>{contatos.ENDERECO}</p>
                    </div>
                    
                
                    <div className='contato-container'>
                        <IconContext.Provider value={{ color: "#038C8C", className: "global-class-name" }}>
                            <div>
                                <IoIosGlobe />
                            </div>
                        </IconContext.Provider>
                        <p>{contatos.CIDADE}</p>
                    </div>
                </div>


                <div className='redes-sociais'>
                    <IconContext.Provider value={{ color: "#038C8C", size: "1.5em", className: "global-class-name" }}>
                        <div className='icones-redes-sociais'>
                            <a href={contatos.WHATSAPP} target="_blank" rel="noreferrer"><IoLogoWhatsapp /></a>
                            <a href={contatos.FACEBOOK} target="_blank" rel="noreferrer"><IoLogoFacebook /></a>
                            <a href={contatos.INSTAGRAM} target="_blank" rel="noreferrer"><IoLogoInstagram /></a>
                        </div>
                    </IconContext.Provider>
                </div>

            </div>
        </footer>
    )
}
