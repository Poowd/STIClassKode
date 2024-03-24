import axios from 'axios'
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';
import { StatusModal } from '../../../components/StatusModal';
import { Select } from '../../../components/Select';
import { RadioButton } from '../../../components/RadioButton';
import { Button } from '../../../components/Button';
import { Layout2 } from '../../../layout/Layout2';

export function CourseInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [addcourse, setAddCourse] = useState({
    CRSID: '',
    CourseCode: '',
    CourseName: '',
    Units: '',
    LessonType: '',
    PRGID: '',
  })

  //---di nag rerelflect kapag ina-add
  const AddCourse = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/create-course', addcourse)
    .then(res => {
      try {
        navigate("/course")
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }
  
  //---
  const handleChange = (e) => {
    setAddCourse(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

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
        form_title={ "Insert " + params.type }
        form_content={ 
          <>
            <div className='d-flex gap-1 justify-content-end'>
              <Button
                class={"btn btn-secondary"} 
                text={"Cancel"} 
                disabled={false}
                onClick={() => {navigate("/course")}}
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
                <div className="col-lg-3">
                  <Input 
                    title={ "CourseCode" }
                    type={ "text" }
                    placeholder={ "CourseCode" }
                    trigger={ handleChange }
                    name={ "CourseCode" }
                    required
                  />
                </div>
                <div className="col-lg-9">
                  <Input 
                    title={ "CourseName" }
                    type={ "text" }
                    placeholder={ "CourseName" }
                    trigger={ handleChange }
                    name={ "CourseName" }
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="row align-items-start">
                <div className="col-lg-3">
                  <Input 
                    title={ "Units" }
                    type={ "text" }
                    placeholder={ "Units" }
                    trigger={ handleChange }
                    name={ "Units" }
                    required
                  />
                </div>
                <div className="col-lg-9">
                  <Select 
                    title={"LessonType"}
                    class={""}
                    name={"LessonType"}
                    trigger={handleChange}
                    required
                    options={<>
                        <option value={""}>None</option>
                        <option value={"Lecture Only"}>{"Lecture Only"}</option> 
                        <option value={"Lecture and Laboratory"}>{"Lecture and Laboratory"}</option> 
                        <option value={"Lecture and Practical"}>{"Lecture and Practical"}</option> 
                        <option value={"Others"}>{"Others"}</option> 
                    </>}
                  />
                </div>
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
          </>
        }
        navigate={() => {navigate("/course")}}
        form_submit={ AddCourse }
        card_content={<>
          <p><span className='fs-6 text-secondary d-block'>Course Code:</span> {addcourse.CourseCode}</p>
          <p><span className='fs-6 text-secondary d-block'>Course Name:</span> {addcourse.CourseName}</p>
          <p><span className='fs-6 text-secondary d-block'>Units:</span> {addcourse.Units}</p>
          <p><span className='fs-6 text-secondary d-block'>Lesson Type:</span> {addcourse.LessonType}</p>
          <p><span className='fs-6 text-secondary d-block'>Program:</span> {
            program.map(option => ( 
              option.PRGID === addcourse.PRGID ?
              <p>{option.ProgramName}</p>
              :""
            ))
          }</p>
        </>}
      />
    </>
  )
}