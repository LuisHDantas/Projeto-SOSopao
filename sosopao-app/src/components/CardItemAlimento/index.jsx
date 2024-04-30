import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';
import './style.css'

export function CardItemAlimento(){

    return(
        <div className="card-item-alimento">
            <div className="card-item-alimento-info">
                <div className="card-marca-data">
                    <div className="item-alimento">
                        <h4>Marca</h4>
                        <p>adria</p>
                    </div>
                    <div className="item-alimento">
                        <h4>Data</h4>
                        <p>XX/XX/XXXX</p>
                    </div>
                </div>

                <div className="card-validade-uniMed">
                    <div className="item-alimento">
                        <h4>Validade</h4>
                        <p>XX/XX/XXXX</p>
                    </div>
                    <div className="item-alimento">
                        <h4>Un. Med</h4>
                        <p>Unidade</p>
                    </div>
                </div>
                
            </div>
           
           <ButtonRemoveEstoque/>
        </div>
    );
}