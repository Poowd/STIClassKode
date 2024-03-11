//dependencies
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
//css
import './App.css';
//routes
import { Dashboard } from './modules/private/Dashboard'
import { Login } from './modules/public/Login';
import { Section } from './modules/private/file_maintainance/Section';
//components
import { Student } from './modules/private/file_maintainance/Student';
import { FacultyMember } from './modules/private/file_maintainance/FacultyMember';
import { Course } from './modules/private/file_maintainance/Course';
import { SchoolFacility } from './modules/private/file_maintainance/SchoolFacility';
import { Homepage } from './modules/user/Homepage';
import { MainPageWrapper } from './modules/components/MainPageWrapper';
import { Program } from './modules/private/file_maintainance/Program';
import { ViewProfile } from './modules/private/interactions/ViewProfile';
import { EditProfile } from './modules/private/interactions/EditProfile';
import { InsertProfile } from './modules/private/interactions/InsertProfile';
import { Schedule } from './modules/private/schedules/Schedule';
import { Missing } from './modules/public/Missing';

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
  }, [message])

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
                          
                          <Route path='/schedule' element={ <Schedule /> }></Route>

                          <Route path='/view-profile/:type/:index/:id' element={ <ViewProfile /> }></Route>
                          <Route path='/edit-profile/:type/:index/:id' element={ <EditProfile /> }></Route>
                          <Route path='/insert-profile/:type' element={ <InsertProfile /> }></Route>

                          <Route path='/*' element={ <Missing /> }></Route>
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

                        <Route path='/schedule' element={ <Schedule /> }></Route>

                        <Route path='/view-profile/:type/:index/:id' element={ <ViewProfile /> }></Route>

                        <Route path='/*' element={ <Missing /> }></Route>
                      </Routes>
                    }
              />
          :
            <main>
              <Routes>
                <Route path='/' element={ <Login /> }></Route>

                <Route path='/*' element={ <Missing /> }></Route>
              </Routes>
            </main>
        }
      </main>
    </>
  );
}

export default App;
