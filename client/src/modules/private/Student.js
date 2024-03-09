//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
//routes
//components
import { Button } from "../components/Button"
import { TablePageWrapper } from '../components/TablePageWrapper'
import view from '../../assets/icons/view (1).png'
import edit from '../../assets/icons/edit-text.png'
import { Link } from 'react-router-dom'
import { ConfirmModal } from '../components/ConfirmModal'

export function Student() {
  const pageTitle = 'Student'
    const [data, setData] = useState([])
  //get data from server: for student table
  useEffect(() =>  {
    axios.get('http://localhost:8081/view-student')
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
    })}, [])

  return (
    <>
      <TablePageWrapper
        page={ pageTitle }
          insert={ "/insert-profile/student" }
            class={ "btn btn-primary" }
              text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> }
        tablename={ pageTitle }
          data={
              data.map((data, index) => (        
                <tr key={ index }>
                  <td className="ID">{ data.SchoolStudentID }</td>
                    <td>{ data.LastName.concat(", ", data.FirstName) }</td>
                      <td className="Actions">
                        <div className="ActionsButton">
                          <Link 
                            to={ "/view-profile/student/"+ index + "/" + data.StudentID}
                              state={{ 
                                Entity: "Student",
                                  StudentID: data.StudentID,
                                    UserID: data.UserID,
                                    SchoolStudentID: data.SchoolStudentID,
                                      FirstName: data.FirstName,
                                        MiddleName: data.MiddleName,
                                          LastName: data.LastName,
                                            StudentType: data.StudentType,
                                              Email: data.Email,
                                                ContactNumber: data.ContactNumber,
                                                  Address: data.Address,
                                                    DateCreated: data.DateCreated,
                                }} >
                                <Button
                                  class={ "btn btn-info" }  
                                    text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
                                      onClick={ () => { } }
                                  />
                          </Link>
                            <Link 
                              to={ "/edit-profile/student/"+ index + "/" + data.StudentID} 
                                state={{ 
                                  StudentID: data.StudentID,
                                    UserID: data.UserID,
                                    SchoolStudentID: data.SchoolStudentID,
                                      FirstName: data.FirstName,
                                        MiddleName: data.MiddleName,
                                          LastName: data.LastName,
                                            StudentType: data.StudentType,
                                              Email: data.Email,
                                                ContactNumber: data.ContactNumber,
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
        />
      </>
    )}