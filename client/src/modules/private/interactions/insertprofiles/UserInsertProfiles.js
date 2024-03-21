import axios from 'axios'
import React, {useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';
import {Form} from '../../../components/Form';
import {Input} from '../../../components/Input';
import { Select } from '../../../components/Select';

export function UserInsertProfiles() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [adduser, setAddUser] = useState({
    SchoolID: '',
    FirstName: '',
    LastName: '',
    Email: '',
    UserType: '',
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
        navigate={() => navigate(-1)}
        status={
          adduser.SchoolID !== "" && 
          adduser.FirstName !== "" && 
          adduser.LastName !== "" && 
          adduser.Email !== "" && 
          adduser.UserType !== "" ? true : false
      }
        form_status={"You have successfully created a " + params.type}
        form_back={() => navigate("/")}
        form_content={<>
          <Input 
            title={"School ID"}
            type={"text"}
            placeholder={"School ID"}
            trigger={handleChange}
            name={"SchoolID"}
            required
          />

          <div class="row">
            <div class="col">
              <Input 
                title={"FirstName"}
                type={"text"}
                placeholder={"FirstName"}
                trigger={handleChange}
                name={"FirstName"}
                required
              />
            </div>
            <div class="col">
              <Input 
                title={"LastName"}
                type={"text"}
                placeholder={"LastName"}
                trigger={handleChange}
                name={"LastName"}
                required
              />
            </div>
          </div>

          <Input 
            title={"Email"}
            type={"email"}
            placeholder={"Email"}
            trigger={handleChange}
            name={"Email"}
            required
          />

          <Select 
            title={"UserType"}
            class={""}
            name={"UserType"}
            trigger={handleChange}
            options={<>
                <option defaultValue={adduser.UserType}>{adduser.UserType}</option>
                {adduser.UserType === "Admin" ? "":<option value="Admin">Admin</option>}
                {adduser.UserType === "Student" ? "":<option value="Student">Student</option>}
                {adduser.UserType === "Coach" ?  "":<option value="Coach">Coach</option>}
            </>}
            required
          />
        </>}
        form_submit={AddUser}
        cardContent={<>
            <p><span className='fs-6 text-secondary'>School ID:</span> {adduser.SchoolID}</p>
            <p><span className='fs-6 text-secondary'>FirstName:</span> {adduser.FirstName}</p>
            <p><span className='fs-6 text-secondary'>LastName:</span> {adduser.LastName}</p>
            <p><span className='fs-6 text-secondary'>Email:</span> {adduser.Email}</p>
            <p><span className='fs-6 text-secondary'>UserType:</span> {adduser.UserType}</p>
        </>} 
      />
    </>
  )
}