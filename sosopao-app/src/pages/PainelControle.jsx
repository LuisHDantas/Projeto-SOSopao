import { useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ButtonAdd } from "../components/buttonAdd";
import { CardAdmin } from "../components/cardAdmin";
import { ModalDeletar } from "../components/ModalDeletar";
import { CadastroAdmin } from '../components/ModalCadastroAdmin';
import { UpdateQRCode } from '../components/ModalUpdateQRCode';
import { EditarContaAdmin } from '../components/ModalEditarContaAdmin';
import { Link } from 'react-router-dom';
import { Loading } from "../components/Loading/";
import axios from 'axios';
import '../styles/painelcontrole.css';

const DataFetcher = async (setDados, setLoading, setError, setIsSuper) => {
    try {
        const response = await axios.get('/usuarios');
        setDados(response.data);
        setLoading(false);

        const admin = await axios.get('/validateSuperToken');
        
        if (admin.status === 200) {
            setIsSuper(true);
        }else{
            setIsSuper(false);
        }
    } catch (error) {
        setError(error);
        setLoading(false);
    }
};

export function PainelControle(){

    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [abreEditarConta, setAbreEditarConta] = useState(false);
    const [abreDeletar, setAbreDeletar] = useState(false);
    const [abreCadastro, setAbreCadastro] = useState(false);
    const [abreUpdate, setAbreUpdate] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [isSuper, setIsSuper] = useState(false);

    useEffect(() => {
        DataFetcher(setDados, setLoading, setError, setIsSuper);
    }, []);

    const handleDeleteRequest = async (id) => {
        try {
            await axios.delete(`usuarios/${id}`);
            return true;
        } catch (error) {
            console.error("Erro ao deletar admin:", error);
            return false;
        }
    };


    const handleDelete = async (index) => {
        const id = dados[index].id_usuario;
        const deleteSuccess = await handleDeleteRequest(id);

        if (deleteSuccess) {
            let updatedData = dados.filter((_, i) => i !== index);

            setDados(updatedData);
            setAbreDeletar(false);
        }
    };

    if (error) return <p>Error: {error.message}</p>;
    return(
        <div>
            <Navbar type='gerenciar'/>

            {abreDeletar && (
                <ModalDeletar
                    fechaDeletar={() => setAbreDeletar(!abreDeletar)}
                    onDelete={handleDelete}
                    index={clickedIndex}
                >
                    Deseja EXCLUIR esse administrador?
                </ModalDeletar>
            )}

            {abreCadastro && (
                <CadastroAdmin
                    fechaCadastro={() => setAbreCadastro(!abreCadastro)}
                    dados={dados}
                    setDados={setDados}
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
                    dados={dados}
                    setDados={setDados}
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

                    {loading ? <Loading/> : dados?.map((admin, index) => {
                        if(!admin.ehSuperadmin){
                            return(
                                <CardAdmin 
                                    key={index}
                                    isSuper={isSuper}
                                    nome={admin.nome} 
                                    email={admin.email}
    
                                    abreDeletar={() => {
                                        setAbreDeletar(!abreDeletar);
                                        setClickedIndex(index);
                                        } 
                                    }  
                                />
                            );} else {
                                return null;
                            }
                        }
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
