import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { ConfirmModal } from '../../../components/ConfirmModal';
import deleteIcon from '../../../../assets/icons/delete.png'
import { Select } from '../../../components/Select';

export function CourseEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  //---
  const handleChange = (e) => {
    setEditCourse(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  const [editcourse, setEditCourse] = useState({
    CRSID: params.id,
    CourseCode: state.CourseCode,
    CourseName: state.CourseName,
    Units: state.Units,
    LessonType: state.LessonType,
    PRGID: state.Program,
  })
  const EditCourse = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/update-course', editcourse)
    .then(res => {
      try {
        navigate(-1)
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }

  const [deletecourse, setDeleteCourse] = useState({
    CRSID: params.id,
  })
  const DeleteCourse = () => {
    axios.post('http://localhost:8081/delete-course', deletecourse)
    .then(res => {
      try {
        navigate(-1)
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
      <Form
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
                <div className="col-lg-3">
                  <Input 
                    title={ "CourseCode" }
                    type={ "text" }
                    placeholder={ "CourseCode" }
                    trigger={ handleChange }
                    name={ "CourseCode" }
                    value={editcourse.CourseCode}
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
                    value={editcourse.CourseName}
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
                    value={editcourse.Units}
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
                        <option value={editcourse.LessonType}>{editcourse.LessonType}</option>
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
              options={<>{
                program.map(option => ( 
                  option.PRGID === editcourse.PRGID ?
                  <option key={option.PRGID} defaultValue={option.PRGID}> 
                    {option.ProgramName} 
                  </option> 
                  :""
                ))}{
                  program.map(option => ( 
                    option.PRGID != editcourse.PRGID ?
                    <option key={option.PRGID} value={option.PRGID}> 
                      {option.ProgramName} 
                    </option>
                    :"" 
                  ))}
              </>}
              required
            />
          </>
        }
        navigate={() => {navigate("/course")}}
        form_submit={ EditCourse }
        card_content={<>
          <p><span className='fs-6 text-secondary d-block'>Course Code:</span> {editcourse.CourseCode}</p>
          <p><span className='fs-6 text-secondary d-block'>Course Name:</span> {editcourse.CourseName}</p>
          <p><span className='fs-6 text-secondary d-block'>Units:</span> {editcourse.Units}</p>
          <p><span className='fs-6 text-secondary d-block'>Lesson Type:</span> {editcourse.LessonType}</p>
          <p><span className='fs-6 text-secondary d-block'>Program:</span> {
            program.map(option => ( 
              option.PRGID === editcourse.PRGID ?
              <span key={option.PRGID}>{option.ProgramName}</span>
              :""
            ))
          }</p>
        </>}
      />
    </>
  )
}