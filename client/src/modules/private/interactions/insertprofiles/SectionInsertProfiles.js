import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Layout2 } from '../../../layout/Layout2';
import { Select } from '../../../components/Select';

export function SectionInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  
  const year = ["None", "First Year", "Second Year", "Third Year", "Fourth Year"]
  const semester = ["None", "First Semester", "Second Semester"]

  //---
  const handleChange = (e) => {
    setAddSection(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value,
  }))}

  const [addsection, setAddSection] = useState({
    SCTID: '',
    SectionName: '',
    Population: '',
    Year: '',
    Semester: '',
    PRGID: '',
  })
  const AddSection = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/create-section', addsection)
    .then(res => {
      try {
        navigate("/section")
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }
  
  const [program, setProgram] = useState([])
  axios.post('http://localhost:8081/display-input-program')
    .then( res => {
      try {
        setProgram(res.data)
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
                onClick={() => {navigate("/section")}}
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
                <div className="col-lg-9">
                  <Input 
                    title={ "SectionName" }
                    type={ "text" }
                    placeholder={ "SectionName" }
                    trigger={ handleChange }
                    name={ "SectionName" }
                    required
                  />
                </div>
                <div className="col-lg-3">
                  <Input 
                    title={ "Population" }
                    type={ "text" }
                    placeholder={ "Population" }
                    trigger={ handleChange }
                    name={ "Population" }
                    required
                  />
                </div>
              </div>
              <div className="row align-items-start">
                <div className="col-lg-6">
                  <Select 
                    title={"Year"}
                    class={""}
                    name={"Year"}
                    trigger={handleChange}
                    options={<>{
                      year.map(option => ( 
                        option === addsection.Year ?
                        <option key={option} defaultValue={option === 'None' ? '':option}> 
                          {option} 
                        </option> 
                        :""
                      ))}{
                      year.map(option => ( 
                        option != addsection.Year ?
                        <option key={option === 'None' ? '':option} value={option === 'None' ? '':option}> 
                          {option} 
                        </option>
                        :"" 
                      ))}
                    </>}
                    required
                  />
                </div>
                <div className="col-lg-6">
                  <Select 
                    title={"Semester"}
                    class={""}
                    name={"Semester"}
                    trigger={handleChange}
                    options={<>{
                      semester.map(option => ( 
                        option === addsection.Semester ?
                        <option key={option} defaultValue={option === 'None' ? '':option}> 
                          {option} 
                        </option> 
                        :""
                      ))}{
                      semester.map(option => ( 
                        option != addsection.Semester ?
                        <option key={option === 'None' ? '':option} value={option === 'None' ? '':option}> 
                          {option} 
                        </option>
                        :"" 
                      ))}
                    </>}
                    required
                  />
                </div>
              </div>
              <Select 
                title={"Program"}
                class={""}
                name={"PRGID"}
                trigger={handleChange}
                options={<>
                  <option value={""}>None</option>{
                    program.map(option => ( 
                      <option key={option.PRGID} value={option.PRGID}> 
                        {option.ProgramName} 
                      </option> 
                    ))}
                </>}
                required
              />
            </div>
          </>
        }
        navigate={() => {navigate("/section")}}
        form_submit={ AddSection }
        card_content={<>
          <p><span className='fs-6 text-secondary d-block'>SectionName:</span> {addsection.SectionName}</p>
          <p><span className='fs-6 text-secondary d-block'>Population:</span> {addsection.Population}</p>
          <p><span className='fs-6 text-secondary d-block'>Year:</span> {addsection.Year}</p>
          <p><span className='fs-6 text-secondary d-block'>Semester:</span> {addsection.Semester}</p>
          <p><span className='fs-6 text-secondary d-block'>Program:</span> {
            program.map(option => ( 
              option.PRGID === addsection.PRGID ?
              <span>{option.ProgramName}</span>
              :""
            ))
          }</p>
        </>}
      />
    </>
  )
}