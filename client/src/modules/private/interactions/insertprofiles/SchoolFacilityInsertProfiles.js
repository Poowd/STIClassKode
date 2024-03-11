import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';

export function SchoolFacilityInsertProfiles() {
  let navigate = useNavigate();
  const params = useParams();
  let { state } = useLocation();
  
  const [addschoofacility, setAddSchoolFacility] = useState({
    SchoolFacilityID: '',
    Name: '',
    Capacity: '',
    Type: '',
    Building: '',
  })

  //---
  const AddSchooFacility = (e) => {
    e.preventDefault()
      axios.post('http://localhost:8081/add-schoolfacility', addschoofacility)
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
    setAddSchoolFacility(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}
  
  return (
    <>
      <Form 
        status={
          addschoofacility.Name !== "" && 
          addschoofacility.Capacity !== "" && 
          addschoofacility.Type !== "" && 
          addschoofacility.Building !== ""  ? true : false
        }
        form_status={ "You have successfully created a " + params.type }
        form_title={ "Insert " + params.type }
        form_content={ 
          <>
            <Input 
              title={ "Name" }
              type={ "text" }
              placeholder={ "Name" }
              trigger={ handleChange }
              name={ "Name" }
              required
            />

            <Input 
              title={ "Capacity" }
              type={ "text" }
              placeholder={ "Capacity" }
              trigger={ handleChange }
              name={ "Capacity" }
              required
            />

            <label htmlFor='Type' className='fs-6'>Type</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "Type" }
              name={ "Type"}
              onChange={ handleChange }
              required >
                <option defaultValue={ addschoofacility.Type }>{ addschoofacility.Type }</option>
                  {addschoofacility.Type === "Regular Room" ? "":<option value="Regular Room">Regular Room</option>}
                  {addschoofacility.Type === "Laboratory" ? "":<option value="Laboratory">Laboratory</option>}
                  {addschoofacility.Type === "Audio Visual Room" ? "":<option value="Audio Visual Room">Audio Visual Room</option>}
                  {addschoofacility.Type === "Outdoor" ? "":<option value="Outdoor">Outdoor</option>}
                  {addschoofacility.Type === "Others" ? "":<option value="Others">Others</option>}
            </select>

            <label htmlFor='Building' className='fs-6'>Building</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
              id={ "Building" }
              name={ "Building"}
              onChange={ handleChange }
              required >
                <option defaultValue={ addschoofacility.Building }>{ addschoofacility.Building }</option>
                  {addschoofacility.Building === "Main" ? "":<option value="Main">Main</option>}
                    {addschoofacility.Building === "Annex A" ? "":<option value="Annex A">Annex A</option>}
                      {addschoofacility.Building === "Annex B" ?  "":<option value="Annex B">Annex B</option>}
            </select>
          </>
        }
        form_submit={ AddSchooFacility }
      />
    </>
  );
}