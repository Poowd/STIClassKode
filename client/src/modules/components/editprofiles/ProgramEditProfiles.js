import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../components/crud/Form';

export function ProgramEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [editprogram, setEditProgram] = useState({
    ProgramID: params.id,
    Name: state.Name,
    ProgramCode: state.ProgramCode,
    Description: state.Description,
    Category: state.Category,
  })

  //submit the form to create an account
    const EditProgram = () => {
      axios.post('http://localhost:8081/update-program', editprogram)
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
      setEditProgram(prev => ({
        ...prev,
        [ e.target.name ]: e.target.value
      }))}
      
    return (
      <>
        <Form 
          form_title={ "Edit " + params.id }
          form_content={ 
            <>
              <label className='fs-6'>Name</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                placeholder={ "Name" }
                onChange={ handleChange } 
                name={ "Name" }
                value={ editprogram.Name }
                required
              />

              <label className='fs-6'>Program Code</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                placeholder={ "ProgramCode" }
                onChange={ handleChange } 
                name={ "ProgramCode" }
                value={ editprogram.ProgramCode }
                required
              />

              <label className='fs-6'>Description</label>
              <input 
                className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                placeholder={ "Description" }
                onChange={ handleChange } 
                name={ "Description" }
                value={ editprogram.Description }
                required
              />

              <label className='fs-6'>Category</label>
              <select 
                className="d-block w-100 mb-3 px-4 py-2 form-select" 
                id={ "Category" }
                name={ "Category" }
                onChange={ handleChange }>
                  <option defaultValue={ editprogram.Category }>{ editprogram.Category }</option>
                    {editprogram.Category === "Information & Communications Technology" ? "":<option value="Information & Communications Technology">Information & Communications Technology</option>}
                    {editprogram.Category === "Business & Management" ? "":<option value="Business & Management">Business & Management</option>}
                    {editprogram.Category === "Hospitality Management" ? "":<option value="Hospitality Management">Hospitality Management</option>}
                    {editprogram.Category === "Tourism Management" ? "":<option value="Tourism Management">Tourism Management</option>}
                    {editprogram.Category === "Engineering" ? "":<option value="Engineering">Engineering</option>}
                    {editprogram.Category === "Arts & Sciences" ? "":<option value="Arts & Sciences">Arts & Sciences</option>}
                    {editprogram.Category === "General Studies" ? "":<option value="General Studies">General Studies</option>}
                    {editprogram.Category === "Other" ? "":<option value="Other">Other</option>}
              </select>
            </>
          }
          form_submit={ EditProgram }
        />
      </>
    )
}