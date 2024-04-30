import './style.css'


export function CardAlimentos(){
    return(
        <div className="card-alimentos">
            <div className="foto-btns-alimentos">
                <img src="https://avatars.githubusercontent.com/u/45525241?v=4" alt="foto de perfil" />
            </div>
            
            <div className='infos-alimentos'>
                <div className="sub-info-alimentos">
                    <div className="info-alimentos">
                        <h4>Nome:</h4>
                        <p>Macarrão</p>
                    </div>

                    <div className="info-alimentos">
                        <h4>Meta:</h4>
                        <p>20</p>
                    </div>
                </div>
                

                <div className="sub-info-alimentos">
                    <div className="info-alimentos">
                        <h4>Validade:</h4>
                        <p>XX/XX/XXXX</p>
                    </div>
                    <div className="info-alimentos">
                        <h4>Qtd Atual:</h4>
                        <p>10</p>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}