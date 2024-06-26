import './style.css';
import { FaFileUpload } from "react-icons/fa";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';
import axios from 'axios';

export function UpdateQRCode({fechaUpdate, dados, setDados}){

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    async function send(event){
        event.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('qrcode', formData, { 
                headers: {
                        'Content-Type': 'multipart/form-data'
                }
            });


            fechaUpdate();
        } catch (err) {
            console.error("Erro ao atualizar QRcode:" + err);
            alert("Erro ao atualizar QRcode");
            fechaUpdate();
        }
    }

    return(
        <div className='update-qrcode-modal'>
            <p>Insira a imagem do novo QR Code</p>
            <form onSubmit={send}>
                <div className='campo-update-qrcode'>

                    <input id="upload-input" placeholder="URL" name="file" type="file" onChange={handleFileChange}/>
                    
                </div>

                <div id='container-btns-update-qrcode'>  
                    <BotaoLaranja type="submit" disabled={loading}>
                        {loading ? 'Carregando...' : 'Confirmar'}
                    </BotaoLaranja>
                    <BotaoCinza onClick={fechaUpdate} disabled={loading}>Cancelar</BotaoCinza>
                </div>
            </form>
        </div>
    );

}
