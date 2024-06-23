import './style.css'
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AlimentosContext } from '../../Context/AlimentosContext';

export function AddItemAlimento(){
    
    const {
        toggleModalAddAlimento,
        selectedSAlimento,
        setAlimentos,
        updateSuperAlimento,
        sortByDate
    }= useContext(AlimentosContext);


    const [loading, setLoading] = useState(false);
    
    
    const [formItemAlimento, setformItemAlimento] = useState({
        marca: '',
        validade: '',
        medida: 0,
        multiplicador: 0
    });

    // Lida com evento de mudança do input
    const handleChange = (event) => {
        const { name, value } = event.target;
        //console.log(name + " : " + value);  
        setformItemAlimento({...formItemAlimento, [name]: value});
    };

    async function send(event){
        event.preventDefault();
        setLoading(true);

        //console.log(formItemAlimento.validade);
        const qtdNumber = Number(formItemAlimento.medida);
        const qtdMultiplicador = Number(formItemAlimento.multiplicador);

        //Trata campos antes de enviar a requisição
        if(formItemAlimento.marca.trim() === '' || 
        formItemAlimento.validade.trim() === ''||
        qtdNumber <= 0||
        qtdMultiplicador <= 0){
            alert('Preencha todos os campos corretamente');
        }else if(typeof qtdNumber !== 'number' || typeof qtdMultiplicador !== 'number'){
            alert('Meta deve ser um número');
        }else{
            try{
                const now = new Date();
                const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

                //tenta uma requisição com o servidor
                const response = await axios.post('/alimentos',{
                    marca: formItemAlimento.marca,
                    data: formattedDate,
                    validade: formItemAlimento.validade,
                    quantidade: qtdNumber,
                    multiplicador: qtdMultiplicador,
                    superalimentoID: selectedSAlimento
                });

                setAlimentos((anteriores) =>{
                    const anteriorId = anteriores[selectedSAlimento];

                    return {...anteriores, 
                        [selectedSAlimento]: sortByDate([...anteriorId, ...response.data])
                    }
                });

                //Atualizar a quantidade do SuperAlimento
                //updateSuperAlimentoQtd(selectedSAlimento, qtdNumber*qtdMultiplicador, true);
                //Atualiza SuperAlimento
                await updateSuperAlimento(selectedSAlimento);

                toggleModalAddAlimento();
            }catch(error){
                console.log("Error ModalAddAlimentos:" + error);
                alert('Erro ao criar Alimento');
                toggleModalAddAlimento();
            }
        }
        setLoading(false);
    }

    return(
        <div className="add-item-alimento-modal">
            <form name='form-add-itemalimento' onSubmit={send}>
                <div className='campo-item-add-alimento'>
                    <label>Marca:</label>
                    <input placeholder="Marca" name="marca" onChange={handleChange}/>
                </div>

                <div className='campo-item-add-alimento'>
                    <label>Validade:</label>
                    <input type='date' placeholder="dd/mm/aaaa" name="validade" onChange={handleChange}/>
                </div>

                <div className='campo-item-add-alimento'>
                    <label>Medida:</label>
                    <input type='number' placeholder="Medida" name="medida" onChange={handleChange}/>
                </div>

                <div className='campo-item-add-alimento'>
                    <label>Multiplicador:</label>
                    <input type='number' placeholder="Multiplicador" name="multiplicador" onChange={handleChange}/>
                </div>


                <div id='container-btns-cadastro-evento'>  
                    <BotaoLaranja type='submit' disabled={loading}>
                        {loading ? 'Carregando...' : 'Confirmar'}
                    </BotaoLaranja>
                    <BotaoCinza onClick={toggleModalAddAlimento} disabled={loading}>
                        Cancelar
                    </BotaoCinza>
                </div>    
            </form>
        </div>
    )
}