import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../crud/Form';

export function SectionInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [addsection, setAddSection] = useState({
    SectionID: '',
    Name: '',
    Level: '',
    Semester: '',
  })

  //---
  const AddSection = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/add-section', addsection)
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
    setAddSection(prev => ({
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

            <label htmlFor='Level' className='fs-6'>Level</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select"
              id={ "Level" }
              name={ "Level"}
              onChange={ handleChange }
              required>
                <option defaultValue={ addsection.Level }>{ addsection.Level }</option>
                  {addsection.Level === "First Year" ? "":<option value="First Year">First Year</option>}
                  {addsection.Level === "Second Year" ? "":<option value="Second Year">Second Year</option>}
                  {addsection.Level === "Third Year" ? "":<option value="Third Year">Third Year</option>}
                  {addsection.Level === "Fourth Year" ? "":<option value="Fourth Year">Fourth Year</option>}
            </select>

            <label htmlFor='Semester' className='fs-6'>Semester</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "Semester" }
              name={ "Semester"}
              onChange={ handleChange }
              required>
                <option defaultValue={ addsection.Semester }>{ addsection.Semester }</option>
                  {addsection.Semester === "First Semester" ? "":<option value="First Semester">First Semester</option>}
                  {addsection.Semester === "Second Semester" ? "":<option value="Second Semester">Second Semester</option>}
            </select>
          </>
        }
        form_submit={ AddSection }
      />
    </>
  )
}