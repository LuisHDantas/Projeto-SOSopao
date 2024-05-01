import './style.css'
import { MdEdit } from "react-icons/md";
import { BotaoLaranja } from '../BotaoLaranja';
import { BotaoCinza } from '../BotaoCinza';
import { useState } from 'react';

export function UpdateQRCode({fechaUpdate, dados, setDados}){

    const [formData, setFormData] = useState({
        url: ''
    });

    // Lida com evento de mudança do input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    return(
        <div className='update-qrcode-modal'>
            <p>Insira o link para a imagem do novo QR Code</p>
            <form>
                <div className='campo-update-qrcode'>
                    <input placeholder="URL" name="url" onChange={handleChange}/>
                    <MdEdit className='icon-update-qrcode'/>
                </div>

                <div id='container-btns-update-qrcode'>  
                    <BotaoLaranja onClick={()=>{
                        setDados([...dados, {
                            url: formData.url
                        }]);
                        fechaUpdate();
                    }}
                    >
                        Confirmar
                    </BotaoLaranja>
                    <BotaoCinza onClick={fechaUpdate}>Cancelar</BotaoCinza>
                </div>
            </form>
        </div>
    );

}