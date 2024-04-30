import './style.css'

export function BotaoCinza({ children, ...props }){
    return(
        <button className='btn-cancelar' {...props}>{children}</button>
    )
}