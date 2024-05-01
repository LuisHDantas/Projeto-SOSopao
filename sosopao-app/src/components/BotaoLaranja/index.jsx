import './style.css'

export function BotaoLaranja({ children, ...props }){
    return(
        <button className='btn-confirmar' {...props}>{children}</button>
    )
}