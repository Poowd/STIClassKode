import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../crud/Form';

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

  //submit the form to create an account
    const EditUser = () => {
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
              <label className='fs-6'>School ID</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "text" }
                    placeholder={ "SchoolID" }
                      onChange={ handleChange } 
                        name={ "SchoolID" }
                          value={ edituser.SchoolID }
              />

              <label className='fs-6'>First Name</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "text" }
                    placeholder={ "FirstName" }
                      onChange={ handleChange } 
                        name={ "FirstName" }
                          value={ edituser.FirstName }
              />

              <label className='fs-6'>Last Name</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "text" }
                    placeholder={ "LastName" }
                      onChange={ handleChange } 
                        name={ "LastName" }
                          value={ edituser.LastName }
                />

              <label className='fs-6'>Birthday</label>  
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "email" }
                    placeholder={ "Birthday (yyyy-mm-dd)" }
                      onChange={ handleChange } 
                        name={ "Birthday" }
                          value={ edituser.Birthday }
                />

              <label className='fs-6'>User Level</label>
              <select 
                className="d-block w-100 mb-3 px-4 py-2 form-select" 
                id={ "UserLevel" }
                name={ "UserLevel"}
                onChange={ handleChange }>
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