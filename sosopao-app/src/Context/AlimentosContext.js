import { createContext } from "react";
import useAlimentos from "../Hooks/useAlimentos";
import useCardAlimentos from "../Hooks/useCardAlimentos";

const AlimentosContext = createContext();

function AlimentosProvider({children}){

    const hAlimentos = useAlimentos();
    const hCardAlimentos = useCardAlimentos();

    return (
        <AlimentosContext.Provider value={{hAlimentos, hCardAlimentos}}>
            {children}
        </AlimentosContext.Provider>
    );
}

export {AlimentosContext, AlimentosProvider};