import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { Home } from './pages/Home';
import { Eventos } from './pages/Eventos';
import { Alimentos } from './pages/Alimentos';
import { Itens } from './pages/Itens';
import { PainelControle } from './pages/PainelControle';
import { Inscricoes } from './pages/Inscricoes';
import { Rotas } from './pages/Rotas'
import { Login } from './pages/Login';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/'  Component={Home} />
          <Route path='/login'  Component={Login} />
          <Route path='/eventos' Component={Eventos} />
          <Route path='/alimentos' Component={Alimentos}/>
          <Route path='/itens' Component={Itens}/>
          <Route path='/gerenciar' Component={PainelControle}/>
          <Route path='/gerenciar/inscricoes' Component={Inscricoes}/>
          <Route path='/rotas' Component={Rotas}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
