//dependencies
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
//css
import './App.css';
//routes
import { Dashboard } from './modules/private/_Dashboard'
import { Login } from './modules/public/Login';
import { Section } from './modules/private/Section';
//components
import { Student } from './modules/private/Student';
import { FacultyMember } from './modules/private/FacultyMember';
import { Course } from './modules/private/Course';
import { SchoolFacility } from './modules/private/SchoolFacility';
import { Homepage } from './modules/user/Homepage';
import { MainPageWrapper } from './modules/components/MainPageWrapper';
import { Program } from './modules/private/Program';

function App() {
  const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
      const [message, setMessage] = useState('');
        const [userlevel, setUserLevel] = useState('');

  useEffect(() =>  { //get authentication from server
    axios.get('http://localhost:8081')
    .then(res => {
      if (res.data.Status === "Success") {
        setAuth(true); //set permission based from user level
          setName(res.data.Name); //set authenticated name
            setUserLevel(res.data.UserLevel);
      } else {
        setAuth(false);
          setMessage(res.data.Message);
          console.log(message);
      }
    })
  }, [])

  return (
    <>
      <main>
        {
          auth ?
            userlevel === "Admin" ?
              <MainPageWrapper
                name={ name }
                  userlevel={ userlevel }
                    routes={
                      <Routes>
                          <Route path='/' element={ <Dashboard /> }></Route>
                            <Route path='/section' element={ <Section /> }></Route>
                              <Route path='/student' element={ <Student /> }></Route>
                                <Route path='/course' element={ <Course /> }></Route>
                                  <Route path='/schoolfacility' element={ <SchoolFacility /> }></Route>
                                    <Route path='/facultymember' element={ <FacultyMember /> }></Route>
                                      <Route path='/program' element={ <Program /> }></Route>
                                        <Route path='/*' element={ <Navigate to={"/"} /> }></Route>
                        </Routes>
                    }
              />
            :
              <MainPageWrapper 
                name={ name }
                  user_level={ userlevel }
                    routes={
                      <Routes>
                          <Route path='/' element={ <Homepage /> }></Route>
                            <Route path='/*' element={ <Navigate to={"/"} /> }></Route>
                        </Routes>
                    }
              />
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
