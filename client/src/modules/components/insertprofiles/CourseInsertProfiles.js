import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../crud/Form';

export function CourseInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [addcourse, setAddCourse] = useState({
    CourseID: '',
    Name: '',
    CourseCode: '',
    Type: '',
    Description: '',
    Category: '',
  })

  //---
  const AddCourse = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/add-course', addcourse)
    .then(res => {
      try {
        navigate("/course")
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }
  
  //---
  const handleChange = (e) => {
    setAddCourse(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  return (
    <>
      <Form 
        form_title={ "Insert " + params.type }
        form_content={ 
          <>
            <label htmlFor='Name' className='fs-6'>Name</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "Name" }
              onChange={ handleChange } 
              name={ "Name" }
              id={ "Name" }
              required
            />

            <label htmlFor='CourseCode' className='fs-6'>Course Code</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "CourseCode" }
              onChange={ handleChange } 
              name={ "CourseCode" }
              id={ "CourseCode" }
              required
            />

            <label htmlFor='Type' className='fs-6'>Type</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              name={ "Type" }
              id={ "Type" }
              onChange={ handleChange }
              required>
                <option defaultValue={ addcourse.Type }>{ addcourse.Type }</option>
                  {addcourse.Type === "Minor" ? "":<option value="Minor">Minor</option>}
                  {addcourse.Type === "Major" ? "":<option value="Major">Major</option>}
            </select>

            <label htmlFor='Description' className='fs-6'>Description</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "Description" }
              onChange={ handleChange } 
              name={ "Description" }
              id={ "Description" }
              required
            />

            <label htmlFor='Category' className='fs-6'>Category</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              name={ "Category" }
              id={ "Category" }
              onChange={ handleChange }
              required>
                <option defaultValue={ addcourse.Category }>{ addcourse.Category }</option>
                  {addcourse.Category === "Information & Communications Technology" ? "":<option value="Information & Communications Technology">Information & Communications Technology</option>}
                  {addcourse.Category === "Business & Management" ? "":<option value="Business & Management">Business & Management</option>}
                  {addcourse.Category === "Hospitality Management" ? "":<option value="Hospitality Management">Hospitality Management</option>}
                  {addcourse.Category === "Tourism Management" ? "":<option value="Tourism Management">Tourism Management</option>}
                  {addcourse.Category === "Engineering" ? "":<option value="Engineering">Engineering</option>}
                  {addcourse.Category === "Arts & Sciences" ? "":<option value="Arts & Sciences">Arts & Sciences</option>}
                  {addcourse.Category === "General Studies" ? "":<option value="General Studies">General Studies</option>}
                  {addcourse.Category === "Other" ? "":<option value="Other">Other</option>}
            </select>
          </>
        }
        form_submit={ AddCourse }
      />
    </>
  )
}