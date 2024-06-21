import './style.css'
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Loading } from '../Loading';
import { AlimentosContext } from '../../Context/AlimentosContext';

export function AddItemAlimento(){
    
    const {
        toggleModalAddAlimento,
        selectedSAlimento,
        setAlimentos
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

        //TODO: tratar os campos

        //Trata campos antes de enviar a requisição
        try{
            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            
            //tenta uma requisição com o servidor
            const response = await axios.post('/alimentos',{
                marca: formItemAlimento.marca,
                data: formattedDate,
                validade: formItemAlimento.validade,
                quantidade: formItemAlimento.medida,
                multiplicador: formItemAlimento.multiplicador,
                superalimentoID: selectedSAlimento
            });

            setAlimentos((anteriores) =>{
                const anteriorId = anteriores[selectedSAlimento];

                return {...anteriores, 
                    [selectedSAlimento]: [...anteriorId, ...response.data]
                }
            });
            
            toggleModalAddAlimento();
        }catch(error){
            console.log("Error ModalAddAlimentos:" + error);
            alert('Erro ao criar Alimento');
            toggleModalAddAlimento();
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
                    {
                        loading ? 
                        <Loading color='#F27127'/>
                        :
                        <>
                            <BotaoLaranja type='submit'>Confirmar</BotaoLaranja>
                            <BotaoCinza onClick={toggleModalAddAlimento}>Cancelar</BotaoCinza>
                        </>
                    }
                </div>
            </form>
        </div>
    )
}