//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
//routes
//components
import { Button } from "../components/Button"
import { TablePageWrapper } from '../components/TablePageWrapper'

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
                        <Button
                          class={ "btn btn-primary" } 
                            text={ "View" } 
                              onClick={ () => {
                                setSelectedIndex(index)
                                  setUserData({
                                    ID: data.ProgramID,
                                      Name: data.Name
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
  
  