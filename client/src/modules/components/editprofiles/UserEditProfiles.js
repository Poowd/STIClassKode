import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../crud/Form';
import { Input } from '../Input';

export function UserEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [edituser, setEditUser] = useState({
    UserID: params.id,
    SchoolID: state.SchoolID,
    FirstName: state.FirstName,
    LastName: state.LastName,
    Birthday: state.Birthday,
    UserLevel: state.UserLevel,
  })

  //---
  const EditUser = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/update-user', edituser)
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
    setEditUser(prev => ({
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
              title={ "School ID" }
              type={ "text" }
              placeholder={ "School ID" }
              trigger={ handleChange }
              name={ "SchoolID" }
              value={ edituser.SchoolID }
              required
            />

            <Input 
              title={ "First Name" }
              type={ "text" }
              placeholder={ "First Name" }
              trigger={ handleChange }
              name={ "FirstName" }
              value={ edituser.FirstName }
              required
            />

            <Input 
              title={ "Last Name" }
              type={ "text" }
              placeholder={ "Last Name" }
              trigger={ handleChange }
              name={ "LastName" }
              value={ edituser.LastName }
              required
            />

            <Input 
              title={ "Birthday" }
              type={ "text" }
              placeholder={ "Birthday" }
              trigger={ handleChange }
              name={ "Birthday" }
              value={ edituser.Birthday }
              required
            />

            <label className='fs-6'>User Level</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "UserLevel" }
              name={ "UserLevel"}
              onChange={ handleChange }
              required>
                <option defaultValue={ edituser.UserLevel }>{ edituser.UserLevel }</option>
                  {edituser.UserLevel === "Admin" ? "":<option value="Admin">Admin</option>}
                  {edituser.UserLevel === "Student" ? "":<option value="Student">Student</option>}
                  {edituser.UserLevel === "Coach" ?  "":<option value="Coach">Coach</option>}
            </select>
          </>
        }
        form_submit={ EditUser }
      />
    </>
  )
}