import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Layout2 } from '../../../layout/Layout2';
import { Select } from '../../../components/Select';

export function ProgramInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  //---
  const handleChange = (e) => {
    setAddProgram(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  const [addprogram, setAddProgram] = useState({
    PRGID: '',
    ProgramCode: '',
    ProgramName: '',
    Abbrev: '',
    Description: '',
    DPTID: '',
  })
  const AddProgram = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/create-program', addprogram)
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
                    value={addprogram.ProgramCode}
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
                    value={addprogram.Abbrev}
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
              value={addprogram.ProgramName}
              required
            />

            <Input 
              title={ "Description" }
              type={ "text" }
              placeholder={ "Description" }
              trigger={ handleChange }
              name={ "Description" }
              value={addprogram.Description}
              required={false}
            />

            <Select 
              title={"Department"}
              class={""}
              name={"DPTID"}
              trigger={handleChange}
              options={<>
                <option value={""}>None</option>{
                  department.map(option => ( 
                    <option key={option.DPTID} value={option.DPTID}> 
                      {option.DepartmentName} 
                    </option> 
                  ))}
              </>}
              required
            />
          </>
        }
        navigate={() => {navigate("/program")}}
        form_submit={ AddProgram }
        card_content={<>
          <p><span className='fs-6 text-secondary d-block'>ProgramName:</span> {addprogram.ProgramName}</p>
          <p><span className='fs-6 text-secondary d-block'>Abbrev:</span> {addprogram.Abbrev}</p>
          <p><span className='fs-6 text-secondary d-block'>Description:</span> {addprogram.Description}</p>
          <p><span className='fs-6 text-secondary d-block'>Department:</span> {
            department.map(option => ( 
              option.DPTID === addprogram.DPTID ?
              <span key={option.DPTID}>{option.DepartmentName}</span>
              :""
            ))
          }</p>
        </>}
      />
    </>
  )
}