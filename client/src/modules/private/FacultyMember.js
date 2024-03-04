//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
import '../../App.css'
//routes
//components
import { Button } from "../components/Button"
import { TablePageWrapper } from '../components/TablePageWrapper'

export function FacultyMember() {
  const pageTitle = 'Faculty Member'
    const [data, setData] = useState([])
      const [selectedIndex, setSelectedIndex] = useState('')
  const [adduserdata, setAddUserData] = useState({
    FirstName: "",
      LastName: "",
        Birthday: "",
          UserLevel: "Coach",
    })
    const [userdata, setUserData] = useState([{
      ID: "",
        Name: "",
    }])

  //get data from server: for faculty member table
  useEffect(() =>  {
    axios.get('http://localhost:8081/facultymember')
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
    })
    }, [])
    //updates the userdata per keyboard button press in accordance with input tag
    const handleChange = ( e ) => {
      setAddUserData(prev => ({
        ...prev,
        [ e.target.name ]: e.target.value
      }))}
      //submit the form to create an account
      const sendFacultyMemberData = () => {
        if (!adduserdata.FirstName == "" && !adduserdata.LastName == "" && !adduserdata.Birthday == "") {
          axios.post('http://localhost:8081/add-user', adduserdata)
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
      <TablePageWrapper
        page={ pageTitle }
          class={ "btn btn-primary" }
            text={ "Add " + pageTitle }
              databstoggle={ "modal" }
                databstarget={ "#insertModal" }
        tablename={ pageTitle }
          data={
            data.map((data, index) => (        
              <tr key={ index }>
                <td className="ID">{ data.FacultyMemberID }</td>
                  <td>{ data.LastName.concat(", ", data.FirstName) }</td>
                    <td className="Actions">
                      <div className="ActionsButton">
                        <Button
                          class={ "btn btn-primary" } 
                            text={ "View" } 
                              onClick={ () => {
                                setSelectedIndex(index)
                                  setUserData({
                                    ID: data.FacultyMemberID,
                                      Name: data.LastName.concat(", ", data.FirstName)
                                  })}}
                                databstoggle={ "modal" }
                                  databstarget={ "#viewModal" }
                          />
                          <Button
                            class={ "btn btn-primary" }  
                              text={ "Edit" } 
                              onClick={ () => console.log("Hello World") }
                            />
                        </div>
                      </td>
                </tr>
              ))}
              datalength={ data.length }
        viewmodalcustomclass={ "modal-lg" }
          viewmodaltitle={ pageTitle.concat(" Details") }
            viewmodalbody={
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src="https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/325996563_901402471043119_3055784530987425673_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9c7eae&_nc_eui2=AeFcBshotpVTUZ1-4NBh-bDjuk4JT7hXW026TglPuFdbTYTgUIUSvCjoxs6N-rXmSq-t9wZMXnR2gtJwmhPDEGjk&_nc_ohc=IgogvDr9Y6EAX9CCr4o&_nc_ht=scontent.fcrk1-1.fna&cb_e2o_trans=q&oh=00_AfDeSkhbgYiJJSuMr635Fr6rqVAIXrk-K152TqwxYlwhyg&oe=65EAFAB8" className="img-fluid custom-profile-img" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                    <div className="card">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <p className='p-0 m-0'><span className='fs-6'>ID:</span> { userdata.ID }</p>
                          </li>
                        <li className="list-group-item">
                          <p className='p-0 m-0'><span className='fs-6'>Name:</span> { userdata.Name }</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
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
                    className={ "d-block w-100 px-4 py-2 form-control" }
                      type={ "email" }
                        placeholder={ "Birthday (yyyy-mm-dd)" }
                          onChange={ handleChange } 
                            name={ "Birthday" }
                    />
                    <p id='err' className='input-error'></p>
              </form>
            }
          insert_modal_insert={ sendFacultyMemberData }
        />
      </>
    )
}
  
  