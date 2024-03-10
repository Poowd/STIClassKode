import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../components/crud/Form';
import { Input } from '../Input';

export function CourseEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [editcourse, setEditCourse] = useState({
    CourseID: params.id,
    Name: state.Name,
    CourseCode: state.CourseCode,
    Type: state.Type,
    Description: state.Description,
    Category: state.Category,
  })

  //---
  const EditCourse = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/update-course', editcourse)
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
    setEditCourse(prev => ({
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
              title={ "Name" }
              type={ "text" }
              placeholder={ "Name" }
              trigger={ handleChange }
              name={ "Name" }
              value={ editcourse.Name }
              required
            />
            <Input 
              title={ "CourseCode" }
              type={ "text" }
              placeholder={ "CourseCode" }
              trigger={ handleChange }
              name={ "CourseCode" }
              value={ editcourse.CourseCode }
              required
            />

            <label className='fs-6'>Type</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "Type" }
              name={ "Type" }
              onChange={ handleChange }>
                <option defaultValue={ editcourse.Type }>{ editcourse.Type }</option>
                  {editcourse.Type === "Minor" ? "":<option value="Minor">Minor</option>}
                  {editcourse.Type === "Major" ? "":<option value="Major">Major</option>}
            </select>

            <Input 
              title={ "Description" }
              type={ "text" }
              placeholder={ "Description" }
              trigger={ handleChange }
              name={ "Description" }
              value={ editcourse.Description }
              required
            />

            <label className='fs-6'>Category</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "Category" }
              name={ "Category" }
              onChange={ handleChange }>
                <option defaultValue={ editcourse.Category }>{ editcourse.Category }</option>
                  {editcourse.Category === "Information & Communications Technology" ? "":<option value="Information & Communications Technology">Information & Communications Technology</option>}
                  {editcourse.Category === "Business & Management" ? "":<option value="Business & Management">Business & Management</option>}
                  {editcourse.Category === "Hospitality Management" ? "":<option value="Hospitality Management">Hospitality Management</option>}
                  {editcourse.Category === "Tourism Management" ? "":<option value="Tourism Management">Tourism Management</option>}
                  {editcourse.Category === "Engineering" ? "":<option value="Engineering">Engineering</option>}
                  {editcourse.Category === "Arts & Sciences" ? "":<option value="Arts & Sciences">Arts & Sciences</option>}
                  {editcourse.Category === "General Studies" ? "":<option value="General Studies">General Studies</option>}
                  {editcourse.Category === "Other" ? "":<option value="Other">Other</option>}
            </select>
          </>
        }
        form_submit={ EditCourse }
      />
    </>
  )
}