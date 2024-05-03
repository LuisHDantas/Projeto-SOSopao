import './style.css'


export function ButtonEditEstoque({children = null, ...props}){
    return (
        <button className="btn-edit-estoque" {...props}> {children} </button>
    );
}