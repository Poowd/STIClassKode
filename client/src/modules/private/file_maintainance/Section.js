//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
import '../../../App.css'
//routes
//components
import { Button } from "../../components/Button"
import { TablePageWrapper } from '../../components/TablePageWrapper'
import view from '../../../assets/icons/view (1).png'
import edit from '../../../assets/icons/edit-text.png'
import { Link } from 'react-router-dom'

export function Section() {
  const pageTitle = 'Section'
    const [data, setData] = useState([])
  const [studentList, setStudentList] = useState([{
    Student: "",
      Section: "",
        FirstName: "",
          LastName: "",
    }])
    const [sectiondata, setSectionData] = useState([{
      Name: "",
        Level: "",
          Semester: "",
      }])
      const [userdata, setUserData] = useState([{
        ID: "",
          Name: "",
        }])
        const [editsection, setEditSection] = useState({
          SectionID: "",
            Name: "",
              Level: "",
                Semester: "",
          })

  //get data from server: for section table
  useEffect(() =>  {
    axios.get('http://localhost:8081/view-section')
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
    })}, [])
    
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

  return (
    <>
      <TablePageWrapper
        page={ pageTitle }
        add={
          <Link to={ "/insert-profile/section" }>
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
                <td className="ID">{ data.SectionID }</td>
                  <td>{ data.Name }</td>
                    <td className="Actions">
                      <div className="ActionsButton">
                        <Link 
                          to={ "/view-profile/section/"+ index + "/" + data.SectionID}
                            state={{ 
                              Entity: "Section",
                                SectionID: data.SectionID,
                                Name: data.Name,
                                Level: data.Level,
                                Semester: data.Semester,
                                StudentList: studentList
                              }} >
                              <Button
                                class={ "btn btn-info" }  
                                  text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
                                    onClick={ () => {} }
                                />
                        </Link>
                        <Link 
                          to={ "/edit-profile/section/"+ index + "/" + data.SectionID}
                          state={{ 
                            Entity: "Section",
                            SectionID: data.SectionID,
                            Name: data.Name,
                            Level: data.Level,
                            Semester: data.Semester,
                            StudentList: studentList
                          }}>
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

  