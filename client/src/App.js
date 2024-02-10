import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './modules/public/Home'
import { About } from './modules/public/About'
import { Login } from './modules/public/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home /> }></Route>
      <Route path='/about' element={ <About /> }></Route>
      <Route path='/login' element={ <Login /> }></Route>
    </Routes>
  );
}

export default App;
