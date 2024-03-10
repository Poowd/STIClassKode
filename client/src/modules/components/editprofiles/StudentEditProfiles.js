import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../components/crud/Form';
import { Input } from '../Input';

export function StudentEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [editstudent, setEditStudent] = useState({
    StudentID: params.id,
    SchoolStudentID: state.SchoolStudentID,
    FirstName: state.FirstName,
    MiddleName: state.MiddleName,
    LastName: state.LastName,
    StudentType: state.StudentType,
    ContactNumber: state.ContactNumber,
    Address: state.Address,
  })

  //---
  const EditStudent = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/update-student', editstudent)
    .then(res => {
      try {
        navigate(-1)
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }

  //---
  const handleChange = (e) => {
    setEditStudent(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
    }))}
    
  return (
    <>
      <Form 
        form_title={ "Edit " + params.id }
        form_content={ 
          <>
            <Input 
              title={ "School Student ID" }
              type={ "text" }
              placeholder={ "SchoolStudentID" }
              trigger={ handleChange }
              name={ "SchoolStudentID" }
              value={ editstudent.SchoolStudentID }
              required
            />
            
            <Input 
              title={ "FirstName" }
              type={ "text" }
              placeholder={ "FirstName" }
              trigger={ handleChange }
              name={ "FirstName" }
              value={ editstudent.FirstName }
              required
            />

            <Input 
              title={ "MiddleName" }
              type={ "text" }
              placeholder={ "MiddleName" }
              trigger={ handleChange }
              name={ "MiddleName" }
              value={ editstudent.MiddleName }
              required
            />

            <Input 
              title={ "LastName" }
              type={ "text" }
              placeholder={ "LastName" }
              trigger={ handleChange }
              name={ "LastName" }
              value={ editstudent.LastName }
              required
            />

            <label className='fs-6'>Student Type</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "StudentType" }
              name={ "StudentType"}
              onChange={ handleChange }
              required>
                <option defaultValue={ editstudent.StudentType }>{ editstudent.StudentType }</option>
                  {editstudent.StudentType === "Regular" ? "":<option value="Regular">Regular</option>}
                  {editstudent.StudentType === "Irregular" ? "":<option value="Irregular">Irregular</option>}
                  {editstudent.StudentType === "Working" ?  "":<option value="Working">Working</option>}
            </select>

            <Input 
              title={ "Contact Number" }
              type={ "text" }
              placeholder={ "ContactNumber" }
              trigger={ handleChange }
              name={ "ContactNumber" }
              value={ editstudent.ContactNumber }
              required
            />

            <Input 
              title={ "Address" }
              type={ "text" }
              placeholder={ "Address" }
              trigger={ handleChange }
              name={ "Address" }
              value={ editstudent.Address }
              required
            />
          </>
        }
        form_submit={ EditStudent }
      />
    </>
  )
}