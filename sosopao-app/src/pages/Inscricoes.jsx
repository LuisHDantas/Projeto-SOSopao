import { useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import '../styles/inscricoes.css';
import { CardInscricao } from '../components/cardInscricao';
import { Loading } from '../components/Loading/';
import axios from 'axios';


const DataFetcher = async (setDados, setLoading, setError) => {
    try {
        const response = await axios.get('/voluntario');
        setDados(response.data);
        setLoading(false);
    } catch (error) {
        setError(error);
        setLoading(false);
    }
};


export function Inscricoes(){

    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        DataFetcher(setDados, setLoading, setError);
    }, []);

    return(
        <div>
            <Navbar type='gerenciar'/>

            <div>

                <div className='titulo-inscricoes'>
                    <h1>Inscrições</h1>
                </div>

                <div className='container-admins'>    
                    {loading ? <Loading/> : dados?.map((inscricao, index) => {
                        return(
                            <CardInscricao
                                key={index}
                                nome={inscricao.nome}
                                email={inscricao.email}
                                telefone={inscricao.telefone}
                            />
                        );
                    })}
                </div>
            </div>

            <Footer />
        </div>
    );

}
