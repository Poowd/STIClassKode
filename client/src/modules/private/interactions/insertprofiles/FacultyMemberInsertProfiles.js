import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';

export function FacultyMemberInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [adduser, setAddUser] = useState({
    SchoolID: '',
    FirstName: '',
    LastName: '',
    Birthday: '',
    UserLevel: 'Coach',
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
          adduser.Birthday !== "" ? true : false
        }
        form_status={ "You have successfully created a " + params.type }
        form_back={ () => navigate("/facultymember") }
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
          </>
        }
        form_submit={ AddUser }
      />
    </>
  )
}