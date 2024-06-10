import './style.css';

export function ButtonAdd({children = null, ...props}){
    return(
        <button className="add" {...props}> {children} </button>
    );
}