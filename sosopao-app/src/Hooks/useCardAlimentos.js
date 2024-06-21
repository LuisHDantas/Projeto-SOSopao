/* import axios from "axios";
import { useEffect, useState } from "react";


export default function useCardAlimentos(){


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
                setAlimentos({[props.id]: result.data});
            }else{
                console.log(result.data);
            }
            setLoading(false);
        }catch(error){
            //const messageErrorServer = error.response.data.message;
            console.log("Erro GetAllAlimentos: " + error);
            setAlimentos({});
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
    

    return { 
    };
} */