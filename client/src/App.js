import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './modules/private/Home'
import { AcademicYear } from './modules/private/AcademicYear'
import { Curriculum } from './modules/private/Curriculum'
import { Login } from './modules/public/Login';
import { Section } from './modules/private/Section';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/academicyear' element={ <AcademicYear /> }></Route>
        <Route path='/curriculum' element={ <Curriculum /> }></Route>
        <Route path='/section' element={ <Section /> }></Route>
        <Route path='/login' element={ <Login /> }></Route>
      </Routes>
    </>
      
  );
}

export default App;
