//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
import '../../App.css'
//routes
//components
import { Button } from "../components/Button"
import { Table } from '../components/Table'
import { ConfirmModal } from '../components/ConfirmModal'
import logoutIcon from '../../assets/icons/switch.png'
import view from '../../assets/icons/view (1).png'
import edit from '../../assets/icons/edit-text.png'
import { Link } from 'react-router-dom'


export function Dashboard() {
  const pageTitle = 'Dashboard'
    const [name, setName] = useState('') //authenticated user's name
      const [data, setData] = useState([]) //stores data sent by the server from database
        const [selectedIndex, setSelectedIndex] = useState('') //key for data
  const [userdata, setUserData] = useState([{ //stores user data that will be sent to server
    SchoolID: "",
    FirstName: "",
      LastName: "",
        Birthday: "",
          UserLevel: "",
    }])
    const [userprofile, setUserProfile] = useState([{ //stores data to show in view modal
      ID: "",
        Name: "",
      }])

  //get the name of the authenticated user
  useEffect(() =>  {
    axios.get('http://localhost:8081')
    .then(res => {
      setName(res.data.Name)
    })}, [])

  //receive data sent by the server from database
  useEffect(() =>  {
    axios.get('http://localhost:8081/view-user')
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
    })}, [])

  //removes token from the browser memory to disable authentication of the current user
  const handleLogout = () => {
    axios.post('http://localhost:8081/logout')
    .then(res => {
      if (res.data.Status === "Success") {
        window.location.reload(true)
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err))}
        

  return (
    <>
      <main className="p-lg-5 overflow" style={{height:"100vh"}}>
        <header className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h1>{ pageTitle }</h1>
              <h5>You are Authorized { name }, </h5>
            </div>
            <div className='d-flex align-items-center'>
              <Button
                class={ "btn btn-danger" } 
                text={ "Logout" } 
                disabled={ false }
                onClick={ () => {} }
                databstoggle="modal" 
                databstarget="#logout"
              />

              <ConfirmModal 
                id={ "logout" }
                icon={ logoutIcon }
                title={ "Logout" }
                subtitle={ "Are you sure you want to logout?" }
                confirm={ handleLogout }
                textclass={ "text-danger" }
                btnclass={ "btn-danger" }
              />
              
            </div>
            </header>
            <div className='w-100 d-flex justify-content-between mb-0'>
              
            <h3 className='text-secondary-emphasis h-100'>List of Users</h3>
              <Link 
                to={ "/insert-profile/user" }>
                <Button
                  class={ "btn btn-primary" }  
                  text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> } 
                  onClick={ () => {} }
                />
              </Link>
            </div>
            <hr className='mt-0'/>
            <Table 
              tablename={ pageTitle }
                data={
                  data.map((data, index) => (        
                    <tr key={ index }>
                      <td className="ID">{ data.SchoolID }</td>
                        <td>{ data.LastName.concat(", ", data.FirstName) }</td>
                          <td className="Actions">
                            <div className="ActionsButton">
                              <Link 
                                to={ "/view-profile/user/"+ index + "/" + data.UserID}
                                  state={{ 
                                    Entity: "User",
                                      UserID: data.UserID,
                                      SchoolID: data.SchoolID,
                                      FirstName: data.FirstName,
                                      LastName: data.LastName,
                                      Birthday: data.Birthday,
                                      UserLevel: data.UserLevel,
                                    }} >
                                    <Button
                                      class={ "btn btn-info" }  
                                        text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
                                          onClick={ () => {} }
                                      />
                                </Link>
                                <Link 
                                  to={ "/edit-profile/user/"+ index + "/" + data.UserID}
                                    state={{ 
                                      Entity: "User",
                                      UserID: data.UserID,
                                      SchoolID: data.SchoolID,
                                      FirstName: data.FirstName,
                                      LastName: data.LastName,
                                      Birthday: data.Birthday,
                                      UserLevel: data.UserLevel,
                                    }} >
                                    <Button
                                      class={ "btn btn-warning" }  
                                        text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> } 
                                          onClick={ () => {} }
                                      />
                                </Link>
                              </div>
                          </td>
                      </tr>
                  ))}
                  rows={ data.length }
              />
        </main>
      </>
  )}