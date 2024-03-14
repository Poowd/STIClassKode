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
    const [datas, setDatas] = useState([]) //stores data sent by the server from database
  const [coursedata, setCourseData] = useState({ //stores user data that will be sent to server
    Name: "",
      CourseCode: "",
      Type: "",
        Description: "",
          Category: "",
    })
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
    const [message, setMessage] = useState('');
    const [studentList, setStudentList] = useState([{
      Student: "",
        Section: "",
          FirstName: "",
            LastName: "",
      }])
      const [dataA, setDataA] = useState([]) //stores data sent by the server from database
  
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
        setDatas(res.data)
      } catch(err) {
        console.log(err)
      }
    })}, [])
    const [dataaa, setDataaa] = useState([])

    //show student list filtered from the junction
    useEffect(() =>  {
      axios.get('http://localhost:8081/view-studentsection')
      .then( res => {
        try {
          setStudentList(res.data)
        } catch(err) {
          console.log(err)
        }
      })}, [])

      //receive data sent by the server from database
  useEffect(() =>  {
    axios.get('http://localhost:8081/view-user')
    .then( res => {
      try {
        setDataA(res.data)
      } catch(err) {
        console.log(err)
      }
    })}, [])

    //get data from server: for student table
  useEffect(() =>  {
    axios.get('http://localhost:8081/view-student')
    .then( res => {
      try {
        setDataaa(res.data)
      } catch(err) {
        console.log(err)
      }
    })}, [])

  return (
    <>
      <TablePageWrapper
        page={ pageTitle }
        add={
          userdetails.Access_Insert === "True" ?
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
          userdetails.UserLevel === "Admin" ?
          datas.map((data, index) => (
            <tr key={ index }>
              <td className='ID'>{ data.ScheduleID }</td>
              <td>{ data.Section }</td>
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
                  userdetails.Access_Insert === "True" ?
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
          :
          dataaa.map((data, index) => (
            //console.log(userdetails.UserID, data.UserID),
            userdetails.UserID === data.UserID ?
              studentList.map((data1, index) => (
                //console.log(data.StudentID, data1.StudentID),
                data.StudentID === data1.StudentID ?
                  datas.map((data2, index) => (
                    console.log(datas[index].Section, data1.SectionID),
                    datas[index].Section ===  data1.SectionID ? 
                      <tr>
                        <td>{data2.ScheduleID}</td>
                        <td>{ data2.Section }</td>
                        <td className="Actions">
                        <div className="ActionsButton">
                          <Link 
                            to={ "/view-profile/schedule/"+ index + "/" + data2.ScheduleID}
                              state={{
                                Entity: "Schedule",
                                ScheduleID: data2.ScheduleID
                              }} >
                                <Button
                                  class={ "btn btn-info" }  
                                    text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
                                      onClick={ () => {} }
                                  />
                          </Link>
                          {
                            userdetails.Access_Insert === "True" ?
                            <Link 
                              to={ "/edit-profile/schedule/"+ index + "/" + data2.ScheduleID} 
                                state={{
                                  Entity: "Schedule",
                                  ScheduleID: data2.ScheduleID
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
                    : ""
                ))
                :
                ""
              ))
              :
              ""
          ))
        }
        
        datalength={ datas.length }
      />
      
    </>
  )
}
  
  