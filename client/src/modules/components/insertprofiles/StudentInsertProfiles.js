import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../crud/Form';

export function StudentInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [adduser, setAddUser] = useState({
    SchoolID: '',
    FirstName: '',
    LastName: '',
    Birthday: '',
    UserLevel: 'Student',
  })

  //submit the form to create an account
    const AddUser = () => {
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
          form_back={ () => navigate("/student") }
          form_title={ "Insert " + params.type }
          form_content={ 
            <>
              <label className='fs-6'>School ID</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "text" }
                    placeholder={ "SchoolID" }
                      onChange={ handleChange } 
                        name={ "SchoolID" }
                          value={ adduser.SchoolID }
              />

              <label className='fs-6'>First Name</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "text" }
                    placeholder={ "FirstName" }
                      onChange={ handleChange } 
                        name={ "FirstName" }
                          value={ adduser.FirstName }
              />

              <label className='fs-6'>Last Name</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "text" }
                    placeholder={ "LastName" }
                      onChange={ handleChange } 
                        name={ "LastName" }
                          value={ adduser.LastName }
                />

              <label className='fs-6'>Birthday</label>  
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                  type={ "email" }
                    placeholder={ "Birthday (yyyy-mm-dd)" }
                      onChange={ handleChange } 
                        name={ "Birthday" }
                          value={ adduser.Birthday }
                />
            </>
          }
          form_submit={ AddUser }
        />
      </>
    )
}