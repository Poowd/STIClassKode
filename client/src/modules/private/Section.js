//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
import '../../App.css'
//routes
//components
import { Button } from "../components/Button"
import { TablePageWrapper } from '../components/TablePageWrapper'

export function Section() {
  const pageTitle = 'Section'
    const [data, setData] = useState([])
        const [selectedIndex, setSelectedIndex] = useState('')
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

  //get data from server: for section table
  useEffect(() =>  {
    axios.get('http://localhost:8081/section')
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
    })}, [])
    //show student list filtered from the junction
    useEffect(() =>  {
      axios.get('http://localhost:8081/studentsection')
      .then( res => {
        try {
          setStudentList(res.data)
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
          if (!sectiondata.Name == "" && !sectiondata.Level == "" && !sectiondata.Semester == "") {
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
                        <Button
                          class={ "btn btn-primary" } 
                            text={ "View" } 
                              onClick={ () => {
                                setSelectedIndex(index)
                                  setUserData({
                                    ID: data.SectionID,
                                      Name: data.Name
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
                              if (data.SectionID == userdata.ID) {
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
        />
      </>
    )}

  