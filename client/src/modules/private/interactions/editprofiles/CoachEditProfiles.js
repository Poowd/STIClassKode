import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Layout2 } from '../../../layout/Layout2';
import { Select } from '../../../components/Select';

export function CoachEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  //---
  const handleChange = (e) => {
    setEditCoach(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  const [editcoach, setEditCoach] = useState({
    CCHID: state.CCHID,
    SCHLID: state.SCHLID,
    FirstName: state.FirstName,
    MiddleInitial: state.MiddleInitial,
    LastName: state.LastName,
    Type: state.Type,
    Units: state.Units,
    DPTID: state.DPTID,
    Email: state.Email,
    ContactNumber: state.ContactNumber,
    Facebook: state.Facebook,
  })
  const EditCoach = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/update-coach', editcoach)
    .then(res => {
      try {
        navigate("/coach")
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }

  const [deletecourse, setDeleteCourse] = useState({
    CCHID: params.id,
  })
  const DeleteCourse = () => {
    axios.post('http://localhost:8081/delete-coach', deletecourse)
    .then(res => {
      try {
        navigate("/coach")
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }

  const [department, setDepartment] = useState([])
  axios.post('http://localhost:8081/display-input-department')
    .then( res => {
      try {
        setDepartment(res.data)
      } catch(err) {
        console.log(err)
      }
  })

  return (
    <>
      <Layout2
        form_status={ "You have successfully created a " + params.type }
        form_title={ "Insert " + params.type }
        form_content={ 
          <>
            <div className='d-flex gap-1 justify-content-end'>
              <Button
                class={"btn btn-secondary"} 
                text={"Cancel"} 
                disabled={false}
                onClick={() => {navigate("/coach")}}
              />
              <Button
                class={"btn btn-secondary"} 
                text={"Delete"} 
                disabled={false}
                onClick={DeleteCourse}
              />
              <Button
                  class={ "btn btn-primary" } 
                  type={ "submit" }
                  text={ "Save" } 
                  disabled={ false }
                  onClick={ () => {console.log("Button Clicked!")} }
              />
            </div>
            <div>
              <Input 
                title={ "SCHLID" }
                type={ "text" }
                placeholder={ "SCHLID" }
                trigger={ handleChange }
                name={ "SCHLID" }
                value={editcoach.SCHLID}
                required
              />

              <div className="row align-items-start">
                <div className="col-lg-5">
                  <Input 
                    title={ "FirstName" }
                    type={ "text" }
                    placeholder={ "FirstName" }
                    trigger={ handleChange }
                    name={ "FirstName" }
                    value={editcoach.FirstName}
                    required
                  />
                </div>
                <div className="col-lg-2">
                  <Input 
                    title={ "MiddleInitial" }
                    type={ "text" }
                    placeholder={ "MiddleInitial" }
                    trigger={ handleChange }
                    name={ "MiddleInitial" }
                    value={editcoach.MiddleInitial}
                    required={false}
                  />
                </div>
                <div className="col-lg-5">
                  <Input 
                    title={ "LastName" }
                    type={ "text" }
                    placeholder={ "LastName" }
                    trigger={ handleChange }
                    name={ "LastName" }
                    value={editcoach.LastName}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="row align-items-start">
                <div className="col-lg-8">
                  <Select 
                    title={"Type"}
                    class={""}
                    name={"Type"}
                    trigger={handleChange}
                    required
                    options={<>
                      <option value={editcoach.Type}>{editcoach.Type}</option>
                      <option value={"Fulltime"}>{"Fulltime"}</option> 
                      <option value={"Parttime"}>{"Parttime"}</option> 
                    </>}
                  />
                </div>
                <div className="col-lg-4">
                  <Input 
                    title={ "Units" }
                    type={ "text" }
                    placeholder={ "Units" }
                    trigger={ handleChange }
                    name={ "Units" }
                    value={editcoach.Units}
                    required
                  />
                </div>
              </div>
            </div>

            <Select 
              title={"Department"}
              class={""}
              name={"DPTID"}
              trigger={handleChange}
              options={<>{
                department.map(option => ( 
                  option.DPTID === editcoach.DPTID ?
                  <option key={option.DPTID} defaultValue={option.DPTID}> 
                    {option.DepartmentName} 
                  </option> 
                  :""
                ))}{
                  department.map(option => ( 
                    option.DPTID != editcoach.DPTID ?
                    <option key={option.DPTID} value={option.DPTID}> 
                      {option.DepartmentName} 
                    </option>
                    :"" 
                  ))}
              </>}
              required
            />

            <div>
              <div className="row align-items-start">
                <div className="col">
                  <Input 
                    title={ "Email" }
                    type={ "email" }
                    placeholder={ "Email" }
                    trigger={ handleChange }
                    name={ "Email" }
                    value={editcoach.Email}
                    required
                  />
                </div>
                <div className="col">
                  <Input 
                    title={ "ContactNumber" }
                    type={ "text" }
                    placeholder={ "ContactNumber" }
                    trigger={ handleChange }
                    name={ "ContactNumber" }
                    value={editcoach.ContactNumber}
                    required
                  />
                </div>
              </div>
            </div>

            <Input 
              title={ "Facebook" }
              type={ "text" }
              placeholder={ "Facebook" }
              trigger={ handleChange }
              name={ "Facebook" }
              value={editcoach.Facebook}
              required
            />
          </>
        }
        navigate={() => {navigate("/coach")}}
        form_submit={ EditCoach }
        card_content={<>
          <p><span className='fs-6 text-secondary d-block'>School ID:</span> {editcoach.SCHLID}</p>
          <p><span className='fs-6 text-secondary d-block'>Name:</span> {editcoach.LastName.concat(", ", editcoach.FirstName.concat(" ", editcoach.MiddleInitial + "."))}</p>
          <p><span className='fs-6 text-secondary d-block'>Type:</span> {editcoach.Type}</p>
          <p><span className='fs-6 text-secondary d-block'>Units:</span> {editcoach.Units}</p>
          <p><span className='fs-6 text-secondary d-block'>Department:</span> {
            department.map(option => ( 
              option.DPTID === editcoach.DPTID ?
              <span key={option.DPTID}>{option.DepartmentName}</span>
              :""
            ))
          }</p>
          <p><span className='fs-6 text-secondary d-block'>Email:</span> {editcoach.Email}</p>
          <p><span className='fs-6 text-secondary d-block'>ContactNumber:</span> {editcoach.ContactNumber}</p>
          <p><span className='fs-6 text-secondary d-block'>Facebook:</span> {editcoach.Facebook}</p>
        </>}
      />
    </>
  )
}