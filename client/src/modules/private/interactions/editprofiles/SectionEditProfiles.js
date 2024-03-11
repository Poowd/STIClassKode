import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { ConfirmModal } from '../../../components/ConfirmModal';
import deleteIcon from '../../../../assets/icons/delete.png'

export function SectionEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [editsection, setEditSection] = useState({
    SectionID: params.id,
    Name: state.Name,
    Level: state.Level,
    Semester: state.Semester,
  })
  const [deletesection, setDeleteSection] = useState({
    SectionID: params.id
  })

  //---
  const EditSection = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/update-section', editsection)
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
  const DeleteSection = () => {
    axios.post('http://localhost:8081/delete-section', deletesection)
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
    setEditSection(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
    }))}
    
  return (
    <>
      <Form 
        status={
          editsection.Name !== "" && 
          editsection.Level !== "" && 
          editsection.Semester !== "" ? true : false
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
              value={ editsection.Name }
              required
            />

            <label className='fs-6'>Level</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "Level" }
              name={ "Level"}
              onChange={ handleChange }
              required>
                <option defaultValue={ editsection.Level }>{ editsection.Level }</option>
                  {editsection.Level === "First Year" ? "":<option value="First Year">First Year</option>}
                  {editsection.Level === "Second Year" ? "":<option value="Second Year">Second Year</option>}
                  {editsection.Level === "Third Year" ? "":<option value="Third Year">Third Year</option>}
                  {editsection.Level === "Fourth Year" ? "":<option value="Fourth Year">Fourth Year</option>}
            </select>

            <label className='fs-6'>Semester</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "Semester" }
              name={ "Semester"}
              onChange={ handleChange }
              required>
                <option defaultValue={ editsection.Semester }>{ editsection.Semester }</option>
                  {editsection.Semester === "First Semester" ? "":<option value="First Semester">First Semester</option>}
                  {editsection.Semester === "Second Semester" ? "":<option value="Second Semester">Second Semester</option>}
            </select>
          </>
        }
        form_submit={ EditSection }
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
        subtitle={ "You want to delete " + deletesection.SectionID + " ?" }
        confirm={ DeleteSection }
        textclass={ "text-danger" }
        btnclass={ "btn-danger" }
      />
    </>
  )
}