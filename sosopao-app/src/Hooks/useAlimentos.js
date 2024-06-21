import axios from "axios";
import { useEffect, useState } from "react";


export default function useAlimentos(){
    //Estados para modais
    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreAddSuperAlimento, setabreAddSuperAlimento] = useState(false);
    const [abreAddAlimento, setAbreAddAlimento] = useState(false);
    //Funções uteis para alternar os valores dos estados
    const toggleModalDeletar = () => setAbreDeletar(!abreDeletar);
    const toggleModalAddSuperalimento = () => setabreAddSuperAlimento(!abreAddSuperAlimento);
    const toggleModalAddAlimento = () => setAbreAddAlimento(!abreAddAlimento);


    //Estados para armazenar as informações dos cards
        //Card do SuperAlimento
    const [superAlimentos, setSuperAlimentos] = useState([]);
        //Card do Alimentos
    const [alimentos, setAlimentos] = useState({});
    

    //TALVEZ MUDAR A LOGICA!!!!!!!!!!
    //const [selectedSAlimento, setSelectedSAlimento] = useState(null);

    const [loadingPagAlimentos, setLoadingPagAlimentos] = useState(true);
    
    
    //HOOKS SUPERALIMENTO
    async function getAllSuperAlimentos(){
        try{
            const result = await axios.get('/superalimento')

            if (result.status === 200) {
                setSuperAlimentos(result.data);
            }else{
                console.log(result.data);
            }

            setLoadingPagAlimentos(false);
        }
        catch(error){
            console.log("Erro GetAllSuperAlimentos: "+error);
            setLoadingPagAlimentos(false);
        }
    }

    useEffect(() => {
        getAllSuperAlimentos();
    },[]);

    async function handleAlimentoDelete(id) {
        try{
            const result = await axios.delete(`/superalimento/id/${id}`);
            if (result.status === 200) {
                setSuperAlimentos(anteriores => anteriores.filter(item => item.id !== id));
            }
            setAbreDeletar(false);
        }catch(error){
            console.log("Erro DeleteSuperAlimentos: " + error);
            setAbreDeletar(false);
        }
    }

    

    return { abreDeletar, 
            abreAddSuperAlimento, 
            abreAddAlimento,
            loadingPagAlimentos,
            superAlimentos,
            alimentos,
            handleAlimentoDelete,
            toggleModalDeletar,
            toggleModalAddSuperalimento,
            toggleModalAddAlimento
    };
}