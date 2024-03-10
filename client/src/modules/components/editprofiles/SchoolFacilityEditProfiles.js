import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Form } from '../../components/crud/Form';
import { Input } from "../Input";

export function SchoolFacilityEditProfiles() {
  let navigate = useNavigate();
  const params = useParams();
  let { state } = useLocation();
  const [editschoofacility, setEditSchoolFacility] = useState({
    SchoolFacilityID: params.id,
    Name: state.Name,
    Capacity: state.Capacity,
    Type: state.Type,
    Building: state.Building,
  })
  
  //---
  const EditSchooFacility = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/update-schoolfacility', editschoofacility)
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
    setEditSchoolFacility(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  return (
    <>
      <Form 
        form_title={ "Edit " + params.id }
        form_content={ 
          <>
            <Input 
              title={ "Name" }
              type={ "text" }
              placeholder={ "Name" }
              trigger={ handleChange }
              name={ "Name" }
              value={ editschoofacility.Name }
              required
            />

            <Input 
              title={ "Capacity" }
              type={ "text" }
              placeholder={ "Capacity" }
              trigger={ handleChange }
              name={ "Capacity" }
              value={ editschoofacility.Capacity }
              required
            />

            <label className='fs-6'>Type</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
                id={ "Type" }
                  name={ "Type"}
                    onChange={ handleChange }>
                      <option defaultValue={ editschoofacility.Type }>{ editschoofacility.Type }</option>
                        {editschoofacility.Type === "Regular Room" ? "":<option value="Regular Room">Regular Room</option>}
                        {editschoofacility.Type === "Laboratory" ? "":<option value="Laboratory">Laboratory</option>}
                        {editschoofacility.Type === "Audio Visual Room" ? "":<option value="Audio Visual Room">Audio Visual Room</option>}
                        {editschoofacility.Type === "Outdoor" ? "":<option value="Outdoor">Outdoor</option>}
                        {editschoofacility.Type === "Others" ? "":<option value="Others">Others</option>}
            </select>

            <label className='fs-6'>Building</label>
            <select 
              className="d-block w-100 mb-3 px-4 py-2 form-select" 
                id={ "Building" }
                  name={ "Building"}
                    onChange={ handleChange }>
                      <option defaultValue={ editschoofacility.Building }>{ editschoofacility.Building }</option>
                        {editschoofacility.Building === "Main" ? "":<option value="Main">Main</option>}
                          {editschoofacility.Building === "Annex A" ? "":<option value="Annex A">Annex A</option>}
                            {editschoofacility.Building === "Annex B" ?  "":<option value="Annex B">Annex B</option>}
            </select>
          </>
        }
        form_submit={ EditSchooFacility }
      />
    </>
  )
}