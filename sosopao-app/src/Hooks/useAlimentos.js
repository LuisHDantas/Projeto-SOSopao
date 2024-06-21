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
    
    const [loadingPagAlimentos, setLoadingPagAlimentos] = useState(true);

    //Estados para armazenar as informações dos cards
        //Card do SuperAlimento
    const [superAlimentos, setSuperAlimentos] = useState([]);
        //Cards do Alimentos
    const [alimentos, setAlimentos] = useState({});


    const [typeDelete, setTypeDele] = useState("");
    

    const [selectedSAlimento, setSelectedSAlimento] = useState(null);
    const selectSuperAlimento = (id) => setSelectedSAlimento(id);

    const updateStateSuperAlimentoQtd = (id_super, newQtd) => {
        const updatedState = superAlimentos.map(anteriores =>
            anteriores.id === id_super ? { ...anteriores, quantidade: newQtd } : anteriores
        );
        setSuperAlimentos(updatedState);
    };

    function updateSuperAlimentoQtd(id_super, qtdOperacao, isSoma = null){
        //atualiza a quantidade do SuperAlimento
        try{
            const qtdSuperAlimento = superAlimentos.find(sAlimento => sAlimento.id === id_super)?.quantidade || 0;
            
            //console.log(qtdSuperAlimento);

            if(isSoma){
                updateStateSuperAlimentoQtd(id_super, qtdSuperAlimento+qtdOperacao);
            }else{
                updateStateSuperAlimentoQtd(id_super, qtdSuperAlimento-qtdOperacao);
            }
            
        }catch(error){
            console.log("[useAlimentos]Erro updateSuperAlimentoQtd: "+error);
        }
        
    }


    function buttonDeletarSuperAlimento(id){
        toggleModalDeletar();
        selectSuperAlimento(id);
        setTypeDele("superalimento");
    }
    
    function buttonAddAlimento(id){
        toggleModalAddAlimento();
        setSelectedSAlimento(id);
    }
    
    
    const [selectedAlimento, setSelectedAlimento] = useState(null);
    const selectAlimento = (id) => setSelectedAlimento(id);
    
    function buttonDeletarAlimento(id, id_super){
        toggleModalDeletar();
        selectAlimento(id);
        selectSuperAlimento(id_super);
        setTypeDele("alimento");
    }

    
    
    //HOOKS SUPERALIMENTO
    async function getAllSuperAlimentos(){
        try{
            const result = await axios.get('/superalimento')

            if (result.status === 200) {
                setSuperAlimentos(result.data);
            }else{
                console.log("[useAlimentos]"+ result.data);
            }

            setLoadingPagAlimentos(false);
        }
        catch(error){
            console.log("[useAlimentos] Erro GetAllSuperAlimentos: "+error);
            setLoadingPagAlimentos(false);
        }
    }

    useEffect(() => {
        getAllSuperAlimentos();
    },[]);

    async function handleSuperAlimentoDelete(id) {
        try{
            const result = await axios.delete(`/superalimento/id/${id}`);
            if (result.status === 200) {
                setSuperAlimentos(anteriores => anteriores.filter(item => item.id !== id));
            }
            setAbreDeletar(false);
        }catch(error){
            console.log("[useAlimentos] Erro DeleteSuperAlimentos: " + error);
            setAbreDeletar(false);
        }
    }

    async function handleAlimentoDelete(id_super, id_alimento) {
        try{
            const qtdAlimentoDeletado = alimentos[id_super].find(alimento => alimento.id_alimento === id_alimento)?.quantidade || 0;
            const result = await axios.delete(`/alimento/${id_alimento}`);
            if (result.status === 200) {
                setAlimentos((anteriores) =>{
                    const anteriorId = anteriores[id_super];
    
                    return {...anteriores, 
                        [id_super]: anteriorId.filter(item => item.id_alimento !== id_alimento)
                    }
                });
            }
            //Atualiza o estado da quantidade do SuperAlimento
            updateSuperAlimentoQtd(id_super, qtdAlimentoDeletado, false);
            setAbreDeletar(false);
        }catch(error){
            console.log("[useAlimentos] Erro DeleteSuperAlimentos: " + error);
            setAbreDeletar(false);
        }
    }

    

    return { abreDeletar, 
            abreAddSuperAlimento, 
            abreAddAlimento,
            loadingPagAlimentos,
            selectedSAlimento,
            selectedAlimento,
            superAlimentos,
            alimentos,
            typeDelete,
            handleSuperAlimentoDelete,
            handleAlimentoDelete,
            updateSuperAlimentoQtd,
            toggleModalDeletar,
            toggleModalAddSuperalimento,
            toggleModalAddAlimento,
            buttonDeletarSuperAlimento,
            buttonDeletarAlimento,
            buttonAddAlimento,
            setSuperAlimentos,
            setAlimentos
    };
}