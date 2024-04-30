import './style.css'

export function BotaoConfirmar({ onClick }){
    return(
        <button className='btn-confirmar' onClick={onClick}>Confirmar</button>
    )
}