import { useState } from 'react';
import { ButtonEditEstoque } from '../buttomEditEstoque';
import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';
import { CardItemAlimento } from '../CardItemAlimento';
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import './style.css'


export function CardAlimentos(){
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const [nameText, setNameText] = useState('Macarrão');
    const [goalText, setGoalText] = useState(20);
    
    const urlFotoTeste = 'https://s2-receitas.glbimg.com/JAZaJrRJpVfXRP1BZwbAsUcuYLw=/0x0:1280x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2022/R/X/Lj3rwSQpm7BgzSEvJ1Mw/macarrao-simples-como-fazer.jpg';
    function openControllerCard(){
        if(isEdit)
            return null;

        if(isOpen){
            return null;
        }else{
            return setIsOpen(!isOpen);
        }
    }

    function openControllerInfos(){
        if(isEdit)
            return null;

        if(isOpen){
            return setIsOpen(!isOpen);
        }else{
            return null;
        }
    }

    return(
        <>
            <div className="card-alimentos" onClick={openControllerCard}>
                <div className="foto-btns-alimentos">
                    <div id='btn-remove-estoque'>
                        { isOpen && 
                            (
                                isEdit?
                                <ButtonRemoveEstoque style={{'opacity': 0.5}}/> :
                                <ButtonRemoveEstoque onClick={() => console.log("PAGINA DE DELETAR")}/>
                            )
                        }
                    </div>
                    
                    <img src={urlFotoTeste} alt="foto de perfil" onClick={openControllerInfos}/>
                    
                    <div id='btn-edit-estoque'>
                        { isOpen && 
                            (<ButtonEditEstoque onClick={() => setIsEdit(!isEdit)}>
                                {
                                    isEdit ?
                                    <FaCheck/>:
                                    <MdEdit/>
                                }
                            </ButtonEditEstoque>)
                        }
                    </div>
                </div>
                
                <div className='infos-alimentos' onClick={openControllerInfos}>
                    <div className="sub-info-alimentos">
                        <div className="info-alimentos">
                            <h4>Nome:</h4>
                            {
                                (
                                    isEdit ?
                                    <input type="text" className='input-alimento' value={nameText} name='nome' onChange={event => setNameText(event.target.value)}/>:
                                    <p>{nameText}</p>
                                )
                            }
                        </div>

                        <div className="info-alimentos">
                            <h4>Meta:</h4>
                            {
                                (
                                    isEdit ?
                                    <input type="number" className='input-alimento' value={goalText} name='meta' onChange={event => setGoalText(event.target.value)}/>:
                                    <p>{goalText}</p>
                                )
                            }
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

                <div className='btns-web'>
                    { isOpen && 
                        (
                            isEdit?
                            <ButtonRemoveEstoque style={{'opacity': 0.5}}/> :
                            <ButtonRemoveEstoque onClick={() => console.log("PAGINA DE DELETAR")}/>
                        )
                    }

                    { isOpen && 
                        (<ButtonEditEstoque onClick={() => setIsEdit(!isEdit)}>
                            {
                                isEdit ?
                                <FaCheck/>:
                                <MdEdit/>
                            }
                        </ButtonEditEstoque>)
                    }

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