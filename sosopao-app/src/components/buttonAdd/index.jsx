import './style.css';
import { Children } from 'react';

export function ButtonAdd({children}, {...props}){
    return(
        <button className="add" {...props}>
            {children}
        </button>
    );
}