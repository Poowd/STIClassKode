import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../components/crud/Form';

export function CourseEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [editcourse, setEditCourse] = useState({
    CourseID: params.id,
    Name: state.Name,
    CourseCode: state.CourseCode,
    Description: state.Description,
    Category: state.Category,
  })

  //submit the form to create an account
  const EditCourse = (e) => {
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
            <label className='fs-6'>Name</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "Name" }
              onChange={ handleChange } 
              name={ "Name" }
              value={ editcourse.Name }
              required
            />

            <label className='fs-6'>Course Code</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "CourseCode" }
              onChange={ handleChange } 
              name={ "CourseCode" }
              value={ editcourse.CourseCode }
            />

            <label className='fs-6'>Description</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "Description" }
              onChange={ handleChange } 
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