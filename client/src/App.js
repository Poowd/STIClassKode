//dependencies
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
//css
import './App.css';
//routes
import { Home } from './modules/private/Home'
import { Login } from './modules/public/Login';
import { Section } from './modules/private/Section';
//components
import { Sidebar } from "./modules/components/Sidebar";
import { Student } from './modules/private/Student';
import { FacultyMember } from './modules/private/FacultyMember';
import { Course } from './modules/private/Course';
import { TermsPolicy } from './modules/public/TermsPolicy';
import { Missing } from './modules/public/Missing';
import { SchoolFacility } from './modules/private/SchoolFacility';


function App() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  
  const navigate = useNavigate();

  useEffect(() =>  {
    axios.get('http://localhost:8081')
    .then(res => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setName(res.data.Name);
      } else {
        setAuth(false);
        setMessage(res.data.Message);
      }
    })
  }, [])

  return (
    <>
      <main>
        {
          auth ?
          <main>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 border-end">  {/* Sidebar Here */}
                      <Sidebar name={ name } />
                    </div>
                    <div className="col py-3 overflow-auto"> {/* Content Here */}
                      <Routes>
                        <Route path='/'>
                          <Route path='home' element={ <Home /> }><></></Route>
                          <Route path='section' element={ <Section /> }></Route>
                          <Route path='student' element={ <Student /> }></Route>
                          <Route path='course' element={ <Course /> }></Route>
                          <Route path='schoolfacility' element={ <SchoolFacility /> }></Route>
                          <Route path='facultymember' element={ <FacultyMember /> }></Route>
                        </Route>
                      </Routes>
                    </div>
                </div>
            </div>
          </main>
          :
          <main>
            <Login />
          </main>
        }
      </main>
    </>
  );
}

export default App;
