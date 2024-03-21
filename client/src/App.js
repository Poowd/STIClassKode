//dependencies
import axios from 'axios';
import React, { useEffect, useState, } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
import { NewFormat } from './modules/private/new/NewFormat';
import { EditPage } from './modules/private/new/EditPage';

function App() {
  const navigate = new useNavigate();
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [userlevel, setUserLevel] = useState('');
  const [userdetails, setUserDetails] = useState({
    Auth: false,
    UserID: "",
    Name: "",
    Message: "",
    UserLevel: "",
    File_Management: "",
    Access_View: "",
    Access_Edit: "",
    Access_Insert: "",
  })
  const [data, setData] = useState([])

  useEffect(() =>  { //get authentication from server
    axios.get('http://localhost:8081')
    .then(res => {
      if (res.data.Status === "Success") {
        setUserDetails({
          Auth: true,
          UserID: res.data.UserID,
          Name: res.data.Name,
          UserLevel: res.data.UserLevel,
          File_Management: res.data.File_Management,
          Access_View: res.data.Access_View,
          Access_Edit: res.data.Access_Edit,
          Access_Insert: res.data.Access_Insert,
        })
        // setAuth(true); //set permission based from user level
        //   setName(res.data.Name); //set authenticated name
        //     setUserLevel(res.data.UserLevel);
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
          userdetails.Auth ?
            <>
              <MainPageWrapper
                name={ userdetails.Name }
                File_Management={ userdetails.File_Management }
                routes={
                  <Routes>
                    {
                      userdetails.UserLevel === "Admin" ?
                        <Route path='/' element={ <Dashboard /> }></Route>
                      :
                        <Route path='/' element={ <Homepage /> }></Route>
                    }{ 
                      userdetails.File_Management === "True" ? 
                        <>
                          <Route path='/section' element={ <Section /> }></Route>
                          <Route path='/student' element={ <Student /> }></Route>
                          <Route path='/course' element={ <Course /> }></Route>
                          <Route path='/schoolfacility' element={ <SchoolFacility /> }></Route>
                          <Route path='/facultymember' element={ <FacultyMember /> }></Route>
                          <Route path='/program' element={ <Program /> }></Route>
                        </>
                      : ""
                    }{
                      userdetails.Access_View === "True" ?
                      <Route path='/view-profile/:type/:index/:id' element={ <ViewProfile /> }></Route>
                      : ""
                    }{
                      userdetails.Access_Edit === "True" ?
                      <Route path='/edit-profile/:type/:index/:id' element={ <EditProfile /> }></Route>
                      : ""
                    }{
                      userdetails.Access_Insert === "True" ?
                      <Route path='/insert-profile/:type' element={ <InsertProfile /> }></Route>
                      : ""
                    }
                      <Route path='/sample' element={ <NewFormat /> }></Route>
                      <Route path='/page' element={ <EditPage /> }></Route>
                      
                      <Route path='/schedule' element={ <Schedule/> }></Route>
                      <Route path='/*' element={ "" }></Route>
                    </Routes>
                }
              />
            </>
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
