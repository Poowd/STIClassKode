import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';

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
        status={
          adduser.SchoolID !== "" && 
          adduser.FirstName !== "" && 
          adduser.LastName !== "" && 
          adduser.Birthday !== "" && 
          adduser.UserLevel !== "" ? true : false
        }
        form_status={ "You have successfully created a " + params.type }
        form_back={ () => navigate("/") }
        form_title={ "Insert " + params.type }
        form_content={ 
          <>
            <Input 
              title={ "SchoolID" }
              type={ "text" }
              placeholder={ "SchoolID" }
              trigger={ handleChange }
              name={ "SchoolID" }
              required
            />
            
            <Input 
              title={ "FirstName" }
              type={ "text" }
              placeholder={ "FirstName" }
              trigger={ handleChange }
              name={ "FirstName" }
              required
            />

            <Input 
              title={ "LastName" }
              type={ "text" }
              placeholder={ "LastName" }
              trigger={ handleChange }
              name={ "LastName" }
              required
            />

            <Input 
              title={ "Birthday" }
              type={ "text" }
              placeholder={ "Birthday" }
              trigger={ handleChange }
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