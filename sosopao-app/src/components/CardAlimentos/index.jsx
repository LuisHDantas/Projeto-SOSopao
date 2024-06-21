import { useCallback, useContext, useEffect, useState } from 'react';
import { ButtonEditEstoque } from '../buttomEditEstoque';
import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';
import { CardItemAlimento } from '../CardItemAlimento';
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import './style.css'
import axios from 'axios';
import { Loading } from '../Loading';
import { AlimentosContext } from '../../Context/AlimentosContext';


export function CardAlimentos({...props}){
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const [loadingCard, setLoadingCard] = useState(true);
    const [loadingCardEdit, setLoadingCardEdit] = useState(false);

    const [nameText, setNameText] = useState(props? props.nome:"");
    const [goalText, setGoalText] = useState(props? props.meta:"");



    const {
        buttonDeletarSuperAlimento,
        buttonAddAlimento,
        alimentos,
        setAlimentos
    }= useContext(AlimentosContext);


    
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


    const getAllAlimentos = useCallback(async ()=>{
        try{
            const result = await axios.get(`/superalimento/${props.id}/alimentos`);
            if (result.status === 200) {
                //console.log(result.data);
                setAlimentos((anteriores) => ({
                    ...anteriores,
                    [props.id]: result.data
                }));
            }else{
                console.log(result.data);
            }
            setLoadingCard(false);
        }catch(error){
            //const messageErrorServer = error.response.data.message;
            console.log("Erro GetAllAlimentos: " + error);
            setAlimentos((anteriores) => ({
                ...anteriores,
                [props.id]: []
            }));
            setLoadingCard(false);
        }
    },[props.id, setAlimentos])

    useEffect(() => {
        if(isOpen){
            getAllAlimentos();
        }
    }, [isOpen, getAllAlimentos]);

    return(
        <>
            <div className="card-alimentos" onClick={openControllerCard}>
                <div className="foto-btns-alimentos">
                    <div id='btn-remove-estoque'>
                        { isOpen && 
                            (
                                isEdit?
                                <ButtonRemoveEstoque style={{'opacity': 0.5}}/> :
                                <ButtonRemoveEstoque onClick={() => buttonDeletarSuperAlimento(props.id)} />
                            )
                        }
                    </div>
                    
                    <img src={props.url_imagem} alt="foto de perfil" onClick={openControllerInfos}/>
                    
                    <div id='btn-edit-estoque'>
                        { isOpen && 
                            (<ButtonEditEstoque>
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
                        {   
                            loadingCardEdit? <Loading size={35} />:
                            <>
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
                            </>
                        }
                    </div>
                    
                    <div className="sub-info-alimentos">
                        <div className="info-alimentos">
                            <h4>Validade:</h4>
                            <p>XX/XX/XXXX</p>
                        </div>
                        <div className="info-alimentos">
                            <h4>Qtd Atual:</h4>
                            <p>{props.quantidade}</p>
                        </div>
                    </div>
                </div>

                <div className='info-unidade-medida' onClick={openControllerInfos}>
                    <h4>Un. Med:</h4>
                    <p>{props.un_medida}</p>
                </div>

                <div className='btns-web'>
                    { isOpen && 
                        (
                            isEdit?
                            <ButtonRemoveEstoque style={{'opacity': 0.5}}/> :
                            <ButtonRemoveEstoque onClick={() => buttonDeletarSuperAlimento(props.id) }/>
                        )
                    }

                    { isOpen && 
                        (<ButtonEditEstoque>
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
                    <button className='button-add-itenzinho' onClick={() => buttonAddAlimento(props.id)} >+ Adicionar Item</button>
                    
                    {
                        loadingCard? <Loading/>:
                        alimentos[props.id]?.map((alimento) =>
                            <CardItemAlimento
                                key={alimento.id_alimento}
                                marca={alimento.marca}
                                medida={alimento.quantidade}
                                data={alimento.data}
                                validade = {alimento.validade}
                            />
                        ) 
                    }
                </div>
            }

        </>
    );
}