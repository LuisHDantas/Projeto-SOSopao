import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { Home } from './pages/Home';
import { Alimentos } from './pages/Alimentos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'  Component={Home} />
        <Route path='/alimentos' Component={Alimentos}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
