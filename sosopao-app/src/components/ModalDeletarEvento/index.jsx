import './style.css';

export function DeletarEvento({fechaDeletar}){
    return(
        <div className="deletar-evento-modal">
            <p>Deseja EXCLUIR esse evento?</p>
            <div className='btns-modal-deletar'>
                <button id='btn-excluir-evento'>Excluir</button>
                <button id='btn-cancelar-excluir-evento' onClick={fechaDeletar}>Cancelar</button>
            </div>
            
        </div>
    )
}