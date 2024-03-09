import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../components/crud/Form';

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

  //submit the form to create an account
    const EditStudent = () => {
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
              <label className='fs-6'>School Student ID</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                placeholder={ "SchoolStudentID" }
                onChange={ handleChange } 
                name={ "SchoolStudentID" }
                value={ editstudent.SchoolStudentID }
                required
              />

              <label className='fs-6'>First Name</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                placeholder={ "FirstName" }
                onChange={ handleChange } 
                name={ "FirstName" }
                value={ editstudent.FirstName }
                required
              />

              <label className='fs-6'>Middle Name</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                placeholder={ "MiddleName" }
                onChange={ handleChange } 
                name={ "MiddleName" }
                value={ editstudent.MiddleName }
              />

              <label className='fs-6'>Last Name</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                placeholder={ "LastName" }
                onChange={ handleChange } 
                name={ "LastName" }
                value={ editstudent.LastName }
                required
              />

              <label className='fs-6'>Student Type</label>
              <select 
                className="d-block w-100 mb-3 px-4 py-2 form-select" 
                id={ "StudentType" }
                name={ "StudentType"}
                onChange={ handleChange }>
                  <option defaultValue={ editstudent.StudentType }>{ editstudent.StudentType }</option>
                    {editstudent.StudentType === "Regular" ? "":<option value="Regular">Regular</option>}
                    {editstudent.StudentType === "Irregular" ? "":<option value="Irregular">Irregular</option>}
                    {editstudent.StudentType === "Working" ?  "":<option value="Working">Working</option>}
              </select>

              <label className='fs-6'>Contact Number</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                placeholder={ "ContactNumber" }
                onChange={ handleChange } 
                name={ "ContactNumber" }
                value={ editstudent.ContactNumber }
                required
              />

              <label className='fs-6'>Address</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                placeholder={ "Address" }
                onChange={ handleChange } 
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