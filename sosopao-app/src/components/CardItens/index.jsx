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

    async function updateItem(id, nome, descricao, quantidade){
        try{
            await axios.put(`/item/id/${id}`,{
                nome: nome,
                descricao: descricao,
                quantidade: quantidade,
            });

        }catch(error){
            console.log('Erro em  add Item: ' + error);
            alert('Erro ao atualizar item');
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