import { createContext } from "react";
import useAlimentos from "../Hooks/useAlimentos";

const AlimentosContext = createContext();

function AlimentosProvider({children}){

    const hAlimentos = useAlimentos();

    return (
        <AlimentosContext.Provider value={hAlimentos}>
            {children}
        </AlimentosContext.Provider>
    );
}

export {AlimentosContext, AlimentosProvider};