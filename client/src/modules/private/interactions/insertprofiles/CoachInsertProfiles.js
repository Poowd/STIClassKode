import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { Button } from '../../../components/Button';
import { Layout2 } from '../../../layout/Layout2';

export function CoachInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [addcoach, setAddCoach] = useState({
    CCHID: '',
    SCHLID: '',
    FirstName: '',
    MiddleInitial: '',
    LastName: '',
    Type: '',
    Units: '',
    DPTID: '',
    Email: '',
    ContactNumber: '',
    Facebook: '',
  })

  //---di nag rerelflect kapag ina-add
  const AddCoach = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/create-coach', addcoach)
    .then(res => {
      try {
        navigate("/coach")
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }
  
  //---
  const handleChange = (e) => {
    setAddCoach(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

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
                        <option value={""}>None</option>
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

            <div>
              <div className="row align-items-start">
                <div className="col">
                  <Input 
                    title={ "Email" }
                    type={ "email" }
                    placeholder={ "Email" }
                    trigger={ handleChange }
                    name={ "Email" }
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
              required
            />
          </>
        }
        navigate={() => {navigate("/coach")}}
        form_submit={ AddCoach }
        card_content={<>
          <p><span className='fs-6 text-secondary d-block'>School ID:</span> {addcoach.SCHLID}</p>
          <p><span className='fs-6 text-secondary d-block'>Name:</span> {addcoach.LastName.concat(", ", addcoach.FirstName.concat(" ", addcoach.MiddleInitial + "."))}</p>
          <p><span className='fs-6 text-secondary d-block'>Type:</span> {addcoach.Type}</p>
          <p><span className='fs-6 text-secondary d-block'>Units:</span> {addcoach.Units}</p>
          <p><span className='fs-6 text-secondary d-block'>Department:</span> {
            department.map(option => ( 
              option.DPTID === addcoach.DPTID ?
              <span key={option.DPTID}>{option.DepartmentName}</span>
              :""
            ))
          }</p>
          <p><span className='fs-6 text-secondary d-block'>Email:</span> {addcoach.Email}</p>
          <p><span className='fs-6 text-secondary d-block'>ContactNumber:</span> {addcoach.ContactNumber}</p>
          <p><span className='fs-6 text-secondary d-block'>Facebook:</span> {addcoach.Facebook}</p>
        </>}
      />
    </>
  )
}