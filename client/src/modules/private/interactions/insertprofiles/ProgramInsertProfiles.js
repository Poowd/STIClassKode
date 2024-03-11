import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';

export function ProgramInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [addprogram, setAddProgram] = useState({
    ProgramID: '',
    Name: '',
    ProgramCode: '',
    Description: '',
    Category: '',
  })

  //---
  const AddProgram = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/add-program', addprogram)
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
    setAddProgram(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}
      
  return (
    <>
      <Form 
        status={
          addprogram.Name !== "" && 
          addprogram.ProgramCode !== "" && 
          addprogram.Category !== ""  ? true : false
        }
        form_status={ "You have successfully created a " + params.type }
        form_title={ "Insert " + params.type }
        form_content={ 
          <>
            <Input 
              title={ "Name" }
              type={ "text" }
              placeholder={ "Name" }
              trigger={ handleChange }
              name={ "Name" }
              required
            />

            <Input 
              title={ "ProgramCode" }
              type={ "text" }
              placeholder={ "ProgramCode" }
              trigger={ handleChange }
              name={ "ProgramCode" }
              required
            />
            
            <Input 
              title={ "Description" }
              type={ "text" }
              placeholder={ "Description" }
              trigger={ handleChange }
              name={ "Description" }
              required={ false }
            />

            <label htmlFor='Category' className='fs-6'>Category</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "Category" }
              name={ "Category" }
              onChange={ handleChange }
              required>
                <option defaultValue={ addprogram.Category }>{ addprogram.Category }</option>
                  {addprogram.Category === "Information & Communications Technology" ? "":<option value="Information & Communications Technology">Information & Communications Technology</option>}
                  {addprogram.Category === "Business & Management" ? "":<option value="Business & Management">Business & Management</option>}
                  {addprogram.Category === "Hospitality Management" ? "":<option value="Hospitality Management">Hospitality Management</option>}
                  {addprogram.Category === "Tourism Management" ? "":<option value="Tourism Management">Tourism Management</option>}
                  {addprogram.Category === "Engineering" ? "":<option value="Engineering">Engineering</option>}
                  {addprogram.Category === "Arts & Sciences" ? "":<option value="Arts & Sciences">Arts & Sciences</option>}
                  {addprogram.Category === "General Studies" ? "":<option value="General Studies">General Studies</option>}
                  {addprogram.Category === "Other" ? "":<option value="Other">Other</option>}
            </select>
          </>
        }
        form_submit={ AddProgram }
      />
    </>
  )
}