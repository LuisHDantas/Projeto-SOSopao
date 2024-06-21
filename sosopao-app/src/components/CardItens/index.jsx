import { useState } from 'react';
import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';
import { ButtonEditEstoque } from '../buttomEditEstoque';
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import './style.css'
import axios from 'axios';

export function CardItens({ id, nome, descricao, quantidade, abreDeletar = null}) {

    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formItem, setFormItem] = useState({
        nome: nome,
        descricao: descricao,
        quantidade: quantidade,
    });

    function openControllerCard() {
        if (isOpen && !isEdit) {
            return setIsOpen(!isOpen);
        } else if (!isOpen) {
            return setIsOpen(!isOpen);
        }
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormItem({
            ...formItem,
            [name]: value,
        });
    };

    async function updateItem(id, nomeForm, descricaoForm, quantidadeForm){

        console.log(descricaoForm);

        try{
            const qtdForm = Number(quantidadeForm);

            if(nomeForm.trim() === '' || qtdForm <= 0){
                alert('Preencha corretamente os campos da edição');
                
                //Se um dos campos ficar errado, arruma o estado para o que esta no bd
                const result = await axios.get(`/item/id/${id}`);
                if(result.status === 200){
                    setFormItem({
                        nome: result.data.nome, 
                        descricao: result.data.descricao, 
                        quantidade: result.data.quantidade
                    });
                }else{
                    //se der errado coloca o que veio antes como parametro
                    setFormItem({
                        nome: nome, 
                        descricao: descricao, 
                        quantidade: quantidade
                    });
                }
            }
            else if(nomeForm !== nome || descricaoForm !== descricao || quantidadeForm !== quantidade){
                await axios.put(`/item/id/${id}`,{
                    nome: nomeForm,
                    descricao: descricaoForm,
                    quantidade: qtdForm,
                });
            }

        }catch(error){
            console.log("Error UpdateItem:" + error);
            alert('Erro ao atualizar Item');

            //Se um dos campos ficar errado, arruma o estado para o que esta no bd
            const result = await axios.get(`/item/id/${id}`);
            if(result.status === 200){
                setFormItem({
                    nome: result.data.nome, 
                    descricao: result.data.descricao, 
                    quantidade: result.data.quantidade});
            }else{
                //se der errado coloca o que veio antes como parametro
                setFormItem({
                    nome: nome, 
                    descricao: descricao, 
                    quantidade: quantidade
                });
            }
        }
    }

    function handleEdit() {
        if (isEdit) {
            updateItem(id, formItem.nome, formItem.descricao, formItem.quantidade);
        }
        setIsEdit(!isEdit);
    }

    return (
        <>
            <div className="card-itens" onClick={() => openControllerCard()}>
                <div className="item-nome">
                    <h4>Nome:</h4>
                    {isEdit ? (
                        
                        <input className="input-editavel-nome-itens" type="text" value={formItem.nome} name="nome" onChange={handleChange} />
                    ) : (<p>{formItem.nome}</p>
                    )}
                </div>
                <div className="item-descricao">
                    <h4>Descrição:</h4>
                    {isEdit ? (
                        <textarea className="input-editavel-descricao-itens" value={formItem.descricao} name="descricao" onChange={handleChange}></textarea>
                    ) : (<p>{formItem.descricao}</p>
                    )}
                </div>
                <div className="item-quantidade">
                    <h4>Quantidade:</h4>
                    {isEdit ? (
                        <input className="input-editavel-quantidade-itens" type="number" value={formItem.quantidade} name="quantidade" onChange={handleChange} />
                    ) : (<p>{formItem.quantidade}</p>
                    )}
                </div>
            </div>

            {
                isOpen &&
                (<div className='new-container-itens'>
                    <ButtonEditEstoque onClick={handleEdit}>
                        {isEdit ?
                            <FaCheck /> :
                            <MdEdit />
                        }
                    </ButtonEditEstoque>
                    {isEdit ?
                        <ButtonRemoveEstoque style={{ 'opacity': 0.5 }} /> :
                        <ButtonRemoveEstoque onClick={abreDeletar} />
                    }
                </div>)
            }
        </>
    );
}