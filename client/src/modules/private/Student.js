//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
//css
//routes
//components
import { Button } from "../components/Button"
import { TablePageWrapper } from '../components/TablePageWrapper'

export function Student() {
  const pageTitle = 'Student'
    const [data, setData] = useState([])
      const [selectedIndex, setSelectedIndex] = useState('')
  const [studentdata, setStudentData] = useState({
    FirstName: "",
      LastName: "",
        Birthday: "",
          UserLevel: "Student"
    })
    const [userdata, setUserData] = useState([{
      ID: "",
        Name: "",
      }])
      const [editstudent, setEditStudent] = useState({
        StudentID: "",
          FirstName: "",
            MiddleName: "",
              LastName: "",
                StudentType: "",
                  ContactNumber: "",
                    Address: "",
        })

  //get data from server: for student table
  useEffect(() =>  {
    axios.get('http://localhost:8081/student')
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
    })}, [])
    //updates the userdata per keyboard button press in accordance with input tag
    const handleChange = (e) => {
      setStudentData(prev => ({
        ...prev,
        [ e.target.name ]: e.target.value
      }))}
      //submit the form to create an account
      const sendStudentData = () => {
        if (!studentdata.FirstName == "" && !studentdata.LastName == "" && !studentdata.Birthday == "") {
          axios.post('http://localhost:8081/add-user', studentdata)
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
        const updateEditStudent = () => {
          if (!editstudent.FirstName == "" && !editstudent.MiddleName == "" && !editstudent.LastName == "" && !editstudent.StudentType == "" && !editstudent.ContactNumber == "" && !editstudent.Address == "" ) {
            axios.post('http://localhost:8081/update-student', editstudent)
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
            setEditStudent(prev => ({
              ...prev,
              [ e.target.name ]: e.target.value
            }))}
            const selectedValue = (e) => {
              setEditStudent(prev => ({
                ...prev,
                [ e.target.name ]: document.getElementById( e.target.id ).value
              }))}

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
                  <td className="ID">{ data.StudentID }</td>
                    <td>{ data.LastName.concat(", ", data.FirstName) }</td>
                      <td className="Actions">
                        <div className="ActionsButton">
                          <Button
                            class={ "btn btn-primary" }  
                              text={ "View" } 
                                onClick={ () => {
                                  setSelectedIndex(index)
                                    setUserData({
                                      ID: data.StudentID,
                                        Name: data.LastName.concat(", ", data.FirstName)
                                      })}}
                                  databstoggle={ "modal" }
                                    databstarget={ "#viewModal" }
                            />
                            <Button
                              class={ "btn btn-primary" }  
                                text={ "Edit" } 
                                  onClick={ () => {
                                    setSelectedIndex( index )
                                      setEditStudent({
                                        StudentID: data.StudentID,
                                          FirstName: data.FirstName,
                                            MiddleName: data.MiddleName,
                                              LastName: data.LastName,
                                                StudentType: data.StudentType,
                                                  ContactNumber: data.ContactNumber,
                                                    Address: data.Address,
                                        })}}
                                    databstoggle={ "modal" }
                                      databstarget={ "#editModal" }
                              />
                          </div>
                        </td>
                  </tr>
              ))}
            datalength={ data.length }
        viewmodalcustomclass={ "modal-lg" }
          viewmodaltitle={ pageTitle.concat(" Details") }
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
        insert_modal_title={ "Add".concat(" ",  pageTitle.concat(" Details")) }
          insert_modal_content={
            <form>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "text" }
                    placeholder={ "First Name" }
                      onChange={ handleChange } 
                        name={ "FirstName" }
                />
                <input 
                  className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                    type={ "text" }
                      placeholder={ "Last Name" }
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
            insert_modal_insert={ sendStudentData }
        edit_modal_title={ "Edit".concat(" ",  pageTitle.concat(" Details")) }
          edit_modal_content={
            <form>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "text" }
                    placeholder={ "FirstName" }
                      onChange={ handleUpdate } 
                        name={ "FirstName" }
                          value={ editstudent.FirstName }
                />
                <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "text" }
                    placeholder={ "MiddleName" }
                      onChange={ handleUpdate } 
                        name={ "MiddleName" }
                          value={ editstudent.MiddleName }
                  />
                  <input 
                    className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                      type={ "text" }
                        placeholder={ "LastName" }
                          onChange={ handleUpdate } 
                            name={ "LastName" }
                              value={ editstudent.LastName }
                    />
                    <select className="d-block w-100 mb-3 px-4 py-2 form-select" aria-label="Default select example" id='StudentType' name='StudentType' onChange={ selectedValue }>
                      <option defaultValue={ editstudent.StudentType }>{ editstudent.StudentType }</option>
                        <option value="Regular">Regular</option>
                          <option value="Irregular">Irregular</option>
                            <option value="Working">Working</option>
                      </select>
                      <input 
                        className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                          type={ "text" }
                            placeholder={ "ContactNumber" }
                              onChange={ handleUpdate } 
                                name={ "ContactNumber" }
                                  value={ editstudent.ContactNumber }
                        />
                        <input 
                          className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                            type={ "text" }
                              placeholder={ "Address" }
                                onChange={ handleUpdate } 
                                  name={ "Address" }
                                    value={ editstudent.Address }
                          />
                    <p id='err' className='input-error'></p>
              </form>
            }
            edit_modal_edit={ updateEditStudent }
        />
      </>
    )}

    //{ editstudent.FirstName }
  
  //   <button type='button' onClick={ () => {
  //     const x = document.getElementById("ee").value
  //     setEditStudent({
  //       FirstName: x
  //     })
  //     console.log("true")
  // } }>dasd</button>