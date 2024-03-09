import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../components/crud/Form';

export function FacultyMemberEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [editfacultymember, setEditFacultyMember] = useState({
    FacultyMemberID: params.id,
      SchoolFacultyMemberID: state.SchoolFacultyMemberID,
      FirstName: state.FirstName,
        MiddleName: state.MiddleName,
          LastName: state.LastName,
            FacultyMemberType: state.FacultyMemberType,
              FacebookLink: state.FacebookLink,
                ContactNumber: state.ContactNumber,
                  Address: state.Address,
    })

  //submit the form to create an account
  const EditFacultyMember = (e) => {
      axios.post('http://localhost:8081/update-facultymember', editfacultymember)
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
      setEditFacultyMember(prev => ({
        ...prev,
        [ e.target.name ]: e.target.value
      }))}

  return (
    <>
      <Form 
        form_title={ "Edit " + params.id }
        form_content={ 
          <>
            <label className='fs-6'>School Faculty Member ID</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "SchoolFacultyMemberID" }
              onChange={ handleChange } 
              name={ "SchoolFacultyMemberID" }
              value={ editfacultymember.SchoolFacultyMemberID }
              required
            />

            <label className='fs-6'>First Name</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "FirstName" }
              onChange={ handleChange } 
              name={ "FirstName" }
              value={ editfacultymember.FirstName }
              required
            />

            <label className='fs-6'>Middle Name</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "MiddleName" }
              onChange={ handleChange } 
              name={ "MiddleName" }
              value={ editfacultymember.MiddleName }
            />

            <label className='fs-6'>Last Name</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "LastName" }
              onChange={ handleChange } 
              name={ "LastName" }
              value={ editfacultymember.LastName }
              required
            />

            <label className='fs-6'>Faculty Member Type</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "FacultyMemberType" }
              name={ "FacultyMemberType" }
              onChange={ handleChange }>
                <option defaultValue={ editfacultymember.FacultyMemberType }>{ editfacultymember.FacultyMemberType }</option>
                  {editfacultymember.FacultyMemberType === "Fulltime" ? "":<option value="Fulltime">Fulltime</option>}
                  {editfacultymember.FacultyMemberType === "Parttime" ? "":<option value="Parttime">Parttime</option>}
            </select>

            <label className='fs-6'>Facebook Link</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "FacebookLink" }
              onChange={ handleChange } 
              name={ "FacebookLink" }
              value={ editfacultymember.FacebookLink }
              required
            />

            <label className='fs-6'>Contact Number</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "ContactNumber" }
              onChange={ handleChange } 
              name={ "ContactNumber" }
              value={ editfacultymember.ContactNumber }
              required
            />

            <label className='fs-6'>Address</label>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
              type={ "text" }
              placeholder={ "Address" }
              onChange={ handleChange } 
              name={ "Address" }
              value={ editfacultymember.Address }
              required
            />
          </>
        }
        form_submit={ EditFacultyMember }
      />
    </>
  )}