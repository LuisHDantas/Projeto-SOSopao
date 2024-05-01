import { useState } from 'react';
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ButtonAdd } from "../components/buttonAdd";
import { CardAdmin } from "../components/cardAdmin";
import { ModalDeletar } from "../components/ModalDeletar";
import { CadastroAdmin } from '../components/ModalCadastroAdmin';
import { UpdateQRCode } from '../components/ModalUpdateQRCode';
import { EditarContaAdmin } from '../components/ModalEditarContaAdmin';
import { Link } from 'react-router-dom';
import '../styles/painelcontrole.css';

export function PainelControle(){

    const [dados] = useState([
    {nome: 'João da Silva', email:'joao.silva@gmail.com', senha: '0123'},
    {nome: 'José Santos', email:'jose.santos@gmail.com', senha: '0123'},
    {nome: 'Bob Nelson Donda Cavalheiro', email: 'bob.nelson.donda.cavalheiro@gmail.com', senha: '0123'},
    ]);

    const [abreEditarConta, setAbreEditarConta] = useState(false);
    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreCadastro, setAbreCadastro] = useState(false);
    const [abreUpdate, setAbreUpdate] = useState(false);

    return(
        <div>
            <Navbar type='gerenciar'/>

            {abreDeletar && (
                <ModalDeletar
                    fechaDeletar={() => setAbreDeletar(!abreDeletar)}
                    // TODO: deletar funcional (simulando BD)
                >
                    Deseja EXCLUIR esse administrador?
                </ModalDeletar>
            )}

            {abreCadastro && (
                <CadastroAdmin
                    fechaCadastro={() => setAbreCadastro(!abreCadastro)}
                    // TODO: Cadastro funcional (simulando BD)
                >
                </CadastroAdmin>
            )}

            {abreUpdate && (
                <UpdateQRCode
                    fechaUpdate={() => setAbreUpdate(!abreUpdate)}
                    // TODO: Update funcional (simulando BD)
                >
                </UpdateQRCode>
            )}

            {abreEditarConta && (
                <EditarContaAdmin
                    fechaEdicao={() => setAbreEditarConta(!abreEditarConta)}
                    // TODO: Edicao de conta funcional (simulando BD)
                >
                </EditarContaAdmin>
            )}

            <div 
            style={{
                filter: abreDeletar || abreCadastro || abreUpdate || abreEditarConta ? 'blur(5px)' : 'none',
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
                    <ButtonAdd style={{width:'35%'}} onClick={() => setAbreCadastro(!abreCadastro)}>Adicionar novo admin</ButtonAdd>
                </div>

                <div id="container-funcoes-admin">
                    <div className='titulos-admin'>
                        <h1>Funções do administrador</h1>
                    </div>

                    <div className='container-btn-funcoes'>
                    <Link to="/gerenciar/inscricoes" style={{ width: '40%' }}>
                        <ButtonAdd style={{width:'100%'}}>Acessar inscrições</ButtonAdd>
                    </Link>
                        <ButtonAdd style={{width:'40%'}} onClick={() => setAbreUpdate(!abreUpdate)}>Alterar QR Code</ButtonAdd>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );

}