import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AlimentosContext } from "../Context/AlimentosContext";


export default function useCardAlimentos(props){
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const [loadingCard, setLoadingCard] = useState(true);
    const [loadingCardEdit, setLoadingCardEdit] = useState(false);

    const [nameText, setNameText] = useState(props? props.nome:"");
    const [goalText, setGoalText] = useState(props? props.meta:"");

    const {
        setAlimentos,
        sortByDate
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

    async function handleAlimentoEdit(){
        setIsEdit(!isEdit)
        setLoadingCardEdit(true);

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
                        quantidade: props.quantidade,
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
        setLoadingCardEdit(false);
    }

    const getAllAlimentos = useCallback(async ()=>{
        try{
            const result = await axios.get(`/superalimento/${props.id}/alimentos`);
            if (result.status === 200) {
                //console.log(result.data);
                setAlimentos((anteriores) => ({
                    ...anteriores,
                    [props.id]: sortByDate(result.data)
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
    },[props.id, setAlimentos, sortByDate])

    useEffect(() => {
        if(isOpen){
            getAllAlimentos();
        }
    }, [isOpen, getAllAlimentos]);

    return {
        isOpen,
        isEdit,
        loadingCard,
        loadingCardEdit,
        nameText,
        goalText,
        setNameText,
        setGoalText,
        openControllerCard,
        openControllerInfos,
        handleAlimentoEdit
    };
} 