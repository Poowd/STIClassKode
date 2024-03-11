//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
//routes
//components
import { Button } from "../../components/Button"
import { TablePageWrapper } from '../../components/TablePageWrapper'
import view from '../../../assets/icons/view (1).png'
import edit from '../../../assets/icons/edit-text.png'
import { Link } from 'react-router-dom'
import '../../../App.css'

export function Schedule() {
  const pageTitle = 'Schedule'
    const [data, setData] = useState([]) //stores data sent by the server from database
  const [coursedata, setCourseData] = useState({ //stores user data that will be sent to server
    Name: "",
      CourseCode: "",
      Type: "",
        Description: "",
          Category: "",
    })
    const [userlevel, setUserLevel] = useState('');
    const [message, setMessage] = useState('');
  
    useEffect(() =>  { //get authentication from server
      axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
              setUserLevel(res.data.UserLevel);
        } else {
            console.log(message);
        }
      })
    }, [message])
  
  //get data from server: for course table
  useEffect(() =>  {
    axios.get('http://localhost:8081/view-schedule')
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
        add={
          userlevel === "Admin" ?
          <Link to={ "/insert-profile/schedule" }>
            <Button 
              class={ "btn btn-primary my-3" } 
                text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> }
                  onClick={ () => {} }
              />
          </Link>
          :
          ""
        }
        tablename={ "Course" }
        data={
          data.map((data, index) => (
            <tr key={ index }>
              <td className='ID'>{ data.ScheduleID }</td>
              <td>{ data.Course }</td>
              <td className="Actions">
              <div className="ActionsButton">
                <Link 
                  to={ "/view-profile/schedule/"+ index + "/" + data.ScheduleID}
                    state={{
                      Entity: "Schedule",
                      ScheduleID: data.ScheduleID
                    }} >
                      <Button
                        class={ "btn btn-info" }  
                          text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
                            onClick={ () => {} }
                        />
                </Link>
                {
                  userlevel === "Admin" ?
                  <Link 
                    to={ "/edit-profile/schedule/"+ index + "/" + data.ScheduleID} 
                      state={{
                        Entity: "Schedule",
                        ScheduleID: data.ScheduleID
                      }} >
                        <Button
                          class={ "btn btn-warning" }  
                            text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> } 
                              onClick={ () => {} }
                          />
                  </Link>
                  :
                  ""
                }
                </div>
              </td>
            </tr>
          ))
        }
        datalength={ data.length }
        />
      </>
  )
}
  
  