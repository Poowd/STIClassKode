//dependencies
import axios from 'axios';
import React, { useEffect, useState, } from "react";
import { Routes, Route, useNavigate, Navigate, Link } from 'react-router-dom';
//css
import './App.css';
//routes
import { Dashboard } from './modules/private/Dashboard'
import { Login } from './modules/public/Login';
import { Section } from './modules/private/file_maintainance/Section';
//components
import { Course } from './modules/private/file_maintainance/Course';
import { Homepage } from './modules/user/Homepage';
import { Program } from './modules/private/file_maintainance/Program';
import { ViewProfile } from './modules/private/interactions/ViewProfile';
import { EditProfile } from './modules/private/interactions/EditProfile';
import { InsertProfile } from './modules/private/interactions/InsertProfile';
import { Schedule } from './modules/private/schedules/Schedule';
import { NewFormat } from './modules/private/new/NewFormat';
import { EditPage } from './modules/private/new/EditPage';
import { Layout1 } from './modules/layout/Layout1';
import { Button } from './modules/components/Button';
import { Sidebar } from './modules/components/Sidebar';
import { Coach } from './modules/private/file_maintainance/Coach';
import { Room } from './modules/private/file_maintainance/Room';

function App() {
  const navigate = new useNavigate();
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [userlevel, setUserLevel] = useState('');
  const [userdetails, setUserDetails] = useState({
    Auth: false,
    UUID: "",
    Name: "",
    Message: "",
    UserType: "",
    File_Maintainance: "",
    Access_icon: "",
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
          UUID: res.data.UUID,
          Name: res.data.Name,
          UserType: res.data.UserType,
          File_Maintainance: res.data.File_Maintainance,
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

  const handleLogout = () => {
    axios.post('http://localhost:8081/logout')
    .then(res => {
      if (res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error");
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <main>
        {
          userdetails.Auth ?
            <Layout1
              header={
                <section className='w-100 h-100 d-flex align-items-center justify-content-between'>
                  <span className='fw-bold text-light fs-4 mb-1'>Class Kode</span>
                  <section className='d-flex gap-3'>
                    <div className="dropdown dropdown">
                      <button className="btn btn-link dropdown-toggle d-flex align-items-center text-light my-2 btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="45,10">
                        <span className=" d-sm-inline ms-2 me-1 text-light">{ userdetails.Name }</span>
                      </button>
                      <ul className="dropdown-menu">
                        <Link to={"/"} className='dropdown-item'>
                          <li>Action</li>
                        </Link>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                        <div className='d-flex align-items-center'>
                          <Button
                            class={"btn btn-danger"} 
                            text={"Logout"} 
                            disabled={false}
                            onClick={handleLogout}
                          />
                        </div>
                        </li>
                      </ul>
                    </div>
                    <Button 
                      class={"btn btn-primary my-2 btn-sm"} 
                        text={"Logout"}
                          onClick={handleLogout}
                    />
                  </section>
                </section>
              }
              sidebar={
                <Sidebar 
                  File_Maintainance={userdetails.File_Maintainance}
                />
              }
              content={
                <Routes>
                  <Route path='/' element={userdetails.UserType === "Admin" ? <Dashboard />:<Homepage />}></Route>
                  { userdetails.File_Maintainance === "True" ? 
                      <><Route path='/section' element={ <Section /> }></Route>
                        <Route path='/course' element={ <Course /> }></Route>
                        <Route path='/room' element={ <Room /> }></Route>
                        <Route path='/coach' element={ <Coach /> }></Route>
                        <Route path='/program' element={ <Program /> }></Route></>
                      :
                      ""
                  }{
                    userdetails.Access_View === "True" ?
                      <Route path='/view-profile/:type/:index/:id' element={ <ViewProfile /> }></Route>
                      :""
                  }{
                    userdetails.Access_Edit === "True" ?
                      <Route path='/edit-profile/:type/:index/:id' element={ <EditProfile /> }></Route>
                      :""
                  }{
                    userdetails.Access_Insert === "True" ?
                      <Route path='/insert-profile/:type' element={ <InsertProfile /> }></Route>
                      :""
                  }

                    <Route path='/sample' element={ <NewFormat /> }></Route>
                    <Route path='/page' element={ <EditPage /> }></Route>
                    
                    <Route path='/schedule' element={ <Schedule/> }></Route>
                    <Route path='/*' element={ "" }></Route>
                </Routes>
              }
            />
            /* <MainPageWrapper
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

                    <Route path='/layout1' element={ <Layout1 /> }></Route>
                    
                    <Route path='/schedule' element={ <Schedule/> }></Route>
                    <Route path='/*' element={ "" }></Route>
                  </Routes>
              }
            /> */
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
