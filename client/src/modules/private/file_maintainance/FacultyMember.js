//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
import '../../../App.css'
//routes
//components
import { Button } from "../../components/Button"
import { TablePageWrapper } from '../../components/TablePageWrapper'
import { Link } from 'react-router-dom'
import view from '../../../assets/icons/view (1).png'
import edit from '../../../assets/icons/edit-text.png'

export function FacultyMember() {
  const pageTitle = 'Faculty Member'
    const [data, setData] = useState([])
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
    axios.get('http://localhost:8081/view-facultymember')
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
        if (!adduserdata.FirstName === "" && !adduserdata.LastName === "" && !adduserdata.Birthday === "") {
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
        add={
          <Link to={ "/insert-profile/facultymember" }>
            <Button 
              class={ "btn btn-primary my-3" } 
                text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> }
                  onClick={ () => {} }
              />
          </Link>
        }
        tablename={ pageTitle }
          data={
            data.map((data, index) => (        
              <tr key={ index }>
                <td className="ID">{ data.SchoolFacultyMemberID }</td>
                  <td>{ data.LastName.concat(", ", data.FirstName) }</td>
                    <td className="Actions">
                      <div className="ActionsButton">
                          <Link 
                            to={ "/view-profile/facultymember/" + index + "/" + data.FacultyMemberID}
                              state={{ 
                                Entity: "Faculty Member",
                                  FacultyMemberID: data.FacultyMemberID,
                                    UserID: data.UserID,
                                    SchoolFacultyMemberID: data.SchoolFacultyMemberID,
                                      FirstName: data.FirstName,
                                        MiddleName: data.MiddleName,
                                          LastName: data.LastName,
                                            FacultyMemberType: data.FacultyMemberType,
                                              Email: data.Email,
                                                ContactNumber: data.ContactNumber,
                                                  FacebookLink: data.FacebookLink,
                                                    Address: data.Address,
                                                      DateCreated: data.DateCreated,
                                }} >
                                <Button
                                  class={ "btn btn-info" }  
                                    text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
                                      onClick={ () => {} }
                                  />
                          </Link>
                          <Link 
                              to={ "/edit-profile/facultymember/" + index + "/" + data.FacultyMemberID} 
                                state={{ 
                                  Entity: "Faculty Member",
                                    FacultyMemberID: data.FacultyMemberID,
                                      UserID: data.UserID,
                                      SchoolFacultyMemberID: data.SchoolFacultyMemberID,
                                        FirstName: data.FirstName,
                                          MiddleName: data.MiddleName,
                                            LastName: data.LastName,
                                              FacultyMemberType: data.FacultyMemberType,
                                                Email: data.Email,
                                                  ContactNumber: data.ContactNumber,
                                                    FacebookLink: data.FacebookLink,
                                                      Address: data.Address,
                                                        DateCreated: data.DateCreated,
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
  
  