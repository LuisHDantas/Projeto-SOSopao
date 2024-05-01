import { useState } from 'react';
import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';
import { ButtonEditEstoque } from '../buttomEditEstoque';
import { MdEdit } from "react-icons/md";
import './style.css'

export function CardItens(){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <div class="card-itens" onClick={() => setIsOpen(!isOpen)}>
                <div class="item-nome">
                    <h4>Nome:</h4>
                    <p>Camiseta P.</p>
                </div>
                <div class="item-descricao">
                    <h4>Descrição:</h4>
                    <p>Camiseta preta em bom estado. Localizado no estoque XX.</p>
                </div>
            </div>

            {
                isOpen && 
                <div className='new-container-itens'>
                    <ButtonEditEstoque>
                        <MdEdit/>
                    </ButtonEditEstoque>
                    <ButtonRemoveEstoque/>
                </div>
            }

        </>

    );
}