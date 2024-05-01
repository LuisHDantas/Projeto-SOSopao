import { useState } from 'react';
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ButtonAdd } from "../components/buttonAdd";
import { CardAdmin } from "../components/cardAdmin";
import { ModalDeletar } from "../components/ModalDeletar";
import '../styles/painelcontrole.css';

export function PainelControle(){

    const [dados] = useState([
    {nome: 'João da Silva', email:'joao.silva@gmail.com', senha: '0123'},
    {nome: 'Claudinei Santos', email:'claudinei.santos@gmail.com', senha: '0123'},
    {nome: 'Maria de Almeida', email: 'maria.almeida@gmail.com', senha: '0123'},
    ]);

    const [abreEditarConta, setAbreEditarConta] = useState(false);
    const [abreDeletar, setAbreDeletar] = useState(false);
    
    // const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    return(
        <div>
            <Navbar type='gerenciar'/>

            {abreDeletar && (
                <ModalDeletar
                    fechaDeletar={() => setAbreDeletar(!abreDeletar)}
                    // TODO: deletar funcional
                >
                    Deseja EXCLUIR esse administrador?
                </ModalDeletar>
            )}

            <div 
            style={{
                filter: abreDeletar ? 'blur(5px)' : 'none',
            }}
            >

                <div id='btn-editar-minha-conta'>
                    <ButtonAdd onClick={() => setAbreEditarConta(!abreEditarConta)}>
                        Editar minha conta
                    </ButtonAdd>
                </div>

                <div className='titulos-admin'>
                    <h1>Gerenciar Administradores</h1>
                </div>

                <div className='container-admins'>

                    {dados?.map((admin, index) => {
                        return(
                            <CardAdmin 
                                key={index} 
                                nome={admin.nome} 
                                email={admin.email}

                                abreDeletar={() => {
                                    setAbreDeletar(!abreDeletar);
                                    // setSelectedCardIndex(index);
                                    } 
                                }  
                            />
                        );}
                    )
                    }
                </div>

                <div id="addbtn-admin-container">
                    <ButtonAdd style={{width:'35%'}}>Adicionar novo admin</ButtonAdd>
                </div>

                <div id="container-funcoes-admin">
                    <div className='titulos-admin'>
                        <h1>Funções do administrador</h1>
                    </div>

                    <div className='container-btn-funcoes'>
                        <ButtonAdd style={{width:'40%'}}>Acessar inscrições</ButtonAdd>
                        <ButtonAdd style={{width:'40%'}}>Alterar QR Code</ButtonAdd>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );

}