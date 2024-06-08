import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';


import { Home } from './pages/Home';
import { Eventos } from './pages/Eventos';
import { Alimentos } from './pages/Alimentos';
import { Itens } from './pages/Itens';
import { PainelControle } from './pages/PainelControle';
import { Inscricoes } from './pages/Inscricoes';
import { Rotas } from './pages/Rotas'
import { Login } from './pages/Login';
import { AuthContext, AuthProvider } from './Context/AuthContext';
import { useContext } from 'react';

function PrivateRoute({children}){
  const {loading, authenticated} = useContext(AuthContext);

  if(loading){
    return <h1>loading...</h1>
  }

  return authenticated ? children : <Navigate to="/login" />;
}


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login'  Component={Login} />
          <Route 
            path='/'  
            element={
                <PrivateRoute>
                  <Home/>
                </PrivateRoute>
              } 
          />
          <Route 
            path='/eventos' 
            element={
              <PrivateRoute>
                <Eventos/>
              </PrivateRoute>
            } 
          />
          <Route 
            path='/alimentos' 
            element={
              <PrivateRoute>
                <Alimentos/>
              </PrivateRoute>
            }
          />
          <Route 
            path='/itens' 
            element={
              <PrivateRoute>
                <Itens/>
              </PrivateRoute>
            }
          />
          <Route 
            path='/gerenciar' 
            element={
              <PrivateRoute>
                <PainelControle/>
              </PrivateRoute>
            }
          />
          <Route 
            path='/gerenciar/inscricoes'
            element={
              <PrivateRoute>
                <Inscricoes/>
              </PrivateRoute>
            }
          />
          <Route 
            path='/rotas' 
            element={
              <PrivateRoute>
                <Rotas/>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
