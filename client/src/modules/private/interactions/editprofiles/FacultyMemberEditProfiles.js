import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { ConfirmModal } from '../../../components/ConfirmModal';
import deleteIcon from '../../../../assets/icons/delete.png'

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
  const [deleteuser, setDeleteUser] = useState({
    UserID: state.UserID
  })

  //---
  const EditFacultyMember = (e) => {
    e.preventDefault()
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
  const DeleteUser = () => {
    axios.post('http://localhost:8081/delete-user', deleteuser)
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
        status={
          editfacultymember.SchoolFacultyMemberID !== "" &&
          editfacultymember.FirstName !== "" && 
          editfacultymember.LastName !== "" && 
          editfacultymember.FacultyMemberType !== "" && 
          editfacultymember.ContactNumber !== "" && 
          editfacultymember.Address !== ""  ? true : false
        }
        form_status={ "You have successfully edited " + params.id }
        form_title={ "Edit " + params.id }
        form_content={ 
          <>
            <Input 
              title={ "SchoolFacultyMemberID" }
              type={ "text" }
              placeholder={ "SchoolFacultyMemberID" }
              trigger={ handleChange }
              name={ "SchoolFacultyMemberID" }
              value={ editfacultymember.SchoolFacultyMemberID }
              required
            />

            <Input 
              title={ "FirstName" }
              type={ "text" }
              placeholder={ "FirstName" }
              trigger={ handleChange }
              name={ "FirstName" }
              value={ editfacultymember.FirstName }
              required
            />

            <Input 
              title={ "MiddleName" }
              type={ "text" }
              placeholder={ "MiddleName" }
              trigger={ handleChange }
              name={ "MiddleName" }
              value={ editfacultymember.MiddleName }
              required={ false }
            />

            <Input 
              title={ "LastName" }
              type={ "text" }
              placeholder={ "LastName" }
              trigger={ handleChange }
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

            <Input 
              title={ "FacebookLink" }
              type={ "text" }
              placeholder={ "FacebookLink" }
              trigger={ handleChange }
              name={ "FacebookLink" }
              value={ editfacultymember.FacebookLink }
              required={ false }
            />

            <Input 
              title={ "ContactNumber" }
              type={ "text" }
              placeholder={ "ContactNumber" }
              trigger={ handleChange }
              name={ "ContactNumber" }
              value={ editfacultymember.ContactNumber }
              required={ false }
            />

            <Input 
              title={ "Address" }
              type={ "text" }
              placeholder={ "Address" }
              trigger={ handleChange }
              name={ "Address" }
              value={ editfacultymember.Address }
              required
            />
          </>
        }
        form_submit={ EditFacultyMember }
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
        subtitle={ "You want to delete " + deleteuser.UserID + " ?" }
        confirm={ DeleteUser }
        textclass={ "text-danger" }
        btnclass={ "btn-danger" }
      />
    </>
  )
}