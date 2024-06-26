import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AlimentosContext } from '../../Context/AlimentosContext';


export function AddAlimento(){
    const [loading, setLoading] = useState(false);

    const {
        toggleModalAddSuperalimento,
        setSuperAlimentos
    } = useContext(AlimentosContext);
    
    const [formAlimento, setFormAlimento] = useState({
        nome: '',
        meta: 0,
        un_medida: ''
    });

    const [file, setFile] = useState(null);

    // Lida com evento de mudança do input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormAlimento({...formAlimento, [name]: value});
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    async function send(event){
        event.preventDefault();
        setLoading(true);

        const metaNumber = Number(formAlimento.meta);

        //Trata campos antes de enviar a requisição
        if(formAlimento.nome.trim() === '' || 
        formAlimento.un_medida.trim() === ''||
        metaNumber <= 0){
            alert('Preencha todos os campos corretamente');
        }else if(typeof metaNumber !== 'number'){
            alert('Meta deve ser um número');
        }else{
            try{
                // cria uma nova instância de FormData
                const formData = new FormData();
                formData.append('nome', formAlimento.nome);
                formData.append('meta', formAlimento.meta);
                formData.append('quantidade', 1);
                formData.append('unidade_medida', formAlimento.un_medida);
                formData.append('file', file);
                
                //tenta uma requisição com o servidor
                const response = await axios.post('/superalimento', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                setSuperAlimentos((anteriores) => {
                    return [...anteriores, response.data]
                });
                
                toggleModalAddSuperalimento();
            }catch(error){
                console.log("Error ModalAddAlimentos:" + error);
                alert('Erro ao criar Alimento');
                toggleModalAddSuperalimento();
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

                <div className='campo-add-alimento' id='foto'>
                    <label>Adicione uma foto:</label>
                    <input type="file" name="file" onChange={handleFileChange}/>
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

                    <BotaoLaranja type='submit' disabled={loading}>
                        {loading ? 'Carregando...' : 'Confirmar'}
                    </BotaoLaranja>
                    <BotaoCinza onClick={toggleModalAddSuperalimento} disabled={loading}>
                        Cancelar
                    </BotaoCinza>
                </div>
            </form>
        </div>
    )
}