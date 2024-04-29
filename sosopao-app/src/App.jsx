import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { Home } from './pages/Home';
import { Eventos } from './pages/Eventos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'  Component={Home} />
        <Route path='/eventos' Component={Eventos} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
