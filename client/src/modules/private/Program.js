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
import { Link, Navigate } from 'react-router-dom'

export function Program() {
  const page = 'Program'
    const [data, setData] = useState([])
      const [selectedIndex, setSelectedIndex] = useState('')
  const [userdata, setUserData] = useState([{
    ID: "",
      Name: "",
    }])

  //get data from server: for program table
  useEffect(() =>  {
    axios.get('http://localhost:8081/view-program')
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
    })
    }, [])

  return (
    <>
      <TablePageWrapper 
        page={ page }
          class={ "btn btn-primary" }
            text={ "Add " + page }
              databstoggle={ "modal" }
                databstarget={ "#insertModal" }
        tablename={ page }
          data={
            data.map((data, index) => (        
              <tr key={ index }>
                <td className="ID">{ data.ProgramID }</td>
                  <td>{ data.Name }</td>
                    <td className="Actions">
                      <div className="ActionsButton">
                        <Link 
                          to={ "/view-profile/program/"+ index + "/" + data.ProgramID}
                            state={{ 
                              Entity: "Program",
                                ProgramID: data.ProgramID,
                                Name: data.Name,
                                ProgramCode: data.ProgramCode,
                                Description: data.Description,
                                Category: data.Category,
                                
                              }} >
                              <Button
                                class={ "btn btn-info" }  
                                  text={ <img src={ view } width="20" height="20" className='custom-icon' /> } 
                                    onClick={ () => {} }
                                />
                        </Link>
                        <Link 
                          to={ "/edit-profile/program/"+ index + "/" + data.ProgramID}
                            state={{ 
                              Entity: "Program",
                                ProgramID: data.ProgramID,
                                Name: data.Name,
                                ProgramCode: data.ProgramCode,
                                Description: data.Description,
                                Category: data.Category,
                                
                              }} >
                              <Button
                                class={ "btn btn-warning" }  
                                  text={ <img src={ edit } width="20" height="20" className='custom-icon' /> } 
                                    onClick={ () => {} }
                                />
                        </Link>
                        </div>
                      </td>
                </tr>
              ))}
            datalength={ data.length }
        viewmodaltitle={ page.concat(" Details") }
          viewmodalbody={
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
          }
      />
    </>
  )
}
  
  