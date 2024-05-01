import { useState } from 'react';
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import '../styles/inscricoes.css';
import { CardInscricao } from '../components/cardInscricao';

export function Inscricoes(){

    const [dados] = useState([
    {nome: 'João da Silva', email:'joao.silva@gmail.com', telefone: '(19) 99999-9999'},
    {nome: 'Claudinei Santos', email:'claudinei.santos@gmail.com', telefone: '(19) 99999-9999'},
    {nome: 'Maria de Almeida', email: 'maria.almeida@gmail.com', telefone: '(19) 99999-9999'},
    ]);

    return(
        <div>
            <Navbar type='gerenciar'/>

            <div>

                <div className='titulo-inscricoes'>
                    <h1>Inscrições</h1>
                </div>

                <div className='container-admins'>    
                    {dados?.map((inscricao, index) => {
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