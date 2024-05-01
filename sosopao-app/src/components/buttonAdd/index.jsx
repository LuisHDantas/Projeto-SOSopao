import './style.css';
import { Children } from 'react';

export function ButtonAdd({children = null, ...props}){
    return(
        <button className="add" {...props}> {children} </button>
    );
}