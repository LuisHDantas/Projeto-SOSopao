import { useState } from 'react';
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ButtonAdd } from "../components/buttonAdd";
import { ModalDeletar } from "../components/ModalDeletar";
import { CadastroParada } from '../components/ModalCardastroParada';
import { CardParada } from '../components/cardParada';
import map from '../assets/images/map.png'
import '../styles/rotas.css';

export function Rotas(){

    const [dados] = useState([
    {parada:'Praça XV de Novembro, R. 15 de Novembro, 1593-1483 - Centro, São Carlos - SP, 13560-241'},
    {parada: 'Praça dos Voluntários - São Carlos, SP, 13560-011'},
    {parada: 'Rodoviária - São Carlos, R. Jacinto Favoreto, 777 - Jardim Lutfalla, São Carlos - SP, 13560-515'},
    ]);

    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreAddRota, setAbreAddRota] = useState(false);

    return (
        <div>
            <Navbar type='rotas'/>

            {abreAddRota && (
                <CadastroParada
                    fechaCadastro={() => setAbreAddRota(!abreAddRota)}
                    // TODO: Cadastro funcional (simulando BD)
                >
                </CadastroParada>
            )}

            {abreDeletar && (
                <ModalDeletar
                    fechaDeletar={() => setAbreDeletar(!abreDeletar)}
                    // TODO: deletar funcional (simulando BD)
                >
                    Deseja EXCLUIR esse ponto de parada?
                </ModalDeletar>
            )}

            <div 
            style={{
                filter: abreDeletar || abreAddRota ? 'blur(5px)' : 'none',
            }}
            >

                <div id='btn-add-parada'>
                    <ButtonAdd onClick={() => setAbreAddRota(!abreAddRota)}>
                        Adicionar parada
                    </ButtonAdd>
                </div>

                <div className='titulos-rotas'>
                    <h1>Pontos de parada</h1>
                </div>

                <div className='container-paradas'>

                    <img src={map} alt="Mapa de rotas" />

                    {dados?.map((rota, index) => {
                        return(
                            <CardParada
                                key={index} 
                                parada={rota.parada} 

                                abreDeletar={() => {
                                    setAbreDeletar(!abreDeletar);
                                    }
                                }  
                            />
                        );}
                    )
                    }
                </div>

                <Footer />

            </div>

        </div>
    );

}