//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
import '../../App.css'
//routes
//components
import { Button } from "../components/Button"
import { InsertModal } from "../components/InsertModal"
import { Table } from '../components/Table'
import { ViewModal } from '../components/ViewModal'


export function Dashboard() {
  const pageTitle = 'Dashboard'
    const [name, setName] = useState('') //authenticated user's name
      const [data, setData] = useState([]) //stores data sent by the server from database
        const [selectedIndex, setSelectedIndex] = useState('') //key for data
  const [userdata, setUserData] = useState([{ //stores user data that will be sent to server
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
        //to update the data to user data based from user input
        const handleChange = ( e ) => {
          setUserData(prev => ({
            ...prev,
            [ e.target.name ]: e.target.value
          }))}
          //send user data from client to server
          const sendUserData = () => {
            if (!userdata.FirstName == "" && !userdata.LastName == "" && !userdata.Birthday == "" && !userdata.UserLevel == "" ) {
              axios.post('http://localhost:8081/add-user', userdata)
              .then(res => {
                try {
                  window.location.reload(true)
                } catch(err) {
                  console.log(err)
                }
              })
              .catch(err => console.log(err))
            } else {
              document.getElementById("err").textContent = "Missing Input/s" }}

  return (
    <>
      <main className="p-3 overflow" style={{height:"100vh"}}>
        <header className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h1>{ pageTitle }</h1>
              <h5>You are Authorized { name }, </h5>
            </div>
            <div className='d-flex align-items-center mx-3 gap-3'>
              <Button
                class={ "btn btn-primary" } 
                  text={ "Logout" } 
                    disabled={ false }
                      onClick={ handleLogout }
                />
                <Button
                    class={ "btn btn-primary" }
                      text={ "Add User" } 
                        disabled={ false }
                          onClick={ () => console.log("open-modal") }
                            databstoggle={ "modal" }
                              databstarget={ "#insertModal" }
                  />
              </div>
            </header>
            <Table 
              tablename={ pageTitle }
                data={
                  data.map((data, index) => (        
                    <tr key={ index }>
                      <td className="ID">{ data.UserID }</td>
                        <td>{ data.LastName.concat(", ", data.FirstName) }</td>
                          <td className="Actions">
                            <div className="ActionsButton">
                              <Button
                                class={ "btn btn-primary" }  
                                  text={ "View" } 
                                    disabled={ false }
                                      onClick={ () => {
                                        setSelectedIndex( index )
                                          setUserProfile({
                                            ID: data.UserID,
                                              Name: data.LastName.concat(", ", data.FirstName)
                                          })}}
                                        databstoggle={ "modal" }
                                          databstarget={ "#viewModal" }
                                />
                                <Button
                                  class={ "btn btn-primary" }  
                                    text={ "Edit" } 
                                      disabled={ false }
                                        onClick={ () => console.log("Hello World") }
                                  />
                              </div>
                          </td>
                      </tr>
                  ))}
                  rows={ userprofile.length }
              />
              <ViewModal 
                title={ "Users" }
                  body={ 
                    <div className="card">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <p className='p-0 m-0'><span className='fs-6'>ID:</span> { userprofile.ID }</p>
                          </li>
                          <li className="list-group-item">
                            <p className='p-0 m-0'><span className='fs-6'>Name:</span> { userprofile.Name }</p>
                            </li>
                        </ul>
                      </div>
                    }
                />
                <InsertModal 
                  insert_modal_title={ "Add".concat(" ",  pageTitle.concat(" Details")) }
                    insert_modal_content={
                      <form>
                        <input 
                          className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                            type={ "text" }
                              placeholder={ "FirstName" }
                                onChange={ handleChange } 
                                  name={ "FirstName" }
                          />
                          <input 
                            className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                              type={ "text" }
                                placeholder={ "LastName" }
                                  onChange={ handleChange } 
                                    name={ "LastName" }
                            />
                            <input 
                              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                                type={ "email" }
                                  placeholder={ "Birthday (yyyy-mm-dd)" }
                                    onChange={ handleChange } 
                                      name={ "Birthday" }
                              />
                              <input 
                                className={ "d-block w-100 px-4 py-2 form-control" }
                                  type={ "text" }
                                    placeholder={ "User Level (Student | Coach | Admin)" }
                                      onChange={ handleChange } 
                                        name={ "UserLevel" }
                                />
                        <p id='err' className='input-error'></p>
                        </form>
                      }
                      insert_modal_insert={ sendUserData } 
                />
        </main>
      </>
  )}