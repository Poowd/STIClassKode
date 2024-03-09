//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
import '../../App.css'
//routes
//components
import { Button } from "../components/Button"
import { TablePageWrapper } from '../components/TablePageWrapper'
import view from '../../assets/icons/view (1).png'
import edit from '../../assets/icons/edit-text.png'
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
    
      //updates the userdata per keyboard button press in accordance with input tag
      const handleChange = ( e ) => {
        setSectionData(prev => ({
          ...prev,
          [ e.target.name ]: e.target.value
        }))}
        //submit the form to create an account
        const sendSectionData = () => {
          if (!sectiondata.Name === "" && !sectiondata.Level === "" && !sectiondata.Semester === "") {
            axios.post('http://localhost:8081/add-section', sectiondata)
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
          //submit the form to create an account
          const updateEditSection = () => {
            if (!editsection.Name === "" && !editsection.Level === "" && !editsection.Semester === "" ) {
              axios.post('http://localhost:8081/update-section', editsection)
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
            //---
            const handleUpdate = (e) => {
              setEditSection(prev => ({
                ...prev,
                [ e.target.name ]: e.target.value
              }))}
              const selectedValue = (e) => {
                setEditSection(prev => ({
                  ...prev,
                  [ e.target.name ]: document.getElementById( e.target.id ).value
                }))}
                
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
          class={ "btn btn-primary" }
            text={ "Add " + pageTitle }
              databstoggle={ "modal" }
                databstarget={ "#insertModal" }
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
        viewmodalcustomclass={ "modal-lg" }
          viewmodaltitle={ pageTitle.concat(" Details") }
            viewmodalbody={
                <div class="container">
                  <div class="row align-items-start">
                    <div class="col-5 border-end">
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
                    <div class="col-7">
                      <p>Students:</p>
                        <ul className='StudentList'>
                          {
                            studentList.map((data, index) => {
                              if (data.SectionID === userdata.ID) {
                                return <li className='d-block w-100 text-start' key={ index }> {data.StudentID} : {data.LastName.concat(", ", data.FirstName)} </li>
                              }})}
                          </ul>
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
                    placeholder={ "Name" }
                      onChange={ handleChange } 
                        name={ "Name" }
                />
                <input 
                  className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                    type={ "text" }
                      placeholder={ "Level" }
                        onChange={ handleChange } 
                          name={ "Level" }
                  />
                  <input 
                    className={ "d-block w-100 px-4 py-2 form-control" }
                      type={ "text" }
                        placeholder={ "Semester" }
                          onChange={ handleChange } 
                            name={ "Semester" }
                    />
                    <p id='err' className='input-error'></p>
            </form>
          }
          insert_modal_insert={ sendSectionData }
        edit_modal_title={ "Edit".concat(" ",  pageTitle.concat(" Details")) }
          edit_modal_content={
            <form>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "text" }
                    placeholder={ "Name" }
                      onChange={ handleUpdate } 
                        name={ "Name" }
                          value={ editsection.Name }
                />
                <select className="d-block w-100 mb-3 px-4 py-2 form-select" aria-label="Default select example" id='Level' name='Level' onChange={ selectedValue }>
                  <option defaultValue={ editsection.Level }>{ editsection.Level }</option>
                    <option value="First Year">First Year</option>
                      <option value="Second Year">Second Year</option>
                        <option value="Third Year">Third Year</option>
                          <option value="Fourth Year">Fourth Year</option>
                  </select>
                  <select className="d-block w-100 mb-3 px-4 py-2 form-select" aria-label="Default select example" id='Semester' name='Semester' onChange={ selectedValue }>
                    <option defaultValue={ editsection.Semester }>{ editsection.Semester }</option>
                      <option value="First Semester">First Semester</option>
                        <option value="Second Semester">Second Semester</option>
                    </select>
                    <p id='err' className='input-error'></p>
              </form>
            }
            edit_modal_edit={ updateEditSection }
        />
      </>
    )}

  