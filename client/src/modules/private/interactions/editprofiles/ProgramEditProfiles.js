import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Layout2 } from '../../../layout/Layout2';
import { Select } from '../../../components/Select';

export function ProgramEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  //---
  const handleChange = (e) => {
    setEditProgram(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  const [editprogram, setEditProgram] = useState({
    PRGID: state.PRGID,
    ProgramCode: state.ProgramCode,
    ProgramName: state.ProgramName,
    Abbrev: state.Abbrev,
    Description: state.Description,
    DPTID: state.DPTID,
  })
  const EditProgram = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/update-program', editprogram)
    .then(res => {
      try {
        navigate("/program")
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }

  const [deletecourse, setDeleteCourse] = useState({
    PRGID: params.id,
  })
  const DeleteCourse = () => {
    axios.post('http://localhost:8081/delete-program', deletecourse)
    .then(res => {
      try {
        navigate("/program")
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
        form_title={ "Edit " + params.type }
        form_content={ 
          <>
            <div className='d-flex gap-1 justify-content-end'>
              <Button
                class={"btn btn-secondary"} 
                text={"Cancel"} 
                disabled={false}
                onClick={() => {navigate("/program")}}
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
              <div className="row align-items-start">
                <div className="col">
                  <Input 
                    title={ "ProgramCode" }
                    type={ "text" }
                    placeholder={ "ProgramCode" }
                    trigger={ handleChange }
                    name={ "ProgramCode" }
                    value={editprogram.ProgramCode}
                    required
                  />
                </div>
                <div className="col">
                  <Input 
                    title={ "Abbrev" }
                    type={ "text" }
                    placeholder={ "Abbrev" }
                    trigger={ handleChange }
                    name={ "Abbrev" }
                    value={editprogram.Abbrev}
                    required
                  />
                </div>
              </div>
            </div>

            <Input 
              title={ "ProgramName" }
              type={ "text" }
              placeholder={ "ProgramName" }
              trigger={ handleChange }
              name={ "ProgramName" }
              value={editprogram.ProgramName}
              required
            />

            <Input 
              title={ "Description" }
              type={ "text" }
              placeholder={ "Description" }
              trigger={ handleChange }
              name={ "Description" }
              value={editprogram.Description}
              required={false}
            />

            <Select 
              title={"Department"}
              class={""}
              name={"DPTID"}
              trigger={handleChange}
              options={<>{
                department.map(option => ( 
                  option.DPTID === editprogram.DPTID ?
                  <option key={option.DPTID} defaultValue={option.DPTID}> 
                    {option.DepartmentName} 
                  </option> 
                  :""
                ))}{
                  department.map(option => ( 
                    option.DPTID != editprogram.DPTID ?
                    <option key={option.DPTID} value={option.DPTID}> 
                      {option.DepartmentName} 
                    </option>
                    :"" 
                  ))}
              </>}
              required
            />
          </>
        }
        navigate={() => {navigate("/program")}}
        form_submit={ EditProgram }
        card_content={<>
          <p><span className='fs-6 text-secondary d-block'>ProgramName:</span> {editprogram.ProgramName}</p>
          <p><span className='fs-6 text-secondary d-block'>Abbrev:</span> {editprogram.Abbrev}</p>
          <p><span className='fs-6 text-secondary d-block'>Description:</span> {editprogram.Description}</p>
          <p><span className='fs-6 text-secondary d-block'>Department:</span> {
            department.map(option => ( 
              option.DPTID === editprogram.DPTID ?
              <span key={option.DPTID}>{option.DepartmentName}</span>
              :""
            ))
          }</p>
        </>}
      />
    </>
  )
}