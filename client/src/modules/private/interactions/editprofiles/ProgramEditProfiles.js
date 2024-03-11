import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { ConfirmModal } from '../../../components/ConfirmModal';
import deleteIcon from '../../../../assets/icons/delete.png'

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
  const [deleteprogram, setDeleteProgram] = useState({
    ProgramID: params.id
  })

  //---
  const EditProgram = (e) => {
    e.preventDefault()
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
  const DeleteProgram = () => {
    axios.post('http://localhost:8081/delete-program', deleteprogram)
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
        status={
          editprogram.Name !== "" && 
          editprogram.ProgramCode !== "" && 
          editprogram.Category !== ""  ? true : false
        }
        form_status={ "You have successfully edited " + params.id }
        form_title={ "Edit " + params.id }
        form_content={ 
          <>
            <Input 
              title={ "Name" }
              type={ "text" }
              placeholder={ "Name" }
              trigger={ handleChange }
              name={ "Name" }
              value={ editprogram.Name }
              required
            />

            <Input 
              title={ "Program Code" }
              type={ "text" }
              placeholder={ "ProgramCode" }
              trigger={ handleChange }
              name={ "ProgramCode" }
              value={ editprogram.ProgramCode }
              required
            />

            <Input 
              title={ "Description" }
              type={ "text" }
              placeholder={ "Description" }
              trigger={ handleChange }
              name={ "Description" }
              value={ editprogram.Description }
              required={ false }
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
      <Button
        class={ "btn btn-danger" } 
        type={ "button" }
        text={ "Delete" } 
        disabled={ false }
        onClick={ () => {} }
        databstoggle={ "modal" }
        databstarget={ "#delete" }
      />
      <ConfirmModal
        id={ "delete" } 
        icon={ deleteIcon }
        title={ "Delete" }
        subtitle={ "You want to delete " + deleteprogram.ProgramID + " ?" }
        confirm={ DeleteProgram }
        textclass={ "text-danger" }
        btnclass={ "btn-danger" }
      />
    </>
  )
}