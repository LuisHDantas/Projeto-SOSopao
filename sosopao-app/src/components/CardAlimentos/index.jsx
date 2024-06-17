import { useCallback, useEffect, useState } from 'react';
import { ButtonEditEstoque } from '../buttomEditEstoque';
import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';
import { CardItemAlimento } from '../CardItemAlimento';
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import './style.css'
import axios from 'axios';
import { Loading } from '../Loading';


export function CardAlimentos({abreDeletar=null, abreAddItemAlimento = null, setIdSuperAlimento = null, ...props}){
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const [nameText, setNameText] = useState(props? props.nome:"");
    const [goalText, setGoalText] = useState(props? props.meta:"");

    //PASSAR ESSE ESTADO PARA O ALIMENTOS?????    
    const [alimentos, setAlimentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingEdit, setLoadingEdit] = useState(false);
    
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

    async function handleAlimentoEdit(){
        setIsEdit(!isEdit)
        setLoadingEdit(true);

        //Quer dizer que quero salvar as alterações do meu input
        if(isEdit){
            try{
                const goalNumber = Number(goalText);
                if(nameText.trim() === '' || goalNumber <= 0){
                    alert('Preencha corretamente os campos da edição');
                    
                    //Se um dos campos ficar errado, arruma o estado para o que esta no bd
                    const result = await axios.get(`/superalimento/id/${props.id}`);
                    if(result.status === 200){
                        setNameText(result.data.nome);
                        setGoalText(result.data.meta);
                    }else{
                        //se der errado coloca o que veio antes como parametro
                        setNameText(props.nome);
                        setGoalText(props.meta);
                    }
                }
                else if(nameText !== props.nome || goalText !== props.meta){
                    await axios.put(`/superalimento/id/${props.id}`,{
                        nome: nameText,
                        meta: goalNumber,
                        quantidade: 1,
                        unidade_medida: props.un_medida,
                        url_imagem: props.url_imagem
                    });
                }
            }catch(error){
                console.log("Error HandleAlimentoEdit:" + error);
                alert('Erro ao atualizar Alimento');

                //Se um dos campos ficar errado, arruma o estado para o que esta no bd
                const result = await axios.get(`/superalimento/id/${props.id}`);
                if(result.status === 200){
                    setNameText(result.data.nome);
                    setGoalText(result.data.meta);
                }else{
                    //se der errado coloca o que veio antes como parametro
                    setNameText(props.nome);
                    setGoalText(props.meta);
                }
            }
        }
        setLoadingEdit(false);
    }

    const getAllAlimentos = useCallback(async ()=>{
        try{
            const result = await axios.get(`/superalimento/${props.id}/alimentos`);
            if (result.status === 200) {
                //console.log(result.data);
                setAlimentos(result.data);
            }else{
                console.log(result.data);
            }
            setLoading(false);
        }catch(error){
            //const messageErrorServer = error.response.data.message;
            console.log("Erro GetAllAlimentos: " + error);
            setLoading(false);
        }
    },[props.id])

    const updateIdSuperAlimento = useCallback(() => {
        setIdSuperAlimento(props.id);
    }, [props.id, setIdSuperAlimento]);


    useEffect(() => {
        if(isOpen){
            updateIdSuperAlimento();
            getAllAlimentos();
        }
    }, [isOpen, getAllAlimentos, updateIdSuperAlimento]);

    return(
        <>
            <div className="card-alimentos" onClick={openControllerCard}>
                <div className="foto-btns-alimentos">
                    <div id='btn-remove-estoque'>
                        { isOpen && 
                            (
                                isEdit?
                                <ButtonRemoveEstoque style={{'opacity': 0.5}}/> :
                                <ButtonRemoveEstoque onClick={abreDeletar}/>
                            )
                        }
                    </div>
                    
                    <img src={props.url_imagem} alt="foto de perfil" onClick={openControllerInfos}/>
                    
                    <div id='btn-edit-estoque'>
                        { isOpen && 
                            (<ButtonEditEstoque onClick={() => handleAlimentoEdit()}>
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
                            loadingEdit? <Loading size={35} />:
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
                            <p>X</p>
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
                            <ButtonRemoveEstoque onClick={abreDeletar}/>
                        )
                    }

                    { isOpen && 
                        (<ButtonEditEstoque onClick={() => handleAlimentoEdit()}>
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
                    <button className='button-add-itenzinho' onClick={abreAddItemAlimento}>+ Adicionar Item</button>
                    
                    {
                        loading? <Loading/>:
                        alimentos?.map((alimento) =>
                            <CardItemAlimento
                                key={alimento.id_alimento}
                                marca={alimento.marca}
                                medida={alimento.quantidade}
                                data={alimento.data}
                                validade = {alimento.validade}
                                abreDeletar = {abreDeletar}
                            />
                        )
                    }
                </div>
            }

        </>
    );
}