import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';
import axios from 'axios';
import { Loading } from '../Loading';


export function AddAlimento({fechaAddAlimento, setSuperAlimentos}){
    const [loading, setLoading] = useState(false);
    
    const [formAlimento, setFormAlimento] = useState({
        nome: '',
        meta: 0,
        un_medida: '',
        url_imagem: ''
    });

    // Lida com evento de mudança do input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormAlimento({...formAlimento, [name]: value});
    };


    async function send(event){
        event.preventDefault();
        setLoading(true);

        const metaNumber = Number(formAlimento.meta);

        //Trata campos antes de enviar a requisição
        if(formAlimento.nome.trim() === '' || 
        formAlimento.url_imagem.trim() === '' ||
        formAlimento.un_medida.trim() === ''||
        metaNumber <= 0){
            alert('Preencha todos os campos corretamente');
        }else if(typeof metaNumber !== 'number'){
            alert('Meta deve ser um número');
        }else{
            try{
                //tenta uma requisição com o servidor
                const response = await axios.post('/superalimento',{
                    nome: formAlimento.nome,
                    meta: formAlimento.meta,
                    quantidade: 1,
                    unidade_medida: formAlimento.un_medida,
                    url_imagem: formAlimento.url_imagem
                });
                
                console.log(response.data);
                setSuperAlimentos((anteriores) => {
                    return [...anteriores, response.data]
                });
                
                fechaAddAlimento();
            }catch(error){
                console.log("Error ModalAddAlimentos:" + error);
                alert('Erro ao criar Alimento');
                fechaAddAlimento();
            }
        }
        setLoading(false);
    }

    return(
        <div className="add-alimento-modal">
            <form name='form-add-alimento' onSubmit={send}>
                <div className='campo-add-alimento'>
                    <label>Nome:</label>
                    <input placeholder="Nome" name="nome" onChange={handleChange}/>
                    <MdEdit className='icon-cadastro-evento'/>
                </div>

                <div className='campo-add-alimento'>
                    <label>Meta:</label>
                    <input type='number' placeholder="0" name="meta" onChange={handleChange}/>
                </div>


                <div className='campo-add-alimento'>
                    <label>URL da imagem:</label>
                    <input placeholder='URL da imagem' name="url_imagem" onChange={handleChange}/>
                    <MdEdit className='icon-cadastro-evento'/>
                </div>

                <div className='campo-add-alimento'>
                    <select id="unMed-item-alimento" defaultValue={""} name="un_medida" onChange={handleChange}>
                        <option value="" disabled>Un. Medida</option>
                        <option value="Unidade">Unidade</option>
                        <option value="Kilogramas">Kilogramas</option>
                        <option value="Gramas">Gramas</option>
                        <option value="Litros">Litros</option>
                        <option value="Mililitros">Mililitros</option>
                        <option value="Dúzia">Dúzia</option>
                    </select>
                </div>

                <div id='container-btns-cadastro-evento'>  

                    {
                        loading ? 
                        <Loading color='#F27127'/>
                        :
                        <>
                            <BotaoLaranja type='submit'>Confirmar</BotaoLaranja>
                            <BotaoCinza onClick={fechaAddAlimento}>Cancelar</BotaoCinza>
                        </>
                    }
                </div>
            </form>
        </div>
    )
}