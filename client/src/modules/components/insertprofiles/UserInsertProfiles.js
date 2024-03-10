import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../crud/Form';

export function UserInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [adduser, setAddUser] = useState({
    SchoolID: '',
    FirstName: '',
    LastName: '',
    Birthday: '',
    UserLevel: '',
  })

  //---
  const AddUser = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/add-user', adduser)
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
    setAddUser(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}
    
  return (
    <>
      <Form 
        form_back={ () => navigate("/") }
        form_title={ "Insert " + params.type }
        form_content={ 
          <>
            <label htmlFor='SchoolID' className='fs-6'>School ID</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "SchoolID" }
              onChange={ handleChange } 
              name={ "SchoolID" }
              required
            />

            <label htmlFor='FirstName' className='fs-6'>First Name</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "FirstName" }
              onChange={ handleChange } 
              name={ "FirstName" }
              required
            />

            <label htmlFor='LastName' className='fs-6'>Last Name</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "LastName" }
              onChange={ handleChange } 
              name={ "LastName" }
              required
            />

            <label htmlFor='Birthday' className='fs-6'>Birthday</label>  
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "email" }
              placeholder={ "Birthday (yyyy-mm-dd)" }
              onChange={ handleChange } 
              name={ "Birthday" }
              required
            />

            <label htmlFor='UserLevel' className='fs-6'>User Level</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "UserLevel" }
              name={ "UserLevel"}
              onChange={ handleChange }
              required
            >
              <option defaultValue={ adduser.UserLevel }>{ adduser.UserLevel }</option>
                {adduser.UserLevel === "Admin" ? "":<option value="Admin">Admin</option>}
                {adduser.UserLevel === "Student" ? "":<option value="Student">Student</option>}
                {adduser.UserLevel === "Coach" ?  "":<option value="Coach">Coach</option>}
            </select>
          </>
        }
        form_submit={ AddUser }
      />
    </>
  )
}