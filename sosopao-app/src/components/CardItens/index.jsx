import { useState } from 'react';
import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';
import { ButtonEditEstoque } from '../buttomEditEstoque';
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import './style.css'

export function CardItens({abreDeletar=null}){

    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [nameText, setNameText] = useState("Camiseta P.");
    const [descriptionText, setDescriptionText] = useState("Camiseta preta em bom estado. Localizado no estoque XX.");

    function openControllerCard(){
        if(isOpen && !isEdit){
            return setIsOpen(!isOpen);
        }else if(!isOpen){
            return setIsOpen(!isOpen);
        }
        return null;
    }

    return(
        <>
            <div className="card-itens" onClick={() => openControllerCard()}>
                <div className="item-nome">
                    <h4>Nome:</h4>
                    { isEdit ?(
                        <input className="input-editavel-nome-itens" type="text" value={nameText} name="nome" onChange={event => setNameText(event.target.value)} />
                    ) : ( <p>{nameText}</p>   
                    )}
                    
                    
                </div>
                <div className="item-descricao">
                    <h4>Descrição:</h4>
                    { isEdit ?(
                        <textarea className="input-editavel-descricao-itens" value={descriptionText} name="descricao" onChange={event => setDescriptionText(event.target.value)}></textarea>
                    ) : ( <p>{descriptionText}</p>   
                    )}
                </div>
            </div>

            {
                isOpen && 
                (<div className='new-container-itens'>
                    <ButtonEditEstoque onClick={() => setIsEdit(!isEdit)}>
                        { isEdit?
                            <FaCheck/>:
                            <MdEdit/>
                        }
                    </ButtonEditEstoque>
                    { isEdit?
                        <ButtonRemoveEstoque style={{'opacity': 0.5}}/>:
                        <ButtonRemoveEstoque onClick={abreDeletar}/>
                    }
                </div>)
            }

        </>

    );
}