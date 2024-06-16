import { ButtonRemoveEstoque } from '../buttomRemoveEstoque';
import './style.css'

export function CardItemAlimento({abreDeletar = null, ...props}){

    return(
        <div className="card-item-alimento">
            <div className="card-item-alimento-info">
                <div className="card-marca-data">
                    <div className="item-alimento">
                        <h4>Marca</h4>
                        <p>{props.marca}</p>
                    </div>
                    <div className="item-alimento">
                        <h4>Data</h4>
                        <p>{props.data}</p>
                    </div>
                </div>

                <div className="card-validade-uniMed">
                    <div className="item-alimento">
                        <h4>Validade</h4>
                        <p>{props.validade}</p>
                    </div>
                    <div className="item-alimento">
                        <h4>Medida</h4>
                        <p>{props.medida}</p>
                    </div>
                </div>
                
            </div>
           
           <ButtonRemoveEstoque onClick={abreDeletar}/>
        </div>
    );
}