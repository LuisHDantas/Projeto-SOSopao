import { useState } from 'react';
import { ButtonEditEstoque } from '../buttomEditEstoque';
import { CardItemAlimento } from '../CardItemAlimento';
import './style.css'


export function CardAlimentos(){
    const [isOpen, setIsOpen] = useState(false);
    
    return(
        <>
            <div className="card-alimentos" onClick={() => setIsOpen(!isOpen)}>
                <div className="foto-btns-alimentos">
                    <img src="https://avatars.githubusercontent.com/u/45525241?v=4" alt="foto de perfil" />
                    <ButtonEditEstoque />
                </div>
                
                <div className='infos-alimentos'>
                    <div className="sub-info-alimentos">
                        <div className="info-alimentos">
                            <h4>Nome:</h4>
                            <p>Macarrão</p>
                        </div>

                        <div className="info-alimentos">
                            <h4>Meta:</h4>
                            <p>20</p>
                        </div>
                    </div>
                    

                    <div className="sub-info-alimentos">
                        <div className="info-alimentos">
                            <h4>Validade:</h4>
                            <p>XX/XX/XXXX</p>
                        </div>
                        <div className="info-alimentos">
                            <h4>Qtd Atual:</h4>
                            <p>10</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {
                isOpen && 
                <div className='new-container-alimentos'>
                    <button className='button-add-itenzinho'>+ Adicionar Item</button>
                    <CardItemAlimento/>
                </div>
            }

        </>
    );
}