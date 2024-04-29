import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { Home } from './pages/Home';
import { Alimentos } from './pages/Alimentos';
import { Itens } from './pages/Itens';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'  Component={Home} />
        <Route path='/alimentos' Component={Alimentos}/>
        <Route path='/itens' Component={Itens}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
